import { assert, ethers, getNumber } from 'ethers';
import networks from '../Wallet/networks.json';


async function getABI(name) {
    const abi = await import(`./abi/${name}.json`);
    return abi.default;
}

class Viewer {
    FBTC_CHAIN_ID_TO_NAME = {
        "0x0100000000000000000000000000000000000000000000000000000000000000": "BTC Mainnet",
        "0x0110000000000000000000000000000000000000000000000000000000000000": "BTC XTN Testnet",
    }

    constructor(context, setDataKV) {
        const signer = context.signer;
        const bridge = context.network.bridge;
        this.network = context.network;
        this.signer = signer;
        this.bridgeAddr = bridge;

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
        this.bridgeContract = new ethers.Contract(this.bridgeAddr, this.bridge_abi, this.signer);
        this.fbtcAddr = await this.bridgeContract.fbtc();
        this.fbtcContract = new ethers.Contract(this.fbtcAddr, this.fbtc_abi, this.signer);
        this.minterAddr = await this.bridgeContract.minter();
        this.minterContract = new ethers.Contract(this.minterAddr, this.minter_abi, this.signer);
        this.feeModelAddr = await this.bridgeContract.feeModel();
        this.feeModelContract = new ethers.Contract(this.feeModelAddr, this.feeModel_abi, this.signer);
    }

