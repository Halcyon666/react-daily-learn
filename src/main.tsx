import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./redux/rtlblog/App.tsx";
import { store } from "./redux/rtlblog/store.ts";
import { extenedApiSlice as postApiSlice } from "./redux/rtlblog/features/posts/postsSlice.ts";
import { extenedApiSlice as userApiSlice } from "./redux/rtlblog/features/users/usersSlice.ts";

// Wait for initial data
await Promise.all([
  store.dispatch(userApiSlice.endpoints.getUsers.initiate()),
  store.dispatch(postApiSlice.endpoints.getPosts.initiate()),
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
