import { React, useState } from 'react';
import Wallet from './components/Wallet/Wallet';
import { Context } from './Context';
import Display from './components/Display/Display';
import { Box } from '@mui/material';

function App() {
    const [isConnected, setIsConnected] = useState(false);
    const [context, setContext] = useState({});

    const setContextKV = (key, value) => {
        setContext(prevContext=>({ ...prevContext, [key]: value }));
        console.log('context update', context);
    }

    return (
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} gap={2}>
            <Wallet isConnected={isConnected} setIsConnected={setIsConnected} setContext={setContextKV} />
                <Context.Provider value={context}>
                    <Display />
                </Context.Provider>
        </Box>
    );
}

export default App;