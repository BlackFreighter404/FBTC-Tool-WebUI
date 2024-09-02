import React from "react";
import { Table, TableBody, TableRow } from "@mui/material";
import { TextTableCell } from "../../utils/CustomUtils";

const Fbtc = ({ data }) => {
    return (
        <Table>
            <TableBody>
                <TableRow>
                    <TextTableCell data={'FBTC'}/>
                    <TextTableCell data={data?.address} address={data?.address}/>
                </TableRow>
                <TableRow>
                    <TextTableCell data={'Bridge'}/>
                    <TextTableCell data={data?.bridge} address={data?.bridge}/>
                </TableRow>
                <TableRow>
                    <TextTableCell data={'Owner'}/>
                    <TextTableCell data={data?.ownerString} address={data?.ownerAddress}/>
                </TableRow>
                <TableRow>
                    <TextTableCell data={'Pending Owner'}/>
                    <TextTableCell data={data?.pendingOwnerString} address={data?.pendingOwnerAddress}/>
                </TableRow>
                <TableRow>
                    <TextTableCell data={'Paused'}/>
                    <TextTableCell data={data?.paused}/>
                </TableRow>
                <TableRow>
                    <TextTableCell data={'Decimals'}/>
                    <TextTableCell data={data?.decimals}/>
                </TableRow>
                <TableRow>
                    <TextTableCell data={'Total Supply'}/>
                    <TextTableCell data={data?.totalSupply}/>
                </TableRow>
            </TableBody>
        </Table>
    );
}

export default Fbtc;