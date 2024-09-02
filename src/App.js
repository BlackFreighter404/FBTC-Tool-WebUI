import Wallet from './components/Wallet/Wallet';
import { Box, Tab, Tabs, Paper } from '@mui/material';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import config from './Config';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import '@rainbow-me/rainbowkit/styles.css';
import { createContext, useState } from 'react';
import Router from './Router';
import { Link, useLocation } from 'react-router-dom';

const customNetworkContext = createContext();

function App() {
    const queryClient = new QueryClient();
    const [customNetwork, setCustomNetwork] = useState(null);
    const location = useLocation();
    const getTabValue = () => {
        switch (location.pathname) {
            case '/display':
                return 0;
            case '/operation':
                return 1;
            case '/request':
                return 2;
            default:
                return 0;
        }
    };



    return (
        <customNetworkContext.Provider value={{ customNetwork, setCustomNetwork }}>
            <WagmiProvider config={config}>
                <QueryClientProvider client={queryClient}>
                    <RainbowKitProvider initialChain={customNetwork ?? 1}>
                        <Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'} flexDirection={'column'} gap={2} minHeight={'100vh'}>
                            <Wallet />
                            <Paper elevation={3} sx={{ minWidth: '90vw', maxWidth: '90vw' }}>
                                <Tabs value={getTabValue()} centered>
                                    <Tab label={'Display'} value={0} component={Link} to={'/display'} />
                                    <Tab label={'Operation'} value={1} component={Link} to={'/operation'} />
                                    <Tab label={'Request'} value={2} component={Link} to={'/request'} />
                                </Tabs>
                            </Paper>
                            <Router />
                        </Box>
                    </RainbowKitProvider>
                </QueryClientProvider>
            </WagmiProvider>
        </customNetworkContext.Provider>
    );
}

export default App;
export { customNetworkContext };