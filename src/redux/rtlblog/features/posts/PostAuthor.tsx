import { Link } from "react-router-dom";
import { useGetUsersQuery } from "../users/usersSlice";

// need to destructure userId
const PostAuthor = ({ userId }: { userId: string | undefined }) => {
  const { user: author } = useGetUsersQuery(undefined, {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId as string],
    }),
  });
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
