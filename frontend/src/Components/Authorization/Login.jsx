import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { Button, Form, Input } from "semantic-ui-react";
import { loginAction } from "../../store/ActionCreators/auth";

function Login() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [paswd, setPaswd] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: paswd,
    };
    dispatch(loginAction(data));
  };
  return (
    <>
      <h1 className=" display-5">Login</h1>
      <Form>
        <Form.Field required>
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Field>
        <Form.Field required>
          <Input
            type="password"
            placeholder="Password"
            value={paswd}
            onChange={(e) => setPaswd(e.target.value)}
          />
        </Form.Field>
        <Button onClick={handleSubmit}>Login</Button>
      </Form>
      <hr />
      <NavLink to="/register">Not Registered? Register Here</NavLink>
    </>
  );
}

export default Login;
