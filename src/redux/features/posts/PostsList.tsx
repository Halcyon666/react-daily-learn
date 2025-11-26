import { useAppSelector } from "../../hooks";
import PostExcerpt from "./PostExcerpt";
import { getPostError, getPostStatus, selectPostIds } from "./postsSlice";

const PostsList = () => {
  const orderedPostIds = useAppSelector(selectPostIds);
  const postStatus = useAppSelector(getPostStatus);
  const error = useAppSelector(getPostError);

  let content;

  if (postStatus === "loading") {
    content = <p>"loading..."</p>;
  } else if (postStatus === "succeeded") {
    // 正确写法：先拿 id，再用 selectByPostId 获取对应实体
    content = orderedPostIds.map((id) => <PostExcerpt key={id} id={id} />);
  } else if (postStatus === "failed") {
    content = <p>{error}</p>;
  }

  return <section>{content}</section>;
};

export default PostsList;
