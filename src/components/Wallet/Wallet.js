import React from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import ChainModel from "./ChainModel";
import { useAccount } from "wagmi";

const Wallet = () => {
    const account = useAccount();
    return (
        <AppBar position="static">
            <Toolbar>
                <Box display="flex" flexDirection="row" justifyContent="space-between" width="100%" alignItems="center">
                    <Box maxWidth='20vw' sx={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    <Typography variant="h6" > FBTC Tool WebUI </Typography>
                    </Box>
                    <Box display="flex" flexDirection="row" gap={2} justifyContent='center' alignContent={'center'}>
                        {account.status !== 'connected' && <ChainModel />}
                        <Box minWidth={100} mt={0.5}>
                            <ConnectButton/>
                        </Box>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Wallet;