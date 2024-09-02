import React from "react";
import { Box, Card, Divider, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import { AddressTypo, TextTableCell, AddressList } from "../../utils/CustomUtils";




const Owners = ({ data }) => {
    return (
        <TableRow>
            <TextTableCell data={'Owners'} />
            <TableCell>
                <AddressList data={data} />
            </TableCell>
        </TableRow>
    );
}

const Modules = ({ data }) => {
    return (
        <TableRow>
            <TextTableCell data={'Modules'} />
            <TableCell>
                {
                    data ? (
                        data.map((item, index) => (
                            <React.Fragment key={index}>
                                <Card sx={{ padding: 1, margin: 1, backgroundColor: 'honeydew', gap: 2 }}>
                                    <AddressTypo text={item.address} address={item.address} />
                                    {
                                        item.isGover ? (
                                            <Box display={'flex'} flexDirection={'column'} gap={1} mt={1}>
                                                <AddressTypo text={`Owner: ${item.ownerString}`} address={item.ownerAddress} />
                                                <AddressTypo text={`Pending Owner: ${item.pendingOwnerString}`} address={item?.pendingOwnerAddress} />
                                                <Box marginLeft={2}>
                                                    <Typography>Qualified User Managers:</Typography>
                                                    <Box marginLeft={2}>
                                                        <AddressList data={item.qualiManagers} />
                                                    </Box>
                                                    <Typography>FBTC Block-list Managers:</Typography>
                                                    <Box marginLeft={2}>
                                                        <AddressList data={item.blockManagers} />
                                                    </Box>
                                                    <Typography>FBTC Pauser:</Typography>
                                                    <Box marginLeft={2}>
                                                        <AddressList data={item.fbtcPausers} />
                                                    </Box>
                                                    <Typography>FireBridge Pauser</Typography>
                                                    <Box marginLeft={2}>
                                                        <AddressList data={item.fbridgePausers} />
                                                    </Box>
                                                    <Typography>Cross-chain Targets Manager:</Typography>
                                                    <Box marginLeft={2}>
                                                        <AddressList data={item.targetsManagers} />
                                                    </Box>
                                                    <Typography>Cross-chain Fee Updater:</Typography>
                                                    <Box marginLeft={2}>
                                                        <AddressList data={item.feeUpdaters} />
                                                    </Box>
                                                </Box>
                                            </Box>
                                        ) : (
                                            <Typography color={'error'}> (Not Gover)</Typography>
                                        )
                                    }
                                </Card>
                                <Divider />
                            </React.Fragment>
                        ))
                    ) : (
                        <Typography>Loading...</Typography>
                    )
                }
            </TableCell>
        </TableRow>
    );
}

const Safe = ({ data }) => {
    return (
        <Table>
            <TableBody>
                <TableRow>
                    <TextTableCell data={'FireBridge Owner Safe'} />
                    <TextTableCell data={data?.ownerSafe} address={data?.ownerSafe} />
                </TableRow>
                <TableRow>
                    <TextTableCell data={'Version'} />
                    <TextTableCell data={data?.version} />
                </TableRow>
                <TableRow>
                    <TextTableCell data={'Threshold'} />
                    <TextTableCell data={data?.threshold} />
                </TableRow>
                <Owners data={data?.owners} />
                <Modules data={data?.modules} />
            </TableBody>
        </Table>
    );
}

export default Safe;