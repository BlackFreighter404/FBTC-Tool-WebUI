import { Button, ButtonGroup } from "@mui/material";
import { useAccount } from "wagmi"
import { getABI } from "../utils/FetchData";
import React, { useState } from "react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import FunctionDialog from "../utils/FunctionDialog";

const GoverABI = await getABI('FBTCGovernorModule');

const SafeButton = ({ address }) => {
    const account = useAccount();
    const [func, setFunc] = useState({});
    const [dialogOpen, setDialogOpen] = useState(false);
    const { openConnectModal } = useConnectModal();

    const handleDialogClose = () => {
        setDialogOpen(false);
    }


    const handleClick = (func) => {
        setFunc(func);
        setDialogOpen(true);
    }

    if (account.status !== 'connected') {
        return (
            <ButtonGroup>
                <Button onClick={openConnectModal}>Connect Wallet</Button>
            </ButtonGroup>
        );
    } else {

        return (
            <React.Fragment>
                <ButtonGroup disabled={!account}>
                    <Button onClick={() => handleClick({ name: 'updateUserBurnFee', params: { _config: { maxFee: 4, minFee: 0 } } })}>updateUserBurnFee</Button>
                    <Button onClick={() => handleClick({ name: 'addQualifiedUser' })}>addQualifiedUser</Button>
                </ButtonGroup>
                {dialogOpen && <FunctionDialog address={address} func={func} abi={GoverABI} open={dialogOpen} handleClose={handleDialogClose} />}
            </React.Fragment>
        );
    }
}

export default SafeButton;