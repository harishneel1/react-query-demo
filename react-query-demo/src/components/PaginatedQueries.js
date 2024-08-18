import { keepPreviousData, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'

const fetchFruits = (pageId) => {
    return axios.get(`http://localhost:4000/fruits/?_limit=4&_page=${pageId}`);
}

const PaginatedQueries = () => {

    const [page, setPage] = useState(1);


    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["fruits", page],
        queryFn: () => fetchFruits(page),
        placeholderData: keepPreviousData
    })

    if (isLoading) {
        return <h2>Page is Loading...</h2>
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }

    return (
        <div className='container'>
            {data?.data.map(item => <div key={item.id} className='fruit-label'>{item.name}</div>)}
            <button onClick={() => setPage(prev => prev - 1)} disabled={page == 0 ? true : false}>Prev Page</button>
            <button onClick={() => setPage(prev => prev + 1)} disabled={page == 5 ? true : false}>Next Page</button>
        </div>
    )
}

export default PaginatedQueries