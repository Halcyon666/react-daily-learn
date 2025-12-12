import { useState, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUsersQuery } from "../users/usersSlice";
import {
  useDeletePostMutation,
  useGetPostById,
  useUpdatePostMutation,
  type PostData,
} from "./postsSlice";

// ==========================================
// 1. THE FORM (Receives 'onDelete' as a prop)
// ==========================================
const EditPostFormUI = ({
  post,
  onDelete,
}: {
  post: PostData;
  onDelete: () => Promise<void>;
}) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.body);
  const [userId, setUserId] = useState(post.userId);

  const [updatePost, { isLoading }] = useUpdatePostMutation();
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
        {/* 👇 Using the prop function now */}
        <button type="button" className="deleteButton" onClick={onDelete}>
          Delete Post
        </button>
      </form>
    </section>
  );
};

// ==========================================
// 2. THE WRAPPER (Now handles Delete logic)
// ==========================================
const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const { post, isLoading } = useGetPostById(postId as string);

  // 👇 1. Move Delete Mutation HERE
  const [deletePost] = useDeletePostMutation();
  // 👇 2. Track a local "isDeleting" state to prevent the 404 flash
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true); // Stop rendering "Not found"
      await deletePost({ id: postId }).unwrap();
      navigate("/");
    } catch (err) {
      setIsDeleting(false); // Reset if it failed
      console.error("Failed to delete post", err);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  // 👇 3. If deleting, render nothing (or a spinner) to prevent 404 flash
  if (isDeleting) return null;

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  // 👇 4. Pass the delete handler down
  return <EditPostFormUI post={post} key={post.id} onDelete={handleDelete} />;
};

export default EditPost;
