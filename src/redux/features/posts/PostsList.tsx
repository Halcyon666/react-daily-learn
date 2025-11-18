import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import "./index.css";
import PostExcerpt from "./PostExcerpt";
import {
  fetchPosts,
  getPostError,
  getPostStatus,
  selectAllPosts,
  type PostData,
} from "./postsSlice";

const PostsList = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectAllPosts);
  const postStatus = useAppSelector(getPostStatus);
  const error = useAppSelector(getPostError);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  let content;

  if (postStatus === "loading") {
    content = <p>"loading..."</p>;
  } else if (postStatus === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post: PostData) => (
      <PostExcerpt key={post.id} {...post} />
    ));
  } else if (postStatus === "failed") {
    content = <p>{error}</p>;
  }

  return <section>{content}</section>;
};

export default PostsList;
