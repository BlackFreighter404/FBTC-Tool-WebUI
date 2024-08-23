import React, { useState } from "react";
import WalletConnet from "./WalletConnect";
import WalletStatus from "./WalletStatus";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';

const Wallet = ({ isConnected, setIsConnected, setContext }) => {
    const [curNework, setCurNework] = useState(null);

    return (
        <AppBar position="static">
            <Toolbar>
                <Grid container spacing={1} alignItems="center" direction={'row'}>
                    <Grid item xs={4} md={6}>
                        <Typography variant="h6">
                            FBTC Tool WebUI
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Box display="flex" alignItems="center" flexDirection={"row"} gap={1}>
                            <WalletStatus isConnected={isConnected} curNework={curNework} />
                            <WalletConnet setIsConnected={setIsConnected} setCurNework={setCurNework} setContext={setContext} />
                        </Box>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Wallet;