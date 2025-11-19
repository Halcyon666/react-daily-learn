import { useState, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import type { RootState } from "../../store";
import { selectPostById, updatePost } from "./postsSlice";
import { selectAllusers } from "./usersSlice";

const EditPostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const post = useAppSelector((state: RootState) =>
    selectPostById(state, Number(postId))
  );
  const users = useAppSelector(selectAllusers);
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.body || "");
  const [userId, setUserId] = useState(post?.userId || "");
  const [requestStatus, setRequestStatus] = useState("idle");
  const dispatch = useAppDispatch();

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onContentChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);
  const onUserIdChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setUserId(e.target.value);
  const canUpdate =
    [title, content, userId].every(Boolean) && requestStatus === "idle";
  const updatePostClick = () => {
    if (canUpdate) {
      try {
        setRequestStatus("pending");
        dispatch(
          updatePost({
            id: post.id,
            title,
            body: content,
            userId,
            reactions: post.reactions,
          })
        ).unwrap();
        setTitle("");
        setContent("");
        setUserId("");
        navigate(`/post/${postId}`);
      } catch (err) {
        console.log("Failed to update the post", err);
      } finally {
        setRequestStatus("idle");
      }
    }
  };
  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));
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
      </form>
    </section>
  );
};

export default EditPostForm;
