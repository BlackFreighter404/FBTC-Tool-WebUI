import { Dialog, DialogActions, DialogContent, TextField, Box, Button, Typography } from "@mui/material";
import { useWalletClient } from "wagmi";
import { useState } from "react";
import { writeContract } from "viem/actions";
import { getAddresses } from "viem/actions";

const FunctionDialog = ({ address, func, abi, open, handleClose }) => {
    const funABI = abi.find((item) => item.name === func.name);
    const funcParams = func?.params ?? {};
    const [input, setInput] = useState(funcParams);
    const [error, setError] = useState(null);
    const { data: walletClient } = useWalletClient();
    const handleInput = (event, name) => {
        const newInput = setNestedProperty({ ...input }, name, event.target.value);
        setInput(newInput);
    }

    const convertToArgs = (inputs, obj) => {
        return inputs.map((input) => {
            if (input.type === 'tuple') {
                return convertToArgs(input.components, obj[input.name]);
            } else if (input.type.includes('[]')) {
                return JSON.parse(obj[input.name]);
            } else {
                return obj[input.name];
            }
        });
    }

    const handleDialogConfirm = async (walletClient, address, func, abi, input) => {
        console.log(input);
        const args = convertToArgs(funABI.inputs, input);
        const [account] = await getAddresses(walletClient);
        console.log([abi], func.name, args);
        try {
            const { res } = await writeContract(walletClient, {
                address: address,
                abi: [abi],
                functionName: func.name,
                args: args,
                account: account,
            })
            return res;
        } catch (e) {
            // throw e;
            setError(e.message);
        }
    }

    const getNestedValue = (obj, key) => {
        const keys = key.split('.');
        return keys.reduce((o, k) => o ? o[k] : undefined, obj);
    }

    function setNestedProperty(obj, key, value) {
        const keys = key.split('.');
        const lastKey = keys.pop();
        keys.reduce((o, k) => o[k] || (o[k] = {}), obj)[lastKey] = value;
        return obj;
    }


    const renderInputs = (inputs, parentKey = '') => {
        return inputs.map((input) => {
            const key = parentKey ? `${parentKey}.${input.name}` : input.name;
            const value = getNestedValue(funcParams, key);
            if (input.type === 'tuple') {
                return (
                    <Box key={key} display={'flex'} flexDirection={'column'} gap={2} mt={1}>
                        <Typography variant="subtitle1">{input.name} ({input.type})</Typography>
                        {renderInputs(input.components, key)}
                    </Box>
                );
            } else {
                return (
                    <TextField
                        key={key}
                        label={`${input.name} (${input.type})`}
                        fullWidth
                        onChange={(event) => handleInput(event, key)}
                        defaultValue={value}
                    />
                );
            }
        });
    }
    return (
        <Dialog maxWidth="xs" fullWidth open={open} onClose={handleClose}>
            <DialogContent>
                <Box display={'flex'} flexDirection={'column'} gap={2} mt={1}>
                    {renderInputs(funABI.inputs)}
                    {error && <Typography variant="caption" color="error">{error}</Typography>}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleDialogConfirm(walletClient, address, func, funABI, input)} aria-hidden={false}>Confirm</Button>
            </DialogActions>
        </Dialog>
    )
}

export default FunctionDialog;