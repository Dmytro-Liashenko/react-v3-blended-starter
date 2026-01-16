import axios from "axios";
import { Post } from "../types/post";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

export const fetchPosts = async (searchText: string, page: number) :Promise<Post[]> => {
    const res = await axios.get<Post[]>("/posts", {params:{
        ...(searchText !== "" && {q: searchText}),
        _page: page,
        _limit: 8,
    }})
    return res.data
};

export const createPost = async (newPost) => {};

export const editPost = async (newDataPost) => {};

export const deletePost = async (postId: number) => {
    const res = await axios.delete<Post>(`/posts/${postId}`)
    return res.data
};
