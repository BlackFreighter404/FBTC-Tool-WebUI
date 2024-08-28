import Wallet from './components/Wallet/Wallet';
import { Box } from '@mui/material';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import config from './Config';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import '@rainbow-me/rainbowkit/styles.css';
import Display from './components/Display/Display';
import { createContext, useState } from 'react';

const customNetworkContext = createContext();

function App() {
    const queryClient = new QueryClient();
    const [customNetwork, setCustomNetwork] = useState(null);

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider initialChain={customNetwork ?? 1}>
                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} gap={2}>
                        <customNetworkContext.Provider value={{ customNetwork, setCustomNetwork }}>
                            <Wallet />
                            <Display />
                        </customNetworkContext.Provider>
                    </Box>
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}

export default App;
export { customNetworkContext };