import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";
import ReactionButtons from "./ReactionButtons";
import TimeAgo from "./TimeAgo";
import { useGetPostById } from "./postsSlice";

const PostExcerpt = ({ id }: { id: string }) => {
  // 在 PostExcerpt 里根据 id 取数据
  const { post } = useGetPostById(id);
  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }
  return (
    <article>
      <h2>{post.title}</h2>
      <p className="except">{post.body.substring(0, 75)}...</p>
      <p className="postCredit">
        <Link to={`post/${post.id}`}>View Post</Link>
        <PostAuthor userId={post.userId} />
      </p>
      <TimeAgo timestamp={post.date} />
      <ReactionButtons {...post} />
    </article>
  );
};

export default PostExcerpt;
