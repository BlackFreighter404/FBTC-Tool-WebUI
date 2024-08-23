import { TableCell, Typography, Link } from "@mui/material";
import React, { useContext } from "react";
import { Context } from "../../Context";


const AddressTypo = ({ text, address, ...typographyProps }) => {
    const explorerUrl = useContext(Context).network.blockExplorerUrls[0];
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
                <AddressTypo text={data} address={address} typographyProps={typographyProps} />
            ) : (
                <Typography {...typographyProps}>{data}</Typography>
            )}
        </TableCell>
    );
}




export { TextTableCell, AddressTypo, AddressList };