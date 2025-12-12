import { useState, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUsersQuery } from "../users/usersSlice";
import {
  useDeletePostMutation,
  useGetPostById,
  useUpdatePostMutation,
} from "./postsSlice";

const EditPostForm = () => {
  const { postId } = useParams();

  // 1. fetch data
  const { data: users, isSuccess } = useGetUsersQuery();
  const { post, isLoading: isLoadingPost } = useGetPostById(postId as string);

  const [updatePost, { isLoading }] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();

  // 2. Initialize State (Start empty)
  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);
  const navigate = useNavigate();

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  // 3. Events
  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onContentChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);
  const onUserIdChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setUserId(e.target.value);
  const deletePostClick = async () => {
    try {
      await deletePost({ id: post.id }).unwrap();
      setTitle("");
      setContent("");
      setUserId("");
      navigate("/");
    } catch (err) {
      console.log("Failed to delete the post", err);
    }
  };

  const canUpdate = [title, content, userId].every(Boolean) && !isLoading;
  const updatePostClick = async () => {
    if (canUpdate) {
      try {
        await updatePost({
          id: post.id,
          title,
          body: content,
          userId,
        }).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
        navigate(`/post/${postId}`);
      } catch (err) {
        console.log("Failed to update the post", err);
      }
    }
  };

  // 4. Content of page
  let usersOptions;
  if (isSuccess) {
    usersOptions = users.ids.map((id) => (
      <option key={id} value={id}>
        {users.entities[id].name}
      </option>
    ));
  }

  if (!isLoading && !isLoadingPost) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChange}
        />

        <label htmlFor="postUserId">Author:</label>
        <select
          id="postUserId"
          defaultValue={userId}
          onChange={onUserIdChange}
          name="postUserId"
        >
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Post Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChange}
        />

        <button type="button" onClick={updatePostClick} disabled={!canUpdate}>
          Edit Post
        </button>
        <button
          type="button"
          className="deleteButton"
          onClick={deletePostClick}
        >
          Delete Post
        </button>
      </form>
    </section>
  );
};

export default EditPostForm;
