import networks from './networks.json';
import { getContract, hexToString, isAddress } from 'viem';
import { createPublicClient, http } from 'viem';
import config from '../Config';

async function getABI(name) {
    const abi = await import(`./abi/${name}.json`);
    return abi.default;
}

class Viewer {
    FBTC_CHAIN_ID_TO_NAME = {
        "0x0100000000000000000000000000000000000000000000000000000000000000": "BTC Mainnet",
        "0x0110000000000000000000000000000000000000000000000000000000000000": "BTC XTN Testnet",
    }
    OP = {
        0: "Nop",
        1: "Mint",
        2: "Burn",
        3: "CrosschainRequest",
        4: "CrosschainConfirm",
    }
    STATUS = { 0: "Unused", 1: "Pending", 2: "Confirmed", 3: "Rejected" }
    constructor(setDataKV, publicClient) {
        const chainId = publicClient.chain.id;
        for (let i = 0; i < networks.length; i++) {
            if (networks[i].chainId === chainId) {
                this.network = networks[i];
                this.bridgeAddr = networks[i].bridge;
                break;
            }
        }
        console.log('Network', this.network);
        this.publicClient = publicClient;
        this.dst_chains = [];
        this.merchats = [];
        this.FEE_RATE_BASE = 1_000_000;
        this.dec = 8;
        this.setDataKV = setDataKV;

        this.chain = {};
        this.bridge = {};
        this.fbtc = {};
        this.minter = {};
        this.fee = {};
        this.safe = {};

    }

    async initABI() {
        this.bridge_abi = await getABI('FireBridge');
        this.fbtc_abi = await getABI('FBTC');
        this.minter_abi = await getABI('FBTCMinter');
        this.feeModel_abi = await getABI('FeeModel');
        this.safe_abi = await getABI('Safe');
        this.fbtcGovernorModule_abi = await getABI('FBTCGovernorModule');
    }


    async initContract() {
        this.bridgeContract = getContract({ abi: this.bridge_abi, address: this.bridgeAddr, client: this.publicClient });
        this.fbtcAddr = await this.bridgeContract.read.fbtc();
        this.fbtcContract = getContract({ abi: this.fbtc_abi, address: this.fbtcAddr, client: this.publicClient });
        this.minterAddr = await this.bridgeContract.read.minter();
        this.minterContract = getContract({ abi: this.minter_abi, address: this.minterAddr, client: this.publicClient });
        this.feeModelAddr = await this.bridgeContract.read.feeModel();
        this.feeModelContract = getContract({ abi: this.feeModel_abi, address: this.feeModelAddr, client: this.publicClient });
    }

    async addrName(addr, with_balance = false) {
        if (!addr) {
            return null;
        }
        const code = await this.publicClient.getCode({ address: addr });
        if (code == null) {
            if (with_balance) {
                const eth = await this.publicClient.getBalance({ address: addr });
                return `${addr} EOA, Balance ${Number(eth) / 1e18} (${eth})`;
            } else {
                return `${addr} EOA`;
            }
        } else {
            const safe = getContract({ abi: this.safe_abi, address: addr, client: this.publicClient });
            try {
                const owners = await safe.read.getOwners();
                const threshold = await safe.read.getThreshold();
                return `${addr} Safe  ${threshold}/${owners.length}`;
            } catch (e) {
                return `${addr} Contract`;
            }
        }
    }


    async chainName(chain) {

        if (chain in this.FBTC_CHAIN_ID_TO_NAME) {
            return `${this.FBTC_CHAIN_ID_TO_NAME[chain]} (${chain})`;
        } else {
            const chainId = Number(chain);
            for (let i = 0; i < networks.length; i++) {
                if (networks[i].chainId === chainId) {
                    return `${networks[i].chainName} (${chain})`;
                }
            }
            return `Unknown chain (${chain})`;
        }
    }

