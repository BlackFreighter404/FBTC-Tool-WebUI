import { React, useContext, useState, useEffect } from 'react';
import { Box, Paper } from '@mui/material';
import { Context } from '../../Context';
import Chain from './Chain';
import Bridge from './Bridge';
import Fbtc from './Fbtc';
import Minter from './Minter';
import Fee from './Fee';
import Safe from './Safe';
import fetchData from './FetchData';


const Display = () => {
    const [data, setData] = useState({});

    const setDataKV = (key, value) => {
        setData((prev) => {
            return { ...prev, [key]: value };
        });
    }

    const context = useContext(Context);
    
    useEffect(() => {
        console.log('context', context);
        if (context?.signer && context?.network) {
            const fetchDataAsync = async () => {
                console.log('fetching data');
                await fetchData(setDataKV, context);
            }
            fetchDataAsync();
        }
    }, [context]);


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