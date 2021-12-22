import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import {useState} from "react"

const RegisterForm = () => {
const [registerForm , setRegisterForm]= useState({
  username:""
})

  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="Your User"
            required
            name="username"
            
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            required
            name="password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            required
            name="confirmpassword"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
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
