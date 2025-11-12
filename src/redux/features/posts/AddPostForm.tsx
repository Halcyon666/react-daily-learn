import { useState, type ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks";
import { postAdded } from "./postsSlice";
import { selectAllusers } from "./usersSlice";

const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const users = useSelector(selectAllusers);

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onContentChange = (e: ChangeEvent<HTMLInputElement>) =>
    setContent(e.target.value);
  const onUserIdChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setUserId(e.target.value);
  // fix previous error
  // Expected 0 arguments, but got 1.
  const dispatch = useAppDispatch();
  const canSave = Boolean(title) && Boolean(content) && Boolean(userId);
  const savePost = () => {
    if (title && content) {
      dispatch(postAdded(title, content, userId));
      setContent("");
      setTitle("");
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
        <label htmlFor="postContent">Post Content:</label>
        <input
          type="text"
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChange}
        />
        <label htmlFor="postUserId">Author:</label>
        <select
          id="postUserId"
          value={userId}
          onChange={onUserIdChange}
          name="postUserId"
        >
          <option value=""></option>
          {usersOptions}
        </select>
        <button type="button" onClick={savePost} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
