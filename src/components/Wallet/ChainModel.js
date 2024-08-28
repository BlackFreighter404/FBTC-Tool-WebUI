import { Select, FormControl, MenuItem, Box, InputLabel } from "@mui/material";
import config from "../../Config";
import { customNetworkContext } from "../../App";
import { useContext, useEffect, useState } from "react";

const ChainModel = () => {
    const { setCustomNetwork } = useContext(customNetworkContext);
    const [selectedChain, setSelectedChain] = useState('');

    useEffect(() => {
        if (selectedChain === '') {
            setCustomNetwork(null);
            return;
        } else {
            const chain = config.chains.find((c) => c.name === selectedChain);
            if (chain) {
                setCustomNetwork(chain);
            }
        }
    }, [selectedChain, setCustomNetwork]);

    return (
        <Box sx={{ minWidth: 200 }}>
            <FormControl fullWidth size="small">
                <InputLabel id="chain" variant="filled">Chain</InputLabel>
                <Select
                    label="Chain"
                    defaultValue=''
                    variant="filled"
                    value={selectedChain}
                    sx={{ backgroundColor: 'white', borderRadius: 1 }}
                    onChange={(e) => setSelectedChain(e.target.value)}
                >
                    {config.chains.map((chain) => (
                        <MenuItem value={chain.name} key={chain.name}>{chain.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );

}

export default ChainModel;
