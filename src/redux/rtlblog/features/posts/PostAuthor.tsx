import { Link } from "react-router-dom";
import { useGetUserById } from "../users/usersSlice";

// need to destructure userId
const PostAuthor = ({ userId }: { userId: string | undefined }) => {
  const { user: author } = useGetUserById(userId as string);
  return (
    <span>
      by{" "}
      {author ? (
        <Link to={`/user/${userId}`}>{author.name}</Link>
      ) : (
        "Unknown author"
      )}
    </span>
  );
};

export default PostAuthor;
