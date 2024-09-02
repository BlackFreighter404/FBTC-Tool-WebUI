import React from "react";
import { Table, TableBody, TableRow } from "@mui/material";
import { TextTableCell } from "../../utils/CustomUtils";

const Chain = ({ data }) => {
    return (
        <Table>
            <TableBody>
                <TableRow>
                    <TextTableCell data={'Chain'}/>
                    <TextTableCell data={data?.info}/>
                </TableRow>
            </TableBody>
        </Table>
    );
}

export default Chain;