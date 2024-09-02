import { Autocomplete, TextField, Box, Button, Typography } from "@mui/material";
import { useWalletClient, useAccount } from "wagmi";
import { useState } from "react";
import { writeContract } from "viem/actions";
import { getAddresses } from "viem/actions";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { JSONParse } from "json-with-bigint";

function objWithoutArray(obj) {
    return Object.keys(obj).reduce((acc, key) => {
        if (Array.isArray(obj[key])) {
            return acc;
        }
        acc[key] = obj[key];
        return acc;
    }, {});
}

function getNestedValue(obj, key) {
    const keys = key.split('.');
    return keys.reduce((o, k) => o ? o[k] : undefined, obj);
}

function setNestedProperty(obj, key, value) {
    const keys = key.split('.');
    const lastKey = keys.pop();
    keys.reduce((o, k) => o[k] || (o[k] = {}), obj)[lastKey] = value;
    return obj;
}

function convertToArgs(abiInputs, inputs) {
    return abiInputs.map((abiInput) => {
        if (abiInput.type === 'tuple') {
            return convertToArgs(abiInput.components, inputs[abiInput.name]);
        } else if (abiInput.type.includes('[]')) {
            return JSONParse(inputs[abiInput.name]);
        } else {
            if (abiInput.name === '_amount') {
                return inputs[abiInput.name] * 10 ** 8;
            }
            return inputs[abiInput.name];
        }
    });
}



const Panel = ({ address, func, abi, text=null }) => {
    const account = useAccount();
    const status = account?.status;
    const funABI = abi.find((item) => item.name === func.name);

    const funcParams = func?.params ?? {};
    const funcParamsWithoutArray = objWithoutArray(funcParams);
    const [input, setInput] = useState(funcParamsWithoutArray);
    const [error, setError] = useState(null);
    const { data: walletClient } = useWalletClient();

    const handleInput = (event, name) => {
        const newInput = setNestedProperty({ ...input }, name, event.target.value);
        setInput(newInput);
    }


    const IsConnectButton = (status) => {
        const { openConnectModal } = useConnectModal();
        if (status !== 'connected') {
            return (
                <Button onClick={openConnectModal}>Connect Wallet</Button>
            );
        } else {
            return (
                <Button onClick={handleComfirm}>Confirm</Button>
            );
        }
    }


    const handleComfirm = async () => {
        try {
            const args = convertToArgs(funABI.inputs, input);
            console.log('args', args);
            const [account] = await getAddresses(walletClient);
            const { res } = await writeContract(walletClient, {
                address: address,
                abi: [funABI],
                functionName: func.name,
                args: args,
                account: account,
            })
            return res;
        } catch (e) {
            setError(e.message);
        }
    }


    const renderInputs = (abiInputs, parentKey = '') => {
        return abiInputs.map((abiInput) => {
            const key = parentKey ? `${parentKey}.${abiInput.name}` : abiInput.name;
            const defaultValue = getNestedValue(funcParams, key);
            if (abiInput.type === 'tuple') {
                return (
                    <Box key={key} display={'flex'} flexDirection={'column'} gap={1} mt={1}>
                        <Typography variant="subtitle1">{abiInput.name} ({abiInput.type})</Typography>
                        {renderInputs(abiInput.components, key)}
                    </Box>
                );
            } else {
                if (Array.isArray(defaultValue)) {
                    console.log('defaultValue', defaultValue);
                    return (<Autocomplete
                        key={key}
                        margin="dense"
                        size="small"
                        options={defaultValue}
                        getOptionLabel={(option) => option.key}
                        onChange={(event, option) => handleInput({ target: { value: option?.value } }, key)}
                        renderInput={(params) => <TextField {...params} label={`${abiInput.name} (${abiInput.type})`} />}
                    />);
                } else {
                    return (
                        <TextField
                            key={key}
                            label={abiInput.name === '_amount' ? `BTC` : `${abiInput.name} (${abiInput.type})`}
                            fullWidth
                            margin="dense"
                            size="small"
                            onChange={(event) => handleInput(event, key)}
                            defaultValue={defaultValue}
                        />
                    );
                }
            }
        });
    }
    return (
        <Box display={'flex'} flexDirection={'column'} p={2} border={1} borderRadius={2} borderColor="grey.300" sx={{ backgroundColor: 'white' }}>
            <Typography variant="subtitle2" gutterBottom>{func.name}</Typography>
            {text && <Typography variant="caption" gutterBottom sx={{textTransform : 'none'}}>{text}</Typography>}
            {funABI && renderInputs(funABI.inputs)}
            {IsConnectButton(status)}
            {error && <Typography variant="caption" color="error">{error}</Typography>}
        </Box>
    )
}

export default Panel;