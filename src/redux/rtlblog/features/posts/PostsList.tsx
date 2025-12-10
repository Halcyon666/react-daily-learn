import { useAppSelector } from "../../hooks";
import PostExcerpt from "./PostExcerpt";
import { selectPostIds, useGetPostsQuery } from "./postsSlice";

const PostsList = () => {
  const { isLoading, isSuccess, isError, error } = useGetPostsQuery();
  const orderedPostIds = useAppSelector(selectPostIds);

  let content;
  if (isLoading) {
    content = <p>"loading..."</p>;
  } else if (isSuccess) {
    // 正确写法：先拿 id，再用 selectByPostId 获取对应实体
    content = orderedPostIds.map((id) => <PostExcerpt key={id} id={id} />);
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return (
    <>
      <section>{content}</section>
    </>
  );
};

export default PostsList;