    async to_btc(amount) {
        amount = Number(amount);
        if (amount === 2 ** 256 - 1) {
            return 'Uint256.MAX';
        }
        if (amount === 2 ** 224 - 1) {
            return 'Uint224.MAX';
        }

        return `${amount / 10 ** this.dec} FBTC`;

    }

    async parseAddress(address, chainIdStr){
        if (chainIdStr in this.FBTC_CHAIN_ID_TO_NAME) {
            return hexToString(address);
        } else {
            return "0x" + address.slice(26, 66);
        }
    }


    async getRoleList(contact, roleMethod, with_balance = true) {
        const role = await roleMethod();
        const roleList = await contact.read.getRoleMembers([role]);
        //console.log('roleList', roleList);
        const detailedList = await this.getAddressInfoList(roleList, with_balance);
        return detailedList;
    }

    async getAddressInfoList(addressList, with_balance = false) {
        const detailedList = [];
        for (let i = 0; i < addressList.length; i++) {
            const address = addressList[i];
            const addressInfo = await this.addrName(address, with_balance);
            detailedList.push({ address: address, addressInfo: addressInfo });
        }
        return detailedList;
    }


    async processFeeConfig(configs) {
        const FEE_RATE_BASE = this.FEE_RATE_BASE;
        const feeConfig = [];
        for (let i = 0; i < configs.length; i++) {
            const config = configs[i];
            let name = config.name;
            let address = null;
            if (isAddress(name)) {
                address = name;
                name = await this.addrName(address);
            } else if (name !== 'Default') {
                name = await this.chainName(name);
            }
            const maxFee = await this.to_btc(config.config.maxFee);
            const minFee = await this.to_btc(config.config.minFee);
            const tiers = [];
            for (let j = 0; j < config.config.tiers.length; j++) {
                const tier = config.config.tiers[j];
                const amount = await this.to_btc(tier.amountTier);
                tiers.push(`< ${amount}: ${Number(tier.feeRate) * 100 / FEE_RATE_BASE} %`);
            }
            feeConfig.push({ name: name, maxFee: maxFee, minFee: minFee, tiers: tiers, address: address });
        }
        console.log('feeConfig', feeConfig);
        return feeConfig;
    }

    async getChain() {
        const chainName = this.network.chainName
        const chainId = this.network.chainId
        const chain = { ...this.chain, info: `${chainName} (${chainId})` }
        this.setDataKV('chain', chain);
    }

    async getBridge() {
        const bridge = this.bridge;
        bridge.bridge = this.bridgeAddr;
        this.setDataKV('bridge', bridge);

        const ownerAddress = await this.bridgeContract.read.owner();
        const ownerString = await this.addrName(ownerAddress);
        bridge.ownerString = ownerString;
        bridge.ownerAddress = ownerAddress;
        this.setDataKV('bridge', bridge);

        const pendingOwnerAddress = await this.bridgeContract.read.pendingOwner();
        const pendingOwnerString = await this.addrName(pendingOwnerAddress);
        bridge.pendingOwnerString = pendingOwnerString;
        bridge.pendingOwnerAddress = pendingOwnerAddress;
        this.setDataKV('bridge', bridge);

        const paused = await this.bridgeContract.read.paused();
        bridge.paused = paused ? 'Yes' : 'No';
        this.setDataKV('bridge', bridge);

        const fbtc = await this.bridgeContract.read.fbtc();
        bridge.fbtc = fbtc;
        this.setDataKV('bridge', bridge);

        const minter = await this.bridgeContract.read.minter();
        bridge.minter = minter;
        this.setDataKV('bridge', bridge);

        const feeModel = await this.bridgeContract.read.feeModel();
        bridge.feeModel = feeModel;
        this.setDataKV('bridge', bridge);

        const feeRecipient = await this.bridgeContract.read.feeRecipient();
        const feeRecipientString = await this.addrName(feeRecipient);
        bridge.feeRecipient = feeRecipient;
        bridge.feeRecipientString = feeRecipientString;
        this.setDataKV('bridge', bridge);

        const mc = await this.bridgeContract.read.MAIN_CHAIN();
        bridge.mainChain = await this.chainName(mc);
        this.setDataKV('bridge', bridge);

        const cc = await this.bridgeContract.read.chain();
        bridge.chain = await this.chainName(cc);
        this.setDataKV('bridge', bridge);

        this.dst_chains = await this.bridgeContract.read.getValidDstChains();
        let whiteList = [];
        for (let i = 0; i < this.dst_chains.length; i++) {
            const chain = await this.chainName(this.dst_chains[i]);
            whiteList.push(chain);
        }
        bridge.whiteList = whiteList;
        this.setDataKV('bridge', bridge);

        const users = await this.bridgeContract.read.getQualifiedUsers();
        this.merchats = users;
        let qualifiedUsers = [];
        for (let i = 0; i < users.length; i++) {
            let evmAddress = users[i];
            let evmAddressString = await this.addrName(evmAddress);
            const info = await this.bridgeContract.read.getQualifiedUserInfo([evmAddress]);
            console.log('info', info);
            let qualifiedUser = {
                evmAddress: evmAddress,
                evmAddressString: evmAddressString,
                lock: info.locked ? 'Yes' : 'No',
                btcDeposit: info.depositAddress,
                btcWithdraw: info.withdrawalAddress,
            }
            qualifiedUsers.push(qualifiedUser);
        }
        bridge.qualifiedUsers = qualifiedUsers;
        this.setDataKV('bridge', bridge);
    }

