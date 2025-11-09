import { useSelector } from "react-redux";
import { selectAllPosts, type PostData } from "./postsSlice";
import "./index.css";
// rafce
const PostsList = () => {
  //   const posts = useAppSelector((state) => state.posts);
  const posts = useSelector(selectAllPosts);
  const renderedPosts = posts.map((post: PostData) => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>
    </article>
  ));
  return (
    <section>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
};

export default PostsList;
