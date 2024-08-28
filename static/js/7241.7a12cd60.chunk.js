"use strict";(self.webpackChunkfbtc_tool_webui=self.webpackChunkfbtc_tool_webui||[]).push([[7241],{37241:e=>{e.exports=JSON.parse('[{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"bytes32","name":"_mainChain","type":"bytes32"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"target","type":"address"}],"name":"AddressEmptyCode","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"AddressInsufficientBalance","type":"error"},{"inputs":[{"internalType":"address","name":"implementation","type":"address"}],"name":"ERC1967InvalidImplementation","type":"error"},{"inputs":[],"name":"ERC1967NonPayable","type":"error"},{"inputs":[],"name":"EnforcedPause","type":"error"},{"inputs":[],"name":"ExpectedPause","type":"error"},{"inputs":[],"name":"FailedInnerCall","type":"error"},{"inputs":[],"name":"InvalidInitialization","type":"error"},{"inputs":[],"name":"NotInitializing","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"SafeERC20FailedOperation","type":"error"},{"inputs":[],"name":"UUPSUnauthorizedCallContext","type":"error"},{"inputs":[{"internalType":"bytes32","name":"slot","type":"bytes32"}],"name":"UUPSUnsupportedProxiableUUID","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"_depositTxid","type":"bytes32"},{"indexed":true,"internalType":"uint256","name":"_outputIndex","type":"uint256"}],"name":"DepositTxBlocked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"_dstChain","type":"bytes32"}],"name":"DstChainAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"_dstChain","type":"bytes32"}],"name":"DstChainRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_feeModel","type":"address"}],"name":"FeeModelSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_feeRecipient","type":"address"},{"indexed":true,"internalType":"uint256","name":"_feeAmount","type":"uint256"}],"name":"FeePaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_feeRecipient","type":"address"}],"name":"FeeRecipientSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint64","name":"version","type":"uint64"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_minter","type":"address"}],"name":"MinterSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferStarted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_user","type":"address"},{"indexed":false,"internalType":"string","name":"_depositAddress","type":"string"},{"indexed":false,"internalType":"string","name":"_withdrawalAddress","type":"string"}],"name":"QualifiedUserAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_user","type":"address"},{"indexed":false,"internalType":"string","name":"_depositAddress","type":"string"},{"indexed":false,"internalType":"string","name":"_withdrawalAddress","type":"string"}],"name":"QualifiedUserEdited","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_user","type":"address"}],"name":"QualifiedUserLocked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_user","type":"address"}],"name":"QualifiedUserRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_user","type":"address"}],"name":"QualifiedUserUnlocked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"_hash","type":"bytes32"},{"indexed":true,"internalType":"enum Operation","name":"op","type":"uint8"},{"components":[{"internalType":"enum Operation","name":"op","type":"uint8"},{"internalType":"enum Status","name":"status","type":"uint8"},{"internalType":"uint128","name":"nonce","type":"uint128"},{"internalType":"bytes32","name":"srcChain","type":"bytes32"},{"internalType":"bytes","name":"srcAddress","type":"bytes"},{"internalType":"bytes32","name":"dstChain","type":"bytes32"},{"internalType":"bytes","name":"dstAddress","type":"bytes"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"fee","type":"uint256"},{"internalType":"bytes","name":"extra","type":"bytes"}],"indexed":false,"internalType":"struct Request","name":"_r","type":"tuple"}],"name":"RequestAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"_hash","type":"bytes32"}],"name":"RequestConfirmed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_token","type":"address"}],"name":"TokenSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"implementation","type":"address"}],"name":"Upgraded","type":"event"},{"inputs":[],"name":"MAIN_CHAIN","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"UPGRADE_INTERFACE_VERSION","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"acceptOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"addBurnRequest","outputs":[{"internalType":"bytes32","name":"_hash","type":"bytes32"},{"components":[{"internalType":"enum Operation","name":"op","type":"uint8"},{"internalType":"enum Status","name":"status","type":"uint8"},{"internalType":"uint128","name":"nonce","type":"uint128"},{"internalType":"bytes32","name":"srcChain","type":"bytes32"},{"internalType":"bytes","name":"srcAddress","type":"bytes"},{"internalType":"bytes32","name":"dstChain","type":"bytes32"},{"internalType":"bytes","name":"dstAddress","type":"bytes"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"fee","type":"uint256"},{"internalType":"bytes","name":"extra","type":"bytes"}],"internalType":"struct Request","name":"_r","type":"tuple"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_targetChain","type":"bytes32"},{"internalType":"bytes","name":"_targetAddress","type":"bytes"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"addCrosschainRequest","outputs":[{"internalType":"bytes32","name":"_hash","type":"bytes32"},{"components":[{"internalType":"enum Operation","name":"op","type":"uint8"},{"internalType":"enum Status","name":"status","type":"uint8"},{"internalType":"uint128","name":"nonce","type":"uint128"},{"internalType":"bytes32","name":"srcChain","type":"bytes32"},{"internalType":"bytes","name":"srcAddress","type":"bytes"},{"internalType":"bytes32","name":"dstChain","type":"bytes32"},{"internalType":"bytes","name":"dstAddress","type":"bytes"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"fee","type":"uint256"},{"internalType":"bytes","name":"extra","type":"bytes"}],"internalType":"struct Request","name":"_r","type":"tuple"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32[]","name":"_dstChains","type":"bytes32[]"}],"name":"addDstChains","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_targetChainId","type":"uint256"},{"internalType":"address","name":"_targetAddress","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"addEVMCrosschainRequest","outputs":[{"internalType":"bytes32","name":"_hash","type":"bytes32"},{"components":[{"internalType":"enum Operation","name":"op","type":"uint8"},{"internalType":"enum Status","name":"status","type":"uint8"},{"internalType":"uint128","name":"nonce","type":"uint128"},{"internalType":"bytes32","name":"srcChain","type":"bytes32"},{"internalType":"bytes","name":"srcAddress","type":"bytes"},{"internalType":"bytes32","name":"dstChain","type":"bytes32"},{"internalType":"bytes","name":"dstAddress","type":"bytes"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"fee","type":"uint256"},{"internalType":"bytes","name":"extra","type":"bytes"}],"internalType":"struct Request","name":"_r","type":"tuple"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"bytes32","name":"_depositTxid","type":"bytes32"},{"internalType":"uint256","name":"_outputIndex","type":"uint256"}],"name":"addMintRequest","outputs":[{"internalType":"bytes32","name":"_hash","type":"bytes32"},{"components":[{"internalType":"enum Operation","name":"op","type":"uint8"},{"internalType":"enum Status","name":"status","type":"uint8"},{"internalType":"uint128","name":"nonce","type":"uint128"},{"internalType":"bytes32","name":"srcChain","type":"bytes32"},{"internalType":"bytes","name":"srcAddress","type":"bytes"},{"internalType":"bytes32","name":"dstChain","type":"bytes32"},{"internalType":"bytes","name":"dstAddress","type":"bytes"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"fee","type":"uint256"},{"internalType":"bytes","name":"extra","type":"bytes"}],"internalType":"struct Request","name":"_r","type":"tuple"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"string","name":"_depositAddress","type":"string"},{"internalType":"string","name":"_withdrawalAddress","type":"string"}],"name":"addQualifiedUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_depositTxid","type":"bytes32"},{"internalType":"uint256","name":"_outputIndex","type":"uint256"}],"name":"blockDepositTx","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"enum Operation","name":"op","type":"uint8"},{"internalType":"enum Status","name":"status","type":"uint8"},{"internalType":"uint128","name":"nonce","type":"uint128"},{"internalType":"bytes32","name":"srcChain","type":"bytes32"},{"internalType":"bytes","name":"srcAddress","type":"bytes"},{"internalType":"bytes32","name":"dstChain","type":"bytes32"},{"internalType":"bytes","name":"dstAddress","type":"bytes"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"fee","type":"uint256"},{"internalType":"bytes","name":"extra","type":"bytes"}],"internalType":"struct Request","name":"_r","type":"tuple"}],"name":"calculateRequestHash","outputs":[{"internalType":"bytes32","name":"_hash","type":"bytes32"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"chain","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_hash","type":"bytes32"},{"internalType":"bytes32","name":"_withdrawalTxid","type":"bytes32"},{"internalType":"uint256","name":"_outputIndex","type":"uint256"}],"name":"confirmBurnRequest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"enum Operation","name":"op","type":"uint8"},{"internalType":"enum Status","name":"status","type":"uint8"},{"internalType":"uint128","name":"nonce","type":"uint128"},{"internalType":"bytes32","name":"srcChain","type":"bytes32"},{"internalType":"bytes","name":"srcAddress","type":"bytes"},{"internalType":"bytes32","name":"dstChain","type":"bytes32"},{"internalType":"bytes","name":"dstAddress","type":"bytes"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"fee","type":"uint256"},{"internalType":"bytes","name":"extra","type":"bytes"}],"internalType":"struct Request","name":"r","type":"tuple"}],"name":"confirmCrosschainRequest","outputs":[{"internalType":"bytes32","name":"_dsthash","type":"bytes32"},{"components":[{"internalType":"enum Operation","name":"op","type":"uint8"},{"internalType":"enum Status","name":"status","type":"uint8"},{"internalType":"uint128","name":"nonce","type":"uint128"},{"internalType":"bytes32","name":"srcChain","type":"bytes32"},{"internalType":"bytes","name":"srcAddress","type":"bytes"},{"internalType":"bytes32","name":"dstChain","type":"bytes32"},{"internalType":"bytes","name":"dstAddress","type":"bytes"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"fee","type":"uint256"},{"internalType":"bytes","name":"extra","type":"bytes"}],"internalType":"struct Request","name":"_dstRequest","type":"tuple"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_hash","type":"bytes32"}],"name":"confirmMintRequest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"srcHash","type":"bytes32"}],"name":"crosschainRequestConfirmation","outputs":[{"internalType":"bytes32","name":"dstHash","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"depositAddress","type":"string"}],"name":"depositAddressToUser","outputs":[{"internalType":"address","name":"qualifiedUser","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"string","name":"_depositAddress","type":"string"},{"internalType":"string","name":"_withdrawalAddress","type":"string"}],"name":"editQualifiedUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"fbtc","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeModel","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeRecipient","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getActiveUsers","outputs":[{"internalType":"address[]","name":"_users","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getQualifiedUserInfo","outputs":[{"components":[{"internalType":"bool","name":"locked","type":"bool"},{"internalType":"string","name":"depositAddress","type":"string"},{"internalType":"string","name":"withdrawalAddress","type":"string"}],"internalType":"struct UserInfo","name":"info","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getQualifiedUsers","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_hash","type":"bytes32"}],"name":"getRequestByHash","outputs":[{"components":[{"internalType":"enum Operation","name":"op","type":"uint8"},{"internalType":"enum Status","name":"status","type":"uint8"},{"internalType":"uint128","name":"nonce","type":"uint128"},{"internalType":"bytes32","name":"srcChain","type":"bytes32"},{"internalType":"bytes","name":"srcAddress","type":"bytes"},{"internalType":"bytes32","name":"dstChain","type":"bytes32"},{"internalType":"bytes","name":"dstAddress","type":"bytes"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"fee","type":"uint256"},{"internalType":"bytes","name":"extra","type":"bytes"}],"internalType":"struct Request","name":"r","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"getRequestById","outputs":[{"components":[{"internalType":"enum Operation","name":"op","type":"uint8"},{"internalType":"enum Status","name":"status","type":"uint8"},{"internalType":"uint128","name":"nonce","type":"uint128"},{"internalType":"bytes32","name":"srcChain","type":"bytes32"},{"internalType":"bytes","name":"srcAddress","type":"bytes"},{"internalType":"bytes32","name":"dstChain","type":"bytes32"},{"internalType":"bytes","name":"dstAddress","type":"bytes"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"fee","type":"uint256"},{"internalType":"bytes","name":"extra","type":"bytes"}],"internalType":"struct Request","name":"r","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32[]","name":"_hashes","type":"bytes32[]"}],"name":"getRequestsByHashes","outputs":[{"components":[{"internalType":"enum Operation","name":"op","type":"uint8"},{"internalType":"enum Status","name":"status","type":"uint8"},{"internalType":"uint128","name":"nonce","type":"uint128"},{"internalType":"bytes32","name":"srcChain","type":"bytes32"},{"internalType":"bytes","name":"srcAddress","type":"bytes"},{"internalType":"bytes32","name":"dstChain","type":"bytes32"},{"internalType":"bytes","name":"dstAddress","type":"bytes"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"fee","type":"uint256"},{"internalType":"bytes","name":"extra","type":"bytes"}],"internalType":"struct Request[]","name":"rs","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_start","type":"uint256"},{"internalType":"uint256","name":"_end","type":"uint256"}],"name":"getRequestsByIdRange","outputs":[{"components":[{"internalType":"enum Operation","name":"op","type":"uint8"},{"internalType":"enum Status","name":"status","type":"uint8"},{"internalType":"uint128","name":"nonce","type":"uint128"},{"internalType":"bytes32","name":"srcChain","type":"bytes32"},{"internalType":"bytes","name":"srcAddress","type":"bytes"},{"internalType":"bytes32","name":"dstChain","type":"bytes32"},{"internalType":"bytes","name":"dstAddress","type":"bytes"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"fee","type":"uint256"},{"internalType":"bytes","name":"extra","type":"bytes"}],"internalType":"struct Request[]","name":"rs","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getValidDstChains","outputs":[{"internalType":"bytes32[]","name":"","type":"bytes32[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"isActiveUser","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"isQualifiedUser","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_qualifiedUser","type":"address"}],"name":"lockQualifiedUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"minter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nonce","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pendingOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"proxiableUUID","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32[]","name":"_dstChains","type":"bytes32[]"}],"name":"removeDstChains","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_qualifiedUser","type":"address"}],"name":"removeQualifiedUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"requestHashes","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_hash","type":"bytes32"}],"name":"requests","outputs":[{"internalType":"enum Operation","name":"op","type":"uint8"},{"internalType":"enum Status","name":"status","type":"uint8"},{"internalType":"uint128","name":"nonce","type":"uint128"},{"internalType":"bytes32","name":"srcChain","type":"bytes32"},{"internalType":"bytes","name":"srcAddress","type":"bytes"},{"internalType":"bytes32","name":"dstChain","type":"bytes32"},{"internalType":"bytes","name":"dstAddress","type":"bytes"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"fee","type":"uint256"},{"internalType":"bytes","name":"extra","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"to","type":"address"}],"name":"rescue","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_feeModel","type":"address"}],"name":"setFeeModel","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_feeRecipient","type":"address"}],"name":"setFeeRecipient","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_minter","type":"address"}],"name":"setMinter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"setToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_qualifiedUser","type":"address"}],"name":"unlockQualifiedUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"upgradeToAndCall","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"bytesHash","type":"bytes32"}],"name":"usedDepositTxs","outputs":[{"internalType":"bytes32","name":"requestHash","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"bytesHash","type":"bytes32"}],"name":"usedWithdrawalTxs","outputs":[{"internalType":"bytes32","name":"requestHash","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"qualifiedUser","type":"address"}],"name":"userInfo","outputs":[{"internalType":"bool","name":"locked","type":"bool"},{"internalType":"string","name":"depositAddress","type":"string"},{"internalType":"string","name":"withdrawalAddress","type":"string"}],"stateMutability":"view","type":"function"}]')}}]);