import { TableCell, Typography, Link } from "@mui/material";
import React, { useEffect } from "react";
import { useChainId } from "wagmi";
import networks from '../networks.json';

const AddressTypo = ({ text, address, ...typographyProps }) => {
    const [explorerUrl, setExplorerUrl] = React.useState(null);
    const chainId = useChainId();
    useEffect(() => {
        const fetchExplorerUrl = async () => {
            for (let i = 0; i < networks.length; i++) {
                if (networks[i].chainId === chainId) {
                    setExplorerUrl(networks[i].blockExplorerUrls[0]);
                    return;
                }
            }
            console.log('ChainId not found', chainId);
        };
        fetchExplorerUrl();
    }, [chainId]);
    return (
        <Typography component="span" {...typographyProps}>
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
        </React.Fragment>
    );
}

const TextTableCell = ({ data, address, ...typographyProps }) => {
    if (data == null) data = "Loading...";
    return (
        <TableCell>
            {address != null ? (
                <AddressTypo text={data} address={address}  {...typographyProps}  />
            ) : (
                <Typography {...typographyProps}>{data}</Typography>
            )}
        </TableCell>
    );
}




export { TextTableCell, AddressTypo, AddressList };