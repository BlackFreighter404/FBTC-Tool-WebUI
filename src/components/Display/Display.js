import { React, useState, useEffect, useContext, useMemo } from 'react';
import { Box, Paper } from '@mui/material';
import Chain from './Chain';
import Bridge from './Bridge/Bridge';
import Fbtc from './Fbtc';
import Minter from './Minter';
import Fee from './Fee';
import Safe from './Safe/Safe';
import fetchData from './utils/FetchData';
import { useAccount, usePublicClient } from 'wagmi';
import { customNetworkContext } from '../../App';
import { createPublicClient, http } from 'viem';

const Display = () => {
    const [data, setData] = useState({});

    const setDataKV = (key, value) => {
        setData((prev) => {
            return { ...prev, [key]: value };
        });
    }

    const account = useAccount();
    const pc = usePublicClient();
    const obj = useContext(customNetworkContext);

    const publicClient = useMemo(() => {
        if (account.status !== 'connected') {
            if (obj.customNetwork !== null) {
                return createPublicClient({ chain: obj.customNetwork, transport: http() });
            }
            return undefined;
        }
        return pc;
    }, [account.status, obj.customNetwork, pc]);


    useEffect(() => {
        if (publicClient !== undefined) {
            const fetchDataAsync = async () => {
                setData({});
                console.log('fetching data');
                console.log(publicClient);
                await fetchData(setDataKV, publicClient);
            }
            fetchDataAsync();
        }
    }, [publicClient]);


    return (
        <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column' gap={2}>

            <Paper elevation={3} sx={{ minWidth: '90vw', maxWidth: '90vw' }}>
                <Chain data={data?.chain} />
            </Paper>
            <Paper elevation={3} sx={{ minWidth: '90vw', maxWidth: '90vw' }}>
                <Bridge data={data?.bridge} />
            </Paper>
            <Paper elevation={3} sx={{ minWidth: '90vw', maxWidth: '90vw' }}>
                <Fbtc data={data?.fbtc} />
            </Paper>
            <Paper elevation={3} sx={{ minWidth: '90vw', maxWidth: '90vw' }}>
                <Minter data={data?.minter} />
            </Paper>
            <Paper elevation={3} sx={{ minWidth: '90vw', maxWidth: '90vw' }}>
                <Fee data={data?.fee} />
            </Paper>
            <Paper elevation={3} sx={{ minWidth: '90vw', maxWidth: '90vw' }}>
                <Safe data={data?.safe} />
            </Paper>
        </Box>

    );
}

export default Display;