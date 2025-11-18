import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";
import ReactionButtons from "./ReactionButtons";
import TimeAgo from "./TimeAgo";
import type { PostData } from "./postsSlice";

const PostExcerpt = (post: PostData) => {
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
