import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./redux/blog/App.tsx";
import { store } from "./redux/rtlblog/store.ts";
import { fetchUsers } from "./redux/rtlblog/features/users/usersSlice.ts";
import { extenedApiSlice } from "./redux/rtlblog/features/posts/postsSlice.ts";

// Wait for initial data
await Promise.all([
  store.dispatch(fetchUsers()),
  store.dispatch(extenedApiSlice.endpoints.getPosts.initiate()),
]);

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
