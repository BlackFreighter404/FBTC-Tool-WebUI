import React from "react";
import { Box, Card, Divider, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import { TextTableCell, AddressTypo } from "./CustomUtils";


const FeeTiers = ({ data, type }) => {
    return (
        <TableRow>
            <TextTableCell data={type} />
            <TableCell>
                {
                    data ? (
                        data.map((item, index) => (
                            <React.Fragment key={index}>
                                <Card sx={{ padding: 1, margin: 1, backgroundColor: 'lightyellow' }}>
                                    {item.name === 'Default' ? <Typography>{item.name}:</Typography> : <AddressTypo text={item.name} address={item.name} />}
                                    <Box display={'flex'} flexDirection={'column'} marginLeft={2}>
                                        <Typography>Maximun: {item.maxFee ?? 'Loading...'}</Typography>
                                        <Typography>Minimum: {item.minFee ?? 'Loading...'}</Typography>
                                        <Typography>Fee Rate Tiers:</Typography>
                                        <Box display={'flex'} flexDirection={'column'} marginLeft={2}>
                                            {
                                                item.tiers ? (
                                                    item.tiers.map((tier, index) => (
                                                        <React.Fragment key={index}>
                                                            <Typography>{tier ?? 'Loading...'}:</Typography>
                                                        </React.Fragment>
                                                    ))
                                                ) : (
                                                    <Typography>Loading...</Typography>
                                                )
                                            }

                                        </Box>
                                    </Box>
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






const Fee = ({ data }) => {
    return (
        <Table>
            <TableBody>
                <TableRow>
                    <TextTableCell data={'FeeModel'} />
                    <TextTableCell data={data?.feeModel} address={data?.feeModel} />
                </TableRow>
                <TableRow>
                    <TextTableCell data={'Owner'} />
                    <TextTableCell data={data?.ownerString} address={data?.ownerAddress} />
                </TableRow>
                <TableRow>
                    <TextTableCell data={'Pending Owner'} />
                    <TextTableCell data={data?.pendingOwnerString} address={data?.pendingOwnerAddress} />
                </TableRow>
                <FeeTiers data={data?.mint} type={'Mint'} />
                <FeeTiers data={data?.burn} type={'Burn'} />
                <FeeTiers data={data?.cross} type={'Cross'} />
            </TableBody>
        </Table>
    );
}

export default Fee;