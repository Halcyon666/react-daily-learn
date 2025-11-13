import PostAuthor from "./PostAuthor";
import ReactionButtons from "./ReactionButtons";
import TimeAgo from "./TimeAgo";
import type { PostData } from "./postsSlice";

const PostExcerpt = (post: PostData) => {
  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.body.substring(0, 100)}</p>
      <p className="postCredit">
        <PostAuthor userId={post.userId} />
      </p>
      <TimeAgo timestamp={post.date} />
      <ReactionButtons {...post} />
    </article>
  );
};

export default PostExcerpt;