    async addrName(addr, with_balance = false) {
        if (!addr) {
            return null;
        }
        const code = await this.signer.provider.getCode(addr);
        if (code === '0x') {
            if (with_balance) {
                const eth = await this.signer.provider.getBalance(addr);
                return `${addr} EOA, Balance ${Number(eth) / 1e18} (${eth})`;
            } else {
                return `${addr} EOA`;
            }
        } else {
            const safe = new ethers.Contract(addr, this.safe_abi, this.signer);
            try {
                const owners = await safe.getOwners();
                const threshold = await safe.getThreshold();
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
            const chainId = getNumber(chain);
            for (let i = 0; i < networks.length; i++) {
                if (networks[i].chainId === chainId) {
                    return `${networks[i].chainName} (${chain})`;
                }
            }
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

    async getRoleList(contact, roleMethod, with_balance = true) {
        const role = await roleMethod();
        const roleList = await contact.getRoleMembers(role);
        console.log('roleList', roleList);
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
            const name = config.name;
            const maxFee = await this.to_btc(config.config[0]);
            const minFee = await this.to_btc(config.config[1]);
            const tiers = [];
            for (let j = 0; j < config.config[2].length; j++) {
                const tier = config.config[2][j];
                const amount = await this.to_btc(tier[0]);
                tiers.push(`< ${amount}: ${Number(tier[1]) * 100 / FEE_RATE_BASE} %`);
            }
            feeConfig.push({ name: name, maxFee: maxFee, minFee: minFee, tiers: tiers });
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

        const ownerAddress = await this.bridgeContract.owner();
        const ownerString = await this.addrName(ownerAddress);
        bridge.ownerString = ownerString;
        bridge.ownerAddress = ownerAddress;
        this.setDataKV('bridge', bridge);

        const pendingOwnerAddress = await this.bridgeContract.pendingOwner();
        const pendingOwnerString = await this.addrName(pendingOwnerAddress);
        bridge.pendingOwnerString = pendingOwnerString;
        bridge.pendingOwnerAddress = pendingOwnerAddress;
        this.setDataKV('bridge', bridge);

        const paused = await this.bridgeContract.paused();
        bridge.paused = paused ? 'Yes' : 'No';
        this.setDataKV('bridge', bridge);

        const fbtc = await this.bridgeContract.fbtc();
        bridge.fbtc = fbtc;
        this.setDataKV('bridge', bridge);

        const minter = await this.bridgeContract.minter();
        bridge.minter = minter;
        this.setDataKV('bridge', bridge);

        const feeModel = await this.bridgeContract.feeModel();
        bridge.feeModel = feeModel;
        this.setDataKV('bridge', bridge);

        const feeRecipient = await this.bridgeContract.feeRecipient();
        const feeRecipientString = await this.addrName(feeRecipient);
        bridge.feeRecipient = feeRecipient;
        bridge.feeRecipientString = feeRecipientString;
        this.setDataKV('bridge', bridge);

        const mc = await this.bridgeContract.MAIN_CHAIN();
        bridge.mainChain = await this.chainName(mc);
        this.setDataKV('bridge', bridge);

        const cc = await this.bridgeContract.chain();
        bridge.chain = await this.chainName(cc);
        this.setDataKV('bridge', bridge);

        this.dst_chains = await this.bridgeContract.getValidDstChains();
        let whiteList = [];
        for (let i = 0; i < this.dst_chains.length; i++) {
            const chain = await this.chainName(this.dst_chains[i]);
            whiteList.push(chain);
        }
        bridge.whiteList = whiteList;
        this.setDataKV('bridge', bridge);

        const users = await this.bridgeContract.getQualifiedUsers();
        this.merchats = users;
        let qualifiedUsers = [];
        for (let i = 0; i < users.length; i++) {
            let evmAddress = users[i];
            let evmAddressString = await this.addrName(evmAddress);
            const info = await this.bridgeContract.getQualifiedUserInfo(evmAddress);
            let qualifiedUser = {
                evmAddress: evmAddress,
                evmAddressString: evmAddressString,
                lock: info[0] ? 'Yes' : 'No',
                btcDeposit: info[1],
                btcWithdraw: info[2],
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

        const bridge = await this.fbtcContract.bridge();
        fbtc.bridge = bridge;
        this.setDataKV('fbtc', fbtc);

        const ownerAddress = await this.fbtcContract.owner();
        const ownerString = await this.addrName(ownerAddress);
        fbtc.ownerString = ownerString;
        fbtc.ownerAddress = ownerAddress;
        this.setDataKV('fbtc', fbtc);

        const pendingOwnerAddress = await this.fbtcContract.pendingOwner();
        const pendingOwnerString = await this.addrName(pendingOwnerAddress);
        fbtc.pendingOwnerString = pendingOwnerString;
        fbtc.pendingOwnerAddress = pendingOwnerAddress;
        this.setDataKV('fbtc', fbtc);

        const paused = await this.fbtcContract.paused();
        fbtc.paused = paused ? 'Yes' : 'No';
        this.setDataKV('fbtc', fbtc);

        const dec = await this.fbtcContract.decimals();
        fbtc.decimals = Number(dec);
        this.dec = Number(dec);
        this.setDataKV('fbtc', fbtc);

        let totalSupply = await this.fbtcContract.totalSupply();
        totalSupply = Number(totalSupply)

        fbtc.totalSupply = await this.to_btc(totalSupply);
        this.setDataKV('fbtc', fbtc);
    }

    async getMinter() {
        const minter = this.minter;
        const fbtcMinter = this.minterAddr;
        minter.fbtcMinter = fbtcMinter;
        this.setDataKV('minter', minter);

        const ownerAddress = await this.minterContract.owner();
        const ownerString = await this.addrName(ownerAddress);
        minter.ownerString = ownerString;
        minter.ownerAddress = ownerAddress;
        this.setDataKV('minter', minter);

        const pendingOwnerAddress = await this.minterContract.pendingOwner();
        const pendingOwnerString = await this.addrName(pendingOwnerAddress);
        minter.pendingOwnerString = pendingOwnerString;
        minter.pendingOwnerAddress = pendingOwnerAddress;
        this.setDataKV('minter', minter);

        const bridge = await this.minterContract.bridge();
        minter.bridge = bridge;
        this.setDataKV('minter', minter);

        const minting = await this.getRoleList.call(this, this.minterContract, this.minterContract.MINT_ROLE);
        minter.minting = minting;
        this.setDataKV('minter', minter);

        const burning = await this.getRoleList.call(this, this.minterContract, this.minterContract.BURN_ROLE);
        minter.burning = burning;
        this.setDataKV('minter', minter);

        const crossing = await this.getRoleList.call(this, this.minterContract, this.minterContract.CROSSCHAIN_ROLE);
        minter.crossing = crossing;
        this.setDataKV('minter', minter);
    }

    async getFee() {
        const fee = this.fee;
        const feeModel = this.feeModelAddr;
        fee.feeModel = feeModel;
        this.setDataKV('fee', fee);

        const ownerAddress = await this.feeModelContract.owner();
        const ownerString = await this.addrName(ownerAddress);
        fee.ownerString = ownerString;
        fee.ownerAddress = ownerAddress;
        this.setDataKV('fee', fee);

        const pendingOwnerAddress = await this.feeModelContract.pendingOwner();
        const pendingOwnerString = await this.addrName(pendingOwnerAddress);
        fee.pendingOwnerString = pendingOwnerString;
        fee.pendingOwnerAddress = pendingOwnerAddress;
        this.setDataKV('fee', fee);

        const FEE_RATE_BASE = await this.feeModelContract.FEE_RATE_BASE();
        this.FEE_RATE_BASE = Number(FEE_RATE_BASE);

        const MINT_OP = 1;
        const BURN_OP = 2;
        const CROSS_OP = 3;

        let configs = [];
        const mint_config = await this.feeModelContract.getDefaultFeeConfig(MINT_OP);
        configs.push({ name: 'Default', config: mint_config });
        fee.mint = await this.processFeeConfig(configs);
        this.setDataKV('fee', fee);

        configs = [];
        const burn_config = await this.feeModelContract.getDefaultFeeConfig(BURN_OP);
        configs.push({ name: 'Default', config: burn_config });
        if (!this.merchats) {
            this.merchats = await this.bridgeContract.getQualifiedUsers();
        }
        for (let i = 0; i < this.merchats.length; i++) {
            try {
                const merchant = this.merchats[i];
                const merchant_config = await this.feeModelContract.getUserBurnFeeConfig(merchant);
                configs.push({ name: this.merchats[i], config: merchant_config });
            } catch (e) {
                continue;
            }
        }
        fee.burn = await this.processFeeConfig(configs);
        this.setDataKV('fee', fee);

        configs = [];
        const cross_config = await this.feeModelContract.getDefaultFeeConfig(CROSS_OP);
        configs.push({ name: 'Default', config: cross_config });
        if (!this.dst_chains) {
            this.dst_chains = await this.bridgeContract.getValidDstChains();
        }
        for (let i = 0; i < this.dst_chains.length; i++) {
            try {
                const chain = this.dst_chains[i];
                const cross_chain_config = await this.feeModelContract.getChainCrossFeeConfig(chain);
                configs.push({ name: this.dst_chains[i], config: cross_chain_config });
            } catch (e) {
                continue;
            }
        }
        fee.cross = await this.processFeeConfig(configs);
        this.setDataKV('fee', fee);
    }

    async getSafe() {
        const safe = this.safe;

        const addr = await this.bridgeContract.owner();
        safe.ownerSafe = addr;
        this.setDataKV('safe', safe);

        let safeContract;
        try {
            safeContract = new ethers.Contract(addr, this.safe_abi, this.signer);
            const version = await safeContract.VERSION();
            safe.version = version;
            this.setDataKV('safe', safe);
        } catch (e) {
            console.log(e.message);
            console.log(`FireBridge owner is not Safe wallet ${addr}`);
            return;
        }
        const ownerAddresses = await safeContract.getOwners();
        const threshold = await safeContract.getThreshold();
        safe.threshold = `${threshold}/${ownerAddresses.length}`;
        this.setDataKV('safe', safe);

        const owners = await this.getAddressInfoList(ownerAddresses);
        safe.owners = owners;
        this.setDataKV('safe', safe);

        const ONE = "0x0000000000000000000000000000000000000001"
        let modules = await safeContract.getModulesPaginated(ONE, 1000);
        console.log('Find ModulesLength', modules.length);
        assert(modules[1] === ONE, 'Too Many Modules');

        modules = modules[0];
        const moduleList = [];
        for (let i = 0; i < modules.length; i++) {
            const module = modules[i];
            try {
                const fbtcGovernorModule = new ethers.Contract(module, this.fbtcGovernorModule_abi, this.signer);
                const qualiManagers = await this.getRoleList.call(this, fbtcGovernorModule, fbtcGovernorModule.USER_MANAGER_ROLE, false);
                const blockManagers = await this.getRoleList.call(this, fbtcGovernorModule, fbtcGovernorModule.LOCKER_ROLE, false);
                const fbtcPausers = await this.getRoleList.call(this, fbtcGovernorModule, fbtcGovernorModule.FBTC_PAUSER_ROLE, false);
                const fbridgePausers = await this.getRoleList.call(this, fbtcGovernorModule, fbtcGovernorModule.BRIDGE_PAUSER_ROLE, false);
                const targetsManagers = await this.getRoleList.call(this, fbtcGovernorModule, fbtcGovernorModule.CHAIN_MANAGER_ROLE, false);
                const feeUpdaters = await this.getRoleList.call(this, fbtcGovernorModule, fbtcGovernorModule.FEE_UPDATER_ROLE, false);
                moduleList.push({ address: module, isGover: true, qualiManagers: qualiManagers, blockManagers: blockManagers, fbtcPausers: fbtcPausers, fbridgePausers: fbridgePausers, targetsManagers: targetsManagers, feeUpdaters: feeUpdaters });
            } catch (e) {
                console.log(e.message);
                console.log(`Module ${module} is not a FBTCGovernorModule`);
                moduleList.push({ address: module, isGover: false });
                continue;
            }
        }
        safe.modules = moduleList;
        console.log('modules', moduleList);
        this.setDataKV('safe', safe);
    }
}





const fetchData = async (setDataKV, context) => {
    const viewer = new Viewer(context, setDataKV);
    await viewer.initABI();
    await viewer.initContract();
    await viewer.getChain();
    await viewer.getBridge();
    await viewer.getFBTC();
    await viewer.getMinter();
    await viewer.getFee();
    await viewer.getSafe();
    console.log('FetchData done');
}


export default fetchData;