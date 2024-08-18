import { keepPreviousData, useInfiniteQuery, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'

const fetchFruits = ({ pageParam = 1 }) => {
    return axios.get(`http://localhost:4000/fruits/?_limit=4&_page=${pageParam}`);
}

const InfiniteQueries = () => {

    const { data, isLoading, isError, error, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ["fruits"],
        queryFn: fetchFruits,
        initialPageParam: 1,
        getNextPageParam: (_lastPage, allPages) => {

            if (allPages.length < 5) {
                return allPages.length + 1
            } else {
                return undefined
            }
        }
    })

    if (isLoading) {
        return <h2>Page is Loading...</h2>
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }

    return (
        <div className='container'>
            {
                data?.pages?.map((group) => {
                    return group?.data.map(fruit => {
                        return <div className='fruit-item'>{fruit.name}</div>
                    })
                })
            }
            <button disabled={!hasNextPage} onClick={fetchNextPage}>Load more</button>
        </div>
    )
}

export default InfiniteQueries