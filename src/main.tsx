import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./redux/blog/App.tsx";
import { fetchPosts } from "./redux/blog/features/posts/postsSlice.ts";
import { fetchUsers } from "./redux/blog/features/users/usersSlice.ts";
import { store } from "./redux/blog/store.ts";

// Wait for initial data
await Promise.all([store.dispatch(fetchUsers()), store.dispatch(fetchPosts())]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
