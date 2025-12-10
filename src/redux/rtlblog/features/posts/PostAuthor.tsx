import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { selectAllusers } from "../users/usersSlice";

// need to destructure userId
const PostAuthor = ({ userId }: { userId: string | undefined }) => {
  const users = useAppSelector(selectAllusers);
  const author = users.find((user) => user.id === userId);
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
