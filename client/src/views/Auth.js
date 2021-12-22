import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { Redirect } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const Auth = ({ authRouter }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);
  let body;
  if (authLoading) {
    body = (
      <div className="d-flex justify-content-center mt-2">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  } else {
    body = (
      <div>
        {authRouter === "login" && <LoginForm />}
        {authRouter === "register" && <RegisterForm />}
      </div>
    );
  }
  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1>Learnit</h1>
          <h4>Keep track of your learning</h4>
          {body}
        </div>
      </div>
    </div>
  );
};

export default Auth;