    async getFBTC() {
        const fbtc = this.fbtc;
        fbtc.address = this.fbtcAddr;
        this.setDataKV('fbtc', fbtc);

        const bridge = await this.fbtcContract.read.bridge();
        fbtc.bridge = bridge;
        this.setDataKV('fbtc', fbtc);

        const ownerAddress = await this.fbtcContract.read.owner();
        const ownerString = await this.addrName(ownerAddress);
        fbtc.ownerString = ownerString;
        fbtc.ownerAddress = ownerAddress;
        this.setDataKV('fbtc', fbtc);

        const pendingOwnerAddress = await this.fbtcContract.read.pendingOwner();
        const pendingOwnerString = await this.addrName(pendingOwnerAddress);
        fbtc.pendingOwnerString = pendingOwnerString;
        fbtc.pendingOwnerAddress = pendingOwnerAddress;
        this.setDataKV('fbtc', fbtc);

        const paused = await this.fbtcContract.read.paused();
        fbtc.paused = paused ? 'Yes' : 'No';
        this.setDataKV('fbtc', fbtc);

        const dec = await this.fbtcContract.read.decimals();
        fbtc.decimals = Number(dec);
        this.dec = Number(dec);
        this.setDataKV('fbtc', fbtc);

        let totalSupply = await this.fbtcContract.read.totalSupply();
        totalSupply = Number(totalSupply)

        fbtc.totalSupply = await this.to_btc(totalSupply);
        this.setDataKV('fbtc', fbtc);
    }

    async getMinter() {
        const minter = this.minter;
        const fbtcMinter = this.minterAddr;
        minter.fbtcMinter = fbtcMinter;
        this.setDataKV('minter', minter);

        const ownerAddress = await this.minterContract.read.owner();
        const ownerString = await this.addrName(ownerAddress);
        minter.ownerString = ownerString;
        minter.ownerAddress = ownerAddress;
        this.setDataKV('minter', minter);

        const pendingOwnerAddress = await this.minterContract.read.pendingOwner();
        const pendingOwnerString = await this.addrName(pendingOwnerAddress);
        minter.pendingOwnerString = pendingOwnerString;
        minter.pendingOwnerAddress = pendingOwnerAddress;
        this.setDataKV('minter', minter);

        const bridge = await this.minterContract.read.bridge();
        minter.bridge = bridge;
        this.setDataKV('minter', minter);

        const minting = await this.getRoleList.call(this, this.minterContract, this.minterContract.read.MINT_ROLE);
        minter.minting = minting;
        this.setDataKV('minter', minter);

        const burning = await this.getRoleList.call(this, this.minterContract, this.minterContract.read.BURN_ROLE);
        minter.burning = burning;
        this.setDataKV('minter', minter);

        const crossing = await this.getRoleList.call(this, this.minterContract, this.minterContract.read.CROSSCHAIN_ROLE);
        minter.crossing = crossing;
        this.setDataKV('minter', minter);
    }

