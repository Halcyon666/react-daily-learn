import { Link } from "react-router-dom";
import { useGetUsersQuery } from "./usersSlice";

const UserList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    const renderedUsers = users.ids.map((id) => (
      <li key={id}>
        <Link to={`/user/${id}`}>{users.entities[id].name}</Link>
      </li>
    ));
    content = (
      <section>
        <h2>Users</h2>
        <ul>{renderedUsers}</ul>
      </section>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return content;
};

export default UserList;
