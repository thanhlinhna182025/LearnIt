import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../layout/AlertMessage";

const RegisterForm = () => {
  //context
  const { registerUser } = useContext(AuthContext);
  //local state

  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    confirmpassword: "",
  });
  const [alert, setAlert] = useState(null);
  const { username, password, confirmpassword } = registerForm;
  const onChangeRegisterForm = (event) => {
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });
  };
  const register = async (event) => {
    event.preventDefault();
    if (password !== confirmpassword) {
      setAlert({ type: "danger", message: "Passwords do not match" });
      setTimeout(() => setAlert(null), 3000);
      //return ở đây để ko cho hàm chạy xuống dưới nữa
      return;
    }
    try {
      const registerData = await registerUser(registerForm);
      if (!registerData.success) {
        setAlert({ type: "danger", message: registerData.message });
        setTimeout(() => setAlert(null), 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Form onSubmit={register}>
        <AlertMessage info={alert} />
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="Your User"
            required
            name="username"
            value={username}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            required
            name="password"
            value={password}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            required
            name="confirmpassword"
            value={confirmpassword}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
      <p>
        Don't have an account
        <Link to="/login">
          <Button variant="info" className="ml-2">
            Login
          </Button>
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
