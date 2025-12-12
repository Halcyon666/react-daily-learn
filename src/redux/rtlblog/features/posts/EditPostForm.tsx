import { useState, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUsersQuery } from "../users/usersSlice";
import {
  useDeletePostMutation,
  useGetPostById,
  useUpdatePostMutation,
  type PostData,
} from "./postsSlice";

// =========================================================
// 1. THE INTERNAL FORM COMPONENT
//    (This is "Private". It assumes data is already loaded)
// =========================================================
const EditPostFormUI = ({ post }: { post: PostData }) => {
  const navigate = useNavigate();

  // ✅ useState works perfectly now because 'post' is fully loaded
  //    before this component is ever created.
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.body);
  const [userId, setUserId] = useState(post.userId);

  const [updatePost, { isLoading }] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();
  const { data: users, isSuccess } = useGetUsersQuery();

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onContentChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);
  const onUserIdChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setUserId(e.target.value);

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
        navigate(`/post/${post.id}`);
      } catch (err) {
        console.error("Failed to update post", err);
      }
    }
  };

  const deletePostClick = async () => {
    try {
      await deletePost({ id: post.id }).unwrap();
      navigate("/");
    } catch (err) {
      console.error("Failed to delete post", err);
    }
  };

  const usersOptions = isSuccess
    ? users.ids.map((id: string) => (
        <option key={id} value={id}>
          {users.entities[id].name}
        </option>
      ))
    : null;

  return (
    <section>
      <h2>Edit Post</h2>
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
        <select id="postUserId" defaultValue={userId} onChange={onUserIdChange}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChange}
        />
        <button type="button" onClick={updatePostClick} disabled={!canUpdate}>
          Save Post
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

// =========================================================
// 2. THE MAIN EXPORT (The Container)
//    (This is what your Router talks to)
// =========================================================
const EditPost = () => {
  const { postId } = useParams();
  const { post, isLoading } = useGetPostById(postId as string);

  // 1. Handle Loading
  if (isLoading) return <p>Loading...</p>;

  // 2. Handle Missing Data
  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  // 3. Render the Form ONLY when data is ready
  //    The 'key' prop is an industry trick: if the ID changes,
  //    React completely resets the form state for the new post.
  return <EditPostFormUI post={post} key={post.id} />;
};

export default EditPost;
