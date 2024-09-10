import { TableCell, Typography, Link, Box, Divider } from "@mui/material";
import React from "react";
import { useChainId } from "./Hooks";
import networks from './networks.json';

const BTC_EXPLORER_MAP = {
    '0x0100000000000000000000000000000000000000000000000000000000000000': 'https://mempool.space',
    '0x0110000000000000000000000000000000000000000000000000000000000000': 'https://mempool.space/testnet',
}



const AddressTypo = ({ text, address, chainId = null, ...typographyProps }) => {
    let explorerUrl = null;
    const globalChainId = useChainId();
    if (chainId == null) chainId = globalChainId;

    if (chainId in BTC_EXPLORER_MAP) {
        explorerUrl = BTC_EXPLORER_MAP[chainId];
    }
    else {
        for (let i = 0; i < networks.length; i++) {
            if (networks[i].chainId === chainId) {
                explorerUrl = networks[i].blockExplorerUrls[0];
                break;
            }
        }
    }

    return (
        <Typography component="span" {...typographyProps} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 'Medium' }} >
            <Link href={`${explorerUrl}/address/${address}`} underline="hover" color="inherit" rel="noopener" target="_blank">
                {text}
            </Link>
        </Typography>
    );
}

const AddressList = ({ data }) => {
    return (
        <React.Fragment>
            {
                data ? (
                    <Box display="flex" flexDirection="column" gap={1}>
                        {data.map((item, index) => (
                            <li key={index} >
                                <AddressTypo text={item.addressInfo} address={item.address} />
                                <Divider />
                            </li>
                        ))}
                    </Box>
                ) : (
                    <Typography>Loading...</Typography>
                )
            }
        </React.Fragment>
    );
}

const TextTableCell = ({ data, address, chainId = null, ...typographyProps }) => {
    if (data == null) data = "Loading...";
    return (
        <TableCell sx={{ minWidth: '100px' }}>
            {address != null ? (
                <AddressTypo text={data} address={address} chainId={chainId} {...typographyProps} />
            ) : (
                <Typography {...typographyProps}>{data}</Typography>
            )}
        </TableCell>
    );
}




export { TextTableCell, AddressTypo, AddressList };