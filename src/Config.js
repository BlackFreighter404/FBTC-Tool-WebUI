import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, sepolia, arbitrum, bsc, base, mantle, mantleSepoliaTestnet, bob } from 'wagmi/chains';

const config = getDefaultConfig({
    appName: 'FBTC-Tool',
    projectId: '366ed824723a0776affcd32ceab77ad6',
    chains: [mainnet, sepolia, arbitrum, bsc, base, mantle, mantleSepoliaTestnet, bob],
});

export default config;