import React from "react";
import { Chip, Box } from "@mui/material";

const WalletStatus = ({ isConnected, curNework }) => {
    return (
        <Box minWidth={200}>
            {curNework ? (
                isConnected ? (
                    <Chip
                        label={`${curNework.chainName} Connected`}
                        color="success"
                        sx={{ fontWeight: 'bold' }}
                    />
                ) : (
                    <Chip
                        label={`${curNework.chainName} Not Connected`}
                        color="error"
                        sx={{ fontWeight: 'bold', width: '100%'}}
                    />
                )
            ) : (
                <Chip
                label={'Select Your Network ...'}
                color="info"
                sx={{ fontWeight: 'bold' , width: '100%'}}
            />
            )}
        </Box>
    );
};

export default WalletStatus;