    async getFee() {
        const fee = this.fee;
        const feeModel = this.feeModelAddr;
        fee.feeModel = feeModel;
        this.setDataKV('fee', fee);

        const ownerAddress = await this.feeModelContract.read.owner();
        const ownerString = await this.addrName(ownerAddress);
        fee.ownerString = ownerString;
        fee.ownerAddress = ownerAddress;
        this.setDataKV('fee', fee);

        const pendingOwnerAddress = await this.feeModelContract.read.pendingOwner();
        const pendingOwnerString = await this.addrName(pendingOwnerAddress);
        fee.pendingOwnerString = pendingOwnerString;
        fee.pendingOwnerAddress = pendingOwnerAddress;
        this.setDataKV('fee', fee);

        const FEE_RATE_BASE = await this.feeModelContract.read.FEE_RATE_BASE();
        this.FEE_RATE_BASE = Number(FEE_RATE_BASE);
        fee.FEE_RATE_BASE = this.FEE_RATE_BASE;
        this.setDataKV('fee', fee);

        const MINT_OP = 1;
        const BURN_OP = 2;
        const CROSS_OP = 3;

        let configs = [];
        const mint_config = await this.feeModelContract.read.getDefaultFeeConfig([MINT_OP]);
        configs.push({ name: 'Default', config: mint_config });
        fee.mint = await this.processFeeConfig(configs);
        this.setDataKV('fee', fee);

        configs = [];
        const burn_config = await this.feeModelContract.read.getDefaultFeeConfig([BURN_OP]);
        configs.push({ name: 'Default', config: burn_config });
        if (!this.merchats) {
            this.merchats = await this.bridgeContract.read.getQualifiedUsers();
        }
        console.log('merchats', this.merchats);
        for (let i = 0; i < this.merchats.length; i++) {
            try {
                const merchant = this.merchats[i];
                const merchant_config = await this.feeModelContract.read.getUserBurnFeeConfig([merchant]);
                configs.push({ name: this.merchats[i], config: merchant_config });
            } catch (e) {
                console.log(e.message);
                continue;
            }
        }
        fee.burn = await this.processFeeConfig(configs);
        this.setDataKV('fee', fee);

        configs = [];
        const cross_config = await this.feeModelContract.read.getDefaultFeeConfig([CROSS_OP]);
        configs.push({ name: 'Default', config: cross_config });
        if (!this.dst_chains) {
            this.dst_chains = await this.bridgeContract.read.getValidDstChains();
        }
        console.log('dst_chains', this.dst_chains);
        for (let i = 0; i < this.dst_chains.length; i++) {
            try {
                const chain = this.dst_chains[i];
                const cross_chain_config = await this.feeModelContract.read.getCrosschainFeeConfig([chain]);
                configs.push({ name: this.dst_chains[i], config: cross_chain_config });
            } catch (e) {
                console.log(e.message);
                continue;
            }
        }
        fee.cross = await this.processFeeConfig(configs);
        this.setDataKV('fee', fee);
    }

