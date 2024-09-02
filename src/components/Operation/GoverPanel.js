import { Box, Card, Divider } from "@mui/material";
import { getABI } from "../../utils/FetchData";
import React from "react";
import Panel from "./Panel";
import { AddressTypo } from '../../utils/CustomUtils';
const goverABI = await getABI('FBTCGovernorModule');


const GoverPanel = ({ data }) => {

    const updateUserBurnFee = { name: 'updateUserBurnFee', params: { _config: { maxFee: '115792089237316195423570985008687907853269984665640564039457584007913129639935', minFee: 0, tiers: '[["26959946667150639794667015087019630673637144422540572481103610249215", 0]]' } } };
    const addQualifiedUser = { name: 'addQualifiedUser' };

    return (
        data?.address.map((address) => {
            return (
                <React.Fragment key={address}>
                    <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column' gap={1} p={1}>
                        <AddressTypo variant="h5" gutterBottom address={address} text={address} />
                        <Card elevation={3} sx={{ minWidth: '85vw', maxWidth: '85vw', p: 1, backgroundColor: 'lightyellow' }}>
                            <Panel address={address} func={updateUserBurnFee} abi={goverABI} text={'updateUserBurnFee (default all-zero)'}/>
                        </Card>
                        <Card elevation={3} sx={{ minWidth: '85vw', maxWidth: '85vw', p: 1, backgroundColor: 'lightyellow' }}>
                            <Panel address={address} func={addQualifiedUser} abi={goverABI} />
                        </Card>
                    </Box>
                    <Divider />
                </React.Fragment>
            )
        })
    )
}

export default GoverPanel;