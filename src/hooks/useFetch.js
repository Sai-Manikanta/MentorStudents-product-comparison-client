import { useState, useEffect } from 'react'
import axios from 'axios'

export const useFetch = (url) => {
    const [data, setData] = useState({ loading: false, data: null, error: null });

    useEffect(() => {
        setData({ loading: true, list: null, error: null });

        axios.get(url)
            .then(res => setData({ loading: false, data: res.data, error: null }))
            .catch(error => setData({ loading: false, data: null, error: error.message }))
    }, [url])

    return data
}