import { Card, Table, TableBody, TableRow } from "@mui/material";
import { TextTableCell } from "../../utils/CustomUtils";

const Req = ({ data }) => {
    return (
        <Card sx={{ backgroundColor: 'seashell', minWidth: '80vw', maxWidth: '80vw', }}>
            <Table>
                <TableBody>
                    <TableRow>
                        <TextTableCell data={'Nonce'} />
                        <TextTableCell data={data?.nonce} />
                    </TableRow>
                    <TableRow>
                        <TextTableCell data={'Total Status'} />
                        <TextTableCell data={data?.totalStatus} />
                    </TableRow>
                    <TableRow>
                        <TextTableCell data={'Hash'} />
                        <TextTableCell data={data?.hash} />
                    </TableRow>
                    <TableRow>
                        <TextTableCell data={'OP'} />
                        <TextTableCell data={data?.op} />
                    </TableRow>
                    <TableRow>
                        <TextTableCell data={'Status'} />
                        <TextTableCell data={data?.status} />
                    </TableRow>
                    <TableRow>
                        <TextTableCell data={'srcChain'} />
                        <TextTableCell data={data?.srcChain} />
                    </TableRow>
                    <TableRow>
                        <TextTableCell data={'srcAddress'} />
                        <TextTableCell data={data?.srcAddress} address={data?.srcAddress} chainId={data?.src_chain_id}/>
                    </TableRow>
                    <TableRow>
                        <TextTableCell data={'dstChain'} />
                        <TextTableCell data={data?.dstChain} />
                    </TableRow>
                    <TableRow>
                        <TextTableCell data={'dstAddress'} />
                        <TextTableCell data={data?.dstAddress} address={data?.dstAddress} chainId={data?.dst_chain_id}/>
                    </TableRow>
                    <TableRow>
                        <TextTableCell data={'Amount'} />
                        <TextTableCell data={data?.amount} />
                    </TableRow>
                    <TableRow>
                        <TextTableCell data={'fee'} />
                        <TextTableCell data={data?.fee} />
                    </TableRow>
                    <TableRow>
                        <TextTableCell data={'extra'} />
                        <TextTableCell data={data?.extra} />
                    </TableRow>
                </TableBody>
            </Table>
        </Card>
    );
}

export default Req;