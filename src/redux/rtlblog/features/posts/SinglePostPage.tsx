import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import PostAuthor from "./PostAuthor";
import { selectPostById } from "./postsSlice";
import ReactionButtons from "./ReactionButtons";
import TimeAgo from "./TimeAgo";

const SinglePostPage = () => {
  const { postId } = useParams();
  const post = useAppSelector((state) =>
    selectPostById(state, postId as string)
  );
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
      <p>{post.body}</p>
      <p className="postCredit">
        <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons {...post} />
    </article>
  );
};

export default SinglePostPage;
