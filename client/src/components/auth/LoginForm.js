import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
// import {  useHistory } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../layout/AlertMessage";

const LoginForm = () => {
  //use context
  const { loginUser } = useContext(AuthContext);
  //local state
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  //Router
  // const history = useHistory();
  const [alert, setAlert] = useState(null);
  const { username, password } = loginForm;
  const onChangeLoginForm = (event) => {
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
  };
  const login = async (event) => {
    event.preventDefault();
    try {
      const loginData = await loginUser(loginForm);
      // if (loginData.success) {
      //   //Do Auth da co redirect dashboard
      //   // history.push("/dashboard");
      // }
      if (!loginData.success) {
        setAlert({ type: "danger", message: loginData.message });
        setTimeout(() => setAlert(null), 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form onSubmit={login}>
        <AlertMessage info={alert} />
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="Your User"
            name="username"
            required
            value={username}
            onChange={onChangeLoginForm}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
            value={password}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <p>
        Don't have an account
        <Link to="/register">
          <Button variant="info" className="ml-2">
            Register
          </Button>
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
