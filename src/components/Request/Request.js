import { Box, Paper, Button, TextField, Divider } from '@mui/material';
import { fetchRequestData } from '../../utils/FetchData';
import { createPublicClient, http } from 'viem';
import React, { useState, useContext, useMemo, useEffect } from 'react';
import { useAccount, usePublicClient } from 'wagmi';
import { customNetworkContext } from '../../App';
import Req from './Req';

const Request = () => {
    const [inputNum, setInputNum] = useState(10);
    const [queryNum, setQueryNum] = useState(0);
    const [data, setData] = useState({});

    const account = useAccount();
    const pc = usePublicClient();
    const { customNetwork } = useContext(customNetworkContext);

    const publicClient = useMemo(() => {
        if (account.status !== 'connected') {
            if (customNetwork !== null) {
                return createPublicClient({ chain: customNetwork, transport: http() });
            }
            return undefined;
        }
        return pc;
    }, [account.status, customNetwork, pc]);


    const handleQuery = () => {
        setQueryNum(inputNum);
    }

    useEffect(() => {
        if (queryNum > 0 && publicClient !== undefined) {
            const fetchDataAsync = async () => {
                setData({});
                console.log('fetching data');
                const fetchData = await fetchRequestData(() => { }, publicClient, queryNum);
                console.log('data', fetchData);
                setData(fetchData);
            }
            fetchDataAsync();
        }
    }, [queryNum, publicClient]);



    return (
        <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column' gap={1}>
            <Paper elevation={3} sx={{ minWidth: '90vw', maxWidth: '90vw', }}>
                <Box display='flex' justifyContent='center' alignItems='center' flexDirection='row' gap={1} p={2}>
                    <TextField
                        label="Input Number"
                        type="number"
                        value={inputNum}
                        size='small'
                        fullWidth
                        inputProps={{ min: 1, step: 0 }}
                        onChange={(event) => setInputNum(event.target.value)}
                    />
                    <Button variant="contained" color="primary" onClick={handleQuery}>Query</Button>
                </Box>
            </Paper>
            {Array.isArray(data?.reqs) && <Paper elevation={3} sx={{ minWidth: '90vw', maxWidth: '90vw', }}>
                <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column' gap={1} p={2}>
                    {data.reqs.map((req, index) => {
                        return (
                            <React.Fragment key={index}>
                                <Req data={req} />
                                <Divider />
                            </React.Fragment>
                        )
                    })}
                </Box>
            </Paper>}
        </Box>
    )

}

export default Request;