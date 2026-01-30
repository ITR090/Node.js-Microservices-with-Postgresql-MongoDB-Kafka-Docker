import { useEffect, useState, useContext, useCallback } from "react";


const useFetch = (apiFunc, params) => { {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        
        try {
            setLoading(true);  
            const response = await apiFunc(); //params ? await apiFunc(params) : await apiFunc();
            setData(response);
        } catch (err) {
            setError(err);
            console.error("Error fetching data:", err);
        } finally {     
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);


    return { data, loading, error, refetch: fetchData, setData };
}};

export default useFetch;

