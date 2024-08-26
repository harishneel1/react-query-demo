import React, { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

//GET method
const fetchPosts = () => {
    return axios.get("http://localhost:4000/posts");
}

// POST method

const addPost = (post) => {
    return axios.post("http://localhost:4000/posts", post);
}


const PostsRQ = () => {

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const queryClient = useQueryClient()

    const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts
    })

    const { mutate } = useMutation({
        mutationFn: addPost,
        // onSuccess: (newData) => {
        //     queryClient.setQueryData(["posts"], (oldQueryData) => {
        //         return {
        //             ...oldQueryData,
        //             data: [...oldQueryData.data, newData.data]
        //         }
        //     })
        // }
        onMutate: async (newPost) => {
            await queryClient.cancelQueries(["posts"]);
            const previousPostData = queryClient.getQueryData(["posts"]);

            queryClient.setQueryData(["posts"], (oldQueryData) => {
                return {
                    ...oldQueryData,
                    data: [...oldQueryData.data, { ...newPost, id: String(oldQueryData?.data?.length + 1) }]
                }
            })

            return {
                previousPostData
            }
        },
        onError: (_error, _post, context) => {
            queryClient.setQueryData(["posts"], context.previousPostData)
        },
        onSettled: () => {
            queryClient.invalidateQueries(["posts"]);
        }
    });


    const handleSubmit = (e) => {
        e.preventDefault();

        const post = { title, body }

        mutate(post);
        setTitle("");
        setBody("");
    }

    if (isLoading) {
        return <div>Page is loading...</div>
    }

    if (isError) {
        return <div>{error.message}</div>
    }


    return (
        <div className='post-list'>
            <form onSubmit={handleSubmit}>
                <input
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='Enter post title'
                    value={title}
                />
                <input
                    onChange={(e) => setBody(e.target.value)}
                    placeholder='Enter post body'
                    value={body}
                />
                <button type='submit'>Post</button>
            </form>
            {data?.data.map(post => (
                <Link key={post.id} to={`/rq-posts/${post.id}`}>
                    <div className='post-item' key={post.id}>
                        <h3 className='post-title'>{post.title}</h3>
                        <p className='post-body'>{post.body}</p>
                    </div>
                </Link>
            ))}
            <button onClick={refetch}>Fetch Posts</button>
        </div>
    );
}

export default PostsRQ