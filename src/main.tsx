import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from "./redux/store.ts";
import App from "./redux/features/posts/App";
import { fetchUsers } from "./redux/features/posts/usersSlice.ts";
import { fetchPosts } from "./redux/features/posts/postsSlice.ts";

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
