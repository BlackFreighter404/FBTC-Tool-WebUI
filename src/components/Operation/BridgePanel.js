import { Box, Card } from "@mui/material";
import { getABI } from "../../utils/FetchData";
import React from "react";
import Panel from "./Panel";
import { AddressTypo } from '../../utils/CustomUtils';

const bridgeABI = await getABI('FireBridge');


const BridgePanel = ({ data }) => {

    const addMintRequest = { name: 'addMintRequest' };
    const addBurnRequest = { name: 'addBurnRequest' };
    const addCrosschainRequest = { name: 'addCrosschainRequest', params: { _targetChain: data?.whiteList } };

    return (
        <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column' gap={1} p={1}>
            <AddressTypo variant="h5" gutterBottom address={data?.address} text={data?.address}/>
            <Card elevation={3} sx={{ minWidth: '85vw', maxWidth: '85vw', p: 1 , backgroundColor : 'lightblue'}}>
                <Panel address={data?.address} func={addMintRequest} abi={bridgeABI} />
            </Card>
            <Card elevation={3} sx={{ minWidth: '85vw', maxWidth: '85vw', p: 1 , backgroundColor : 'lightblue'}}>
                <Panel address={data?.address} func={addBurnRequest} abi={bridgeABI} />
            </Card>
            <Card elevation={3} sx={{ minWidth: '85vw', maxWidth: '85vw', p: 1, backgroundColor : 'lightblue'}}>
                <Panel address={data?.address} func={addCrosschainRequest} abi={bridgeABI} />
            </Card>
        </Box>
    )
}

export default BridgePanel;