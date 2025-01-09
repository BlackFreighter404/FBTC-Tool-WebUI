import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, sepolia, arbitrum, bsc, base, mantle, mantleSepoliaTestnet, bob } from 'wagmi/chains';

import { defineChain } from 'viem';

const config = getDefaultConfig({
    appName: 'FBTC-Tool',
    projectId: '366ed824723a0776affcd32ceab77ad6',
    chains: [mainnet, sepolia, arbitrum, bsc, base, mantle, mantleSepoliaTestnet, bob, defineChain({
        id: 146,
        name: 'Sonic',
        nativeCurrency: {
          decimals: 18,
          name: 'Sonic',
          symbol: 'S',
        },
        rpcUrls: {
          default: { http: ['https://rpc.soniclabs.com'] },
        },
        blockExplorers: {
          default: {
            name: 'Sonic Explorer',
            url: 'https://sonicscan.org/',
          },
        },
        contracts: {
          multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 60,
          },
        },
        testnet: false,
      })],
});

export default config;