    async getSafe() {
        const safe = this.safe;

        const addr = await this.bridgeContract.read.owner();
        safe.ownerSafe = addr;
        this.setDataKV('safe', safe);

        let safeContract;
        try {
            safeContract = new getContract({ abi: this.safe_abi, address: addr, client: this.publicClient });
            const version = await safeContract.read.VERSION();
            safe.version = version;
            this.setDataKV('safe', safe);
        } catch (e) {
            console.log(e.message);
            console.log(`FireBridge owner is not Safe wallet ${addr}`);
            return;
        }
        const ownerAddresses = await safeContract.read.getOwners();
        const threshold = await safeContract.read.getThreshold();
        safe.threshold = `${threshold}/${ownerAddresses.length}`;
        this.setDataKV('safe', safe);

        const owners = await this.getAddressInfoList(ownerAddresses);
        safe.owners = owners;
        this.setDataKV('safe', safe);

        const ONE = "0x0000000000000000000000000000000000000001"
        let modules = await safeContract.read.getModulesPaginated([ONE, 1000]);
        //console.log('Find Modules', modules);
        if (modules[1] !== ONE) {
            console.log('Too Many Modules');
        }

        modules = modules[0];
        const moduleList = [];
        for (let i = 0; i < modules.length; i++) {
            const module = modules[i];
            try {
                const fbtcGovernorModule = new getContract({ abi: this.fbtcGovernorModule_abi, address: module, client: this.publicClient });
                const qualiManagers = await this.getRoleList.call(this, fbtcGovernorModule, fbtcGovernorModule.read.USER_MANAGER_ROLE, false);
                const blockManagers = await this.getRoleList.call(this, fbtcGovernorModule, fbtcGovernorModule.read.LOCKER_ROLE, false);
                const fbtcPausers = await this.getRoleList.call(this, fbtcGovernorModule, fbtcGovernorModule.read.FBTC_PAUSER_ROLE, false);
                const fbridgePausers = await this.getRoleList.call(this, fbtcGovernorModule, fbtcGovernorModule.read.BRIDGE_PAUSER_ROLE, false);
                const targetsManagers = await this.getRoleList.call(this, fbtcGovernorModule, fbtcGovernorModule.read.CHAIN_MANAGER_ROLE, false);
                const feeUpdaters = await this.getRoleList.call(this, fbtcGovernorModule, fbtcGovernorModule.read.FEE_UPDATER_ROLE, false);
                const ownerAddress = await fbtcGovernorModule.read.owner();
                const ownerString = await this.addrName(ownerAddress);
                const pendingOwnerAddress = await fbtcGovernorModule.read.pendingOwner();
                const pendingOwnerString = await this.addrName(pendingOwnerAddress);

                moduleList.push({ address: module, isGover: true, qualiManagers: qualiManagers, blockManagers: blockManagers, fbtcPausers: fbtcPausers, fbridgePausers: fbridgePausers, targetsManagers: targetsManagers, feeUpdaters: feeUpdaters, ownerString: ownerString, ownerAddress: ownerAddress, pendingOwnerString: pendingOwnerString, pendingOwnerAddress: pendingOwnerAddress });
            } catch (e) {
                console.log(e.message);
                console.log(`Module ${module} is not a FBTCGovernorModule`);
                moduleList.push({ address: module, isGover: false });
                continue;
            }
        }
        safe.modules = moduleList;
        this.setDataKV('safe', safe);
    }

    async getDataForOperation() {
        const bridge = this.bridge;
        bridge.address = this.bridgeAddr;
        bridge.whiteList = await this.bridgeContract.read.getValidDstChains();
        this.dst_chains = await this.bridgeContract.read.getValidDstChains();
        let whiteList = [];
        for (let i = 0; i < this.dst_chains.length; i++) {
            const chain = await this.chainName(this.dst_chains[i]);
            whiteList.push({ key: chain, value: this.dst_chains[i] });
        }
        bridge.whiteList = whiteList;
        const gover = {};
        gover.address = [];
        const addr = await this.bridgeContract.read.owner();
        let safeContract;
        try {
            safeContract = new getContract({ abi: this.safe_abi, address: addr, client: this.publicClient });
            await safeContract.read.VERSION();
        } catch (e) {
            console.log(`FireBridge owner is not Safe wallet ${addr}`);
            return;
        }

        const ONE = "0x0000000000000000000000000000000000000001"
        let modules = await safeContract.read.getModulesPaginated([ONE, 1000]);
        console.log('Find Modules', modules);
        if (modules[1] !== ONE) {
            console.log('Too Many Modules');
        }

        modules = modules[0];
        for (let i = 0; i < modules.length; i++) {
            const module = modules[i];
            try {
                const fbtcGovernorModule = new getContract({ abi: this.fbtcGovernorModule_abi, address: module, client: this.publicClient });
                await this.getRoleList.call(this, fbtcGovernorModule, fbtcGovernorModule.read.CHAIN_MANAGER_ROLE, false);
                gover.address.push(module);
            } catch (e) {
                console.log(e.message);
                console.log(`Module ${module} is not a FBTCGovernorModule`);
                continue;
            }
        }
        this.setDataKV('bridge', bridge);
        this.setDataKV('gover', gover);
    }

    async getRequestData(queryNum) {
        const bridge = getContract({ abi: this.bridge_abi, address: this.bridgeAddr, client: this.publicClient });
        const nonce = await bridge.read.nonce();
        const end = Number(nonce) - 1;
        const start = end - 100 + 1;
        let reqs = await bridge.read.getRequestsByIdRange([start, end]);
        reqs = reqs.reverse().slice(0, queryNum);
        console.log('reqs', reqs);
        await Promise.all(reqs.map(async req => {
            req.hash = await bridge.read.requestHashes([req.nonce]);
            req.nonce = Number(req.nonce);
            req.fee = Number(req.fee);
            req.amount = Number(req.amount);
            req.src_chain_id = Number(req.srcChain);
            req.dst_chain_id = Number(req.dstChain);
            if (req.status === 1) {
                req.totalStatus = 'Pending';
            } else if (req.op === 3) {
                const chain = config.chains.find((c) => c.id === req.dst_chain_id);
                const network = networks.find((n) => n.chainId === req.dst_chain_id);
                const dst_chain_publicClient = createPublicClient({ chain: chain, transport: http() });
                const dst_bridge = getContract({ abi: this.bridge_abi, address: network.bridge, client: dst_chain_publicClient });
                const dst_hash = await dst_bridge.read.crosschainRequestConfirmation([req.hash]);
                if (dst_hash === '0x0000000000000000000000000000000000000000000000000000000000000000') {
                    req.totalStatus = 'Pending';
                } else {
                    req.totalStatus = `Confirmed: ${dst_hash}`;
                }
            } else {
                req.totalStatus = `Confirmed`
            }

            req.op = `${req.op} (${this.OP[req.op]})`;
            req.status = `${req.status} (${this.STATUS[req.status]})`;
            req.srcAddress = await this.parseAddress(req.srcAddress, req.srcChain);
            req.dstAddress = await this.parseAddress(req.dstAddress, req.dstChain);
            req.srcChain = await this.chainName(req.srcChain);
            req.dstChain = await this.chainName(req.dstChain);
        }));
        return { reqs: reqs };
    }
}





const fetchDisplayData = async (setDataKV, publicClient) => {
    const viewer = new Viewer(setDataKV, publicClient);
    await viewer.initABI();
    console.log('InitABI done');
    await viewer.initContract();
    console.log('InitContract done');
    await viewer.getChain();
    console.log('getChain done');
    await viewer.getBridge();
    console.log('getBridge done');
    await viewer.getFBTC();
    console.log('getFBTC done');
    await viewer.getMinter();
    console.log('getMinter done');
    await viewer.getFee();
    console.log('getFee done');
    await viewer.getSafe();
    console.log('getSafe done');
    console.log('FetchData done');
}

const fetchOperationData = async (setDataKV, publicClient) => {
    const viewer = new Viewer(setDataKV, publicClient);
    await viewer.initABI();
    console.log('InitABI done');
    await viewer.initContract();
    await viewer.getDataForOperation();
    console.log('FetchData done');
}

const fetchRequestData = async (setDataKV, publicClient, queryNum) => {
    const viewer = new Viewer(setDataKV, publicClient);
    await viewer.initABI();
    console.log('InitABI done');
    const fetchData = await viewer.getRequestData(queryNum);
    console.log('FetchData done');
    return fetchData;
}



export { getABI, fetchDisplayData, fetchOperationData, fetchRequestData };