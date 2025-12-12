import PostExcerpt from "./PostExcerpt";
import { useGetPostsQuery } from "./postsSlice";

const PostsList = () => {
  const { data: posts, isLoading, isError, error } = useGetPostsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{JSON.stringify(error)}</p>;

  return (
    <section>
      {posts?.ids.map((postId) => (
        <PostExcerpt key={postId} id={postId as string} />
      ))}
    </section>
  );
};

export default PostsList;
