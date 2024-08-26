import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useInView } from "react-intersection-observer";

const fetchFruits = ({ pageParam }) => {
    return axios.get(`http://localhost:4000/fruits/?_limit=10&_page=${pageParam}`);
}

const InfiniteQueries = () => {

    const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
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

    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [fetchNextPage, inView])

    if (isLoading) {
        return <h2>Page is Loading...</h2>
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }

    return (
        <div className='container'>
            {data?.pages?.map(page => {
                return page?.data.map(fruit => {
                    return <div className='fruit-item' key={fruit.id}>
                        {fruit.name}
                    </div>
                })
            })}
            <div ref={ref}>{isFetchingNextPage && "Loading..."}</div>
        </div>
    )
}

export default InfiniteQueries