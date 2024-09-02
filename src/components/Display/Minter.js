import React from "react";
import { Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import { AddressTypo, TextTableCell } from "../../utils/CustomUtils";


const Role = ({ data, text }) => {
    return (
        <TableRow>
            <TextTableCell data={text} />
            <TableCell>
                {
                    data ? (
                        data.map((item, index) => (
                            <React.Fragment key={index}>
                                <AddressTypo text={item.addressInfo} address={item.address} />
                                <br />
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


const Minter = ({ data }) => {
    return (
        <Table>
            <TableBody>
                <TableRow>
                    <TextTableCell data={'FBTCMinter'} />
                    <TextTableCell data={data?.fbtcMinter} address={data?.fbtcMinter}/>
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
                    <TextTableCell data={'Bridge'} />
                    <TextTableCell data={data?.bridge} address={data?.bridge} />
                </TableRow>
                <Role data={data?.minting} text={'Minting'} />
                <Role data={data?.burning} text={'Burning'} />
                <Role data={data?.crossing} text={'Cross-chaining'} />
            </TableBody>
        </Table>
    );
}

export default Minter;