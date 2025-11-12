import { nanoid } from "nanoid";
import { useState, type ChangeEvent } from "react";
import { postAdded } from "./postsSlice";
import { useAppDispatch } from "../../hooks";

const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onContentChange = (e: ChangeEvent<HTMLInputElement>) =>
    setContent(e.target.value);

  const savePost = () => {
    if (title && content) {
      useAppDispatch(postAdded({ id: nanoid(), title, content }));
      setContent("");
      setTitle("");
    }
  };
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
        <label htmlFor="postContent">Post Title:</label>
        <input
          type="text"
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChange}
        />
        <button type="button" onClick={savePost}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
