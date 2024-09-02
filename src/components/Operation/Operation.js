import { React } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { fetchOperationData } from '../../utils/FetchData';
import useFetchData from '../../utils/Hooks';
import BridgePanel from './BridgePanel';
import GoverPanel from './GoverPanel';

const Operation = () => {
    const data = useFetchData(fetchOperationData);
    console.log(data);
    return (
        <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column' gap={1}>
            <Paper elevation={3} sx={{ minWidth: '90vw', maxWidth: '90vw', minHeight: '30vh' }}>
                <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                    <Box mt={1}>
                        <Typography variant="h5">Bridge</Typography>
                    </Box>
                    {data?.bridge && <BridgePanel data={data?.bridge} />}
                </Box>
            </Paper>
            <Paper elevation={3} sx={{ minWidth: '90vw', maxWidth: '90vw', minHeight: '30vh' }}>
                <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                    <Box mt={1}>
                        <Typography variant="h5">Gover</Typography>
                    </Box>
                    {data?.gover && <GoverPanel data={data?.gover} />}
                </Box>
            </Paper>
        </Box>
    );
}

export default Operation;