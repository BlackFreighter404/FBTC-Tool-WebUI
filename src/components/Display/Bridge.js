import React from "react";
import { Table, TableRow, TableBody, Typography, TableCell, Divider, Box, Card } from "@mui/material";
import { AddressTypo, TextTableCell } from "./CustomUtils";

const WhiteList = ({ data }) => {
    return (
        <TableRow>
            <TextTableCell data={"Cross-chain white list"} />
            <TableCell>
                {
                    data ? (
                        data.map((item, index) => (
                            <React.Fragment key={index}>
                                <Typography>{item}</Typography>
                            </React.Fragment>
                        ))
                    ) : (
                        <Typography>Loading...</Typography>
                    )
                }
            </TableCell>
        </TableRow>
    )
}

const QualifiedUsers = ({ data }) => {
    return (
        <TableRow>
            <TextTableCell data={`Qualified Users(${data ? data.length : 0})`} />
            <TableCell>
                {
                    data ? (
                        data.map((item, index) => (
                            <React.Fragment key={index}>
                                <Card sx={{ padding: 1, margin: 1, backgroundColor: 'lightblue' }}>
                                    <Box display={'flex'} flexDirection={'column'}>
                                        <AddressTypo text={`EVM Address: ${item.evmAddressString}`} address={item.evmAddress} />
                                        <Typography>Locked:{item.lock}</Typography>
                                        <Typography>BTC Deposit Address:{item.btcDeposit}</Typography>
                                        <Typography>BTC Withdraw Address:{item.btcWithdraw}</Typography>
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
    )
}

const Bridge = ({ data }) => {
    return (
        <Table>
            <TableBody>
                <TableRow>
                    <TextTableCell data={'FireBridge'} />
                    <TextTableCell data={data?.bridge} address={data?.bridge} />
                </TableRow>
                <TableRow>
                    <TextTableCell data={'Owner'} />
                    <TextTableCell data={data?.ownerString} address={data?.ownerAddress} />
                </TableRow>
                <TableRow>
                    <TextTableCell data={'Pending Owner'} />
                    <TextTableCell data={data?.pendingOwnerString} address={data?.pendingOwnerAddress} />
                </TableRow>
                <TableRow>
                    <TextTableCell data={'Paused'} />
                    <TextTableCell data={data?.paused} />
                </TableRow>
                <TableRow>
                    <TextTableCell data={'FBTC'} />
                    <TextTableCell data={data?.fbtc} address={data?.fbtc} />
                </TableRow>
                <TableRow>
                    <TextTableCell data={'Minter'} />
                    <TextTableCell data={data?.minter} address={data?.minter} />
                </TableRow>
                <TableRow>
                    <TextTableCell data={'Fee Model'} />
                    <TextTableCell data={data?.feeModel} address={data?.feeModel} />
                </TableRow>
                <TableRow>
                    <TextTableCell data={'Fee Recipient'} />
                    <TextTableCell data={data?.feeRecipientString} address={data?.feeRecipient} />
                </TableRow>
                <TableRow>
                    <TextTableCell data={'Main Chain'} />
                    <TextTableCell data={data?.mainChain} />
                </TableRow>
                <TableRow>
                    <TextTableCell data={'Current Chain'} />
                    <TextTableCell data={data?.chain} />
                </TableRow>
                <WhiteList data={data?.whiteList} />
                <QualifiedUsers data={data?.qualifiedUsers} />
            </TableBody>
        </Table>
    );
}

export default Bridge;