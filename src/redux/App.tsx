import { Navigate, Route, Routes } from "react-router-dom";
import AddPostForm from "./features/posts/AddPostForm";
import PostsList from "./features/posts/PostsList";
import Layout from "./components/Layout";
import SinglePostPage from "./features/posts/SinglePostPage";
import EditPostForm from "./features/posts/EditPostForm";
import UserList from "./features/users/UserList";
import UserPage from "./features/users/UserPage";
import "./index.css";

const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<PostsList />} />
      <Route path="post">
        <Route index element={<AddPostForm />} />
        <Route path=":postId" element={<SinglePostPage />} />
        {/* <Route path="edit">
          <Route path=":postId" element={<EditPostForm />} />
          </Route> */}
        <Route path="edit/:postId" element={<EditPostForm />} />
      </Route>

      <Route path="user">
        <Route index element={<UserList />} />
        <Route path=":userId" element={<UserPage />} />
      </Route>
    </Route>

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;
