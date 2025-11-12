import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import PostsList from "./redux/features/posts/PostsList.tsx";
import { store } from "./redux/store.ts";
import AddPostForm from "./redux/features/posts/AddPostForm.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AddPostForm />
        <PostsList />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
