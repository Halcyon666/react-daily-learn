import { Route, Routes } from "react-router-dom";
import AddPostForm from "./AddPostForm";
import PostsList from "./PostsList";
import Layout from "../../components/Layout";
import SinglePostPage from "./SinglePostPage";
import EditPostForm from "./EditPostForm";

const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<PostsList />} />
      <Route path="post">
        <Route index element={<AddPostForm />} />
        <Route path=":postId" element={<SinglePostPage />} />
        <Route path="edit">
          <Route path=":postId" element={<EditPostForm />} />
        </Route>
      </Route>
    </Route>
  </Routes>
);

export default App;
