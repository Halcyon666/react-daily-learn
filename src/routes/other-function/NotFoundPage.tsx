import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  // do not name the variable name to useXxxx， there will be a error hint.
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/", { state: "Error Not Found" });
    }, 1000);
  });
  return <h1>Not Found</h1>;
  // return <Navigate to="/" />;
}
