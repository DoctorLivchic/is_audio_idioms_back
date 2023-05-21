import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hoc/useAuth";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const fromPage = location.state?.from?.pathname || "/";

  const handleSubmit = (event) => {
    event.pointerDefault();
  };

  return (
    <div style={{ color: "white" }}>
      <h1>Login page</h1>
      {fromPage}
    </div>
  );
};
export default LoginPage;
