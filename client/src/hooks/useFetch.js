import { useState, useEffect } from 'react';
import axios from '../lib/axios';

const useFetch = (apiRoute) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        let controller = new AbortController();

        const getData = async () => {
            try {
                const res = await axios.get('/api' + apiRoute, { signal: controller.signal });
                setData(res.data);
                controller = null;
            } catch (err) {
                console.log(err);
            }
        };
        getData();

        return () => controller?.abort();
    }, [apiRoute]);

    return data;
};

export default useFetch;
