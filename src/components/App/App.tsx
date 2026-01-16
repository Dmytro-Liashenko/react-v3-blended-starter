import Modal from "../Modal/Modal";
import PostList from "../PostList/PostList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";

import css from "./App.module.css";
import { useState } from "react";
import { Post } from "../../types/post";
import { useDebouncedCallback } from "use-debounce";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../services/postService";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCreatePost, setIsCreatePost] = useState(false)
  const [isEditPost, setIsEditPost] = useState(false)
  const [editedPost, setEditedPost] = useState<Post | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  // const [debouncedSearchQuery] = useDebouncedCallback(searchQuery, 300)


  const {data} = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(searchQuery, currentPage),
    placeholderData: keepPreviousData
    
  })




  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* <SearchBox /> */}
        {/* <Pagination /> */}
        <button className={css.button}>Create post</button>
      </header>
      <Modal>{/* Передати через children компонент CreatePostForm або EditPostForm */}</Modal>
      {data && data?.length > 0 && <PostList posts={data} toggleModal={() => {}} toggleEditPost={()=>{}}/>}
    </div>
  );
}
