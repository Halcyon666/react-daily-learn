import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { selectPostByUser } from "../posts/postsSlice";
import { selectUserById } from "./usersSlice";

const UserPage = () => {
  const { userId } = useParams();
  const user = useAppSelector((state) => selectUserById(state, Number(userId)));
  //   installHook.js:1 Selector unknown returned a different result when called with the same parameters. This can lead to unnecessary rerenders.
  /*   const postsForUsers = useAppSelector((state) => {
    const allPosts = selectAllPosts(state);
    return allPosts.filter((post) => Number(post.userId) === Number(userId));
  }); */
  const postsForUsers = useAppSelector((state) =>
    selectPostByUser(state, Number(userId))
  );

  const postTitles = postsForUsers.map((post) => (
    <li key={post.id}>
      <Link to={`/post/${post.id}`}>{post.title}</Link>
    </li>
  ));
  return (
    <section>
      <h2>{user?.name}</h2>
      <ol>{postTitles}</ol>
    </section>
  );
};

export default UserPage;
