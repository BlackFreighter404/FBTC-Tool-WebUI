import { React } from 'react';
import { Box, Paper } from '@mui/material';
import Chain from './Chain';
import Bridge from './Bridge';
import Fbtc from './Fbtc';
import Minter from './Minter';
import Fee from './Fee';
import Safe from './Safe';
import {fetchDisplayData} from '../../utils/FetchData';
import useFetchData from '../../utils/Hooks';

const Display = () => {
    const data = useFetchData(fetchDisplayData);

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