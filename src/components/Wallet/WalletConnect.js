import React, { useState } from "react";
import { ethers } from "ethers";
import networks from "./networks.json";
import { FormControl, Select, Button, MenuItem, InputLabel, Box } from "@mui/material";


const WalletConnect = ({ setIsConnected, setCurNework, setContext }) => {
    const [selectedNetwork, setSelectedNetwork] = useState(null);

    const handleConnect = async () => {
        if (window.ethereum) {
            try {
                if (!selectedNetwork) {
                    alert("Please select a network.");
                    return;
                }
                setCurNework(selectedNetwork);
                setIsConnected(false);
                const chainId = ethers.toQuantity(selectedNetwork.chainId);
                console.log("Switching to chain", chainId);
                const chainExists = await window.ethereum.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: chainId }]
                }).then(() => true).catch(() => false);
                if (!chainExists) {
                    console.log("Adding chain");
                    console.log(selectedNetwork);
                    await window.ethereum.request({
                        method: "wallet_addEthereumChain",
                        params: [{
                            chainId: chainId,
                            chainName: selectedNetwork.chainName,
                            nativeCurrency: {
                                symbol: selectedNetwork.nativeCurrency.symbol,
                                decimals: selectedNetwork.nativeCurrency.decimals
                            },
                            rpcUrls: selectedNetwork.rpcUrls,
                            blockExplorerUrls:selectedNetwork.blockExplorerUrls
                        }]
                    })
                    await window.ethereum.request({
                        method: "wallet_switchEthereumChain",
                        params: [{ chainId: chainId }]
                    });
                }
                // const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                setIsConnected(true);
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner(0);

                setContext('network', selectedNetwork);
                setContext('signer', signer);
                
                console.log("Connected to", selectedNetwork.chainName);
                console.log("Signer", signer);
                console.log("Explorer", selectedNetwork.blockExplorerUrls[0]);
                console.log("Bridge", selectedNetwork.bridge);
            }
            catch (error) {
                console.error(error);
                setIsConnected(false);
            }
        } else {
            alert("Please install MetaMask.");
        }
    };

    return (
        <Box display="flex" alignItems="center" flexDirection={"row"} gap={1}>
            <Box minWidth={200}>
                <FormControl fullWidth={true} size="small" variant="filled" color="info">
                    <InputLabel>Nework</InputLabel>
                    <Select onChange={(e) => setSelectedNetwork(networks[e.target.value])} label="Network" defaultValue={''}>
                        {networks.map((network, index) => (
                            <MenuItem key={index} value={index}>
                                {network.chainName}
                            </MenuItem>
                        ))}
                    </Select>
                    {/* <FormHelperText>Select your network</FormHelperText> */}
                </FormControl>
            </Box>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleConnect}
                    disabled={!selectedNetwork}
                >
                    Connect
                </Button>
        </Box>
    );


};

export default WalletConnect;