import { Link, useParams } from "react-router-dom";
import { useGetPostsByUserIdQuery } from "../posts/postsSlice";
import { useGetUserById } from "./usersSlice";

const UserPage = () => {
  const { userId } = useParams();
  const {
    data: postsForUsers,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsByUserIdQuery(userId);
  const {
    user,
    isLoading: isLoadingUser,
    isSuccess: isSuccessUser,
    isError: isErrorUser,
    error: errorUser,
  } = useGetUserById(userId as string);

  let content;
  if (isLoading || isLoadingUser) {
    content = <p>Loading...</p>;
  } else if (isSuccess && isSuccessUser) {
    const { ids, entities } = postsForUsers;
    content = (
      <section>
        <h2>{user?.name}</h2>
        <ol>
          {ids.map((id) => (
            <li key={id}>
              <Link to={`/post/${id}`}>{entities[id].title}</Link>
            </li>
          ))}
        </ol>
      </section>
    );
  } else if (isError || isErrorUser) {
    content = <p>{JSON.stringify(error) || JSON.stringify(errorUser)}</p>;
  }

  return content;
};

export default UserPage;
