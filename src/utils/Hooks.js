import { useState, useEffect, useContext, useMemo } from 'react';
import { useAccount, usePublicClient } from 'wagmi';
import { customNetworkContext } from '../App';
import { createPublicClient, http } from 'viem';


const useFetchData = (fetchDataFucntion) => {
    const [data, setData] = useState({});
    const [currentNetwork, setCurrentNetwork] = useState(null);
    const setDataKV = (key, value) => {
        setData((prev) => {
            return { ...prev, [key]: value };
        });
    }

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

    useEffect(() => {
        if (publicClient !== undefined) {
            const fetchDataAsync = async () => {
                if (currentNetwork === publicClient.chain.name) {
                    return;
                }
                setData({});
                console.log('fetching data');
                await fetchDataFucntion(setDataKV, publicClient);
                setCurrentNetwork(publicClient.chain.name);
            }
            fetchDataAsync();
        }
    }, [publicClient, currentNetwork, fetchDataFucntion]);

    return data;
}

export default useFetchData;