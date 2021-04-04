import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import { Spinner } from "reactstrap";
import { Button, Form, Input } from "semantic-ui-react";
import { loginAction } from "../../store/ActionCreators/auth";

function Login(props) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [paswd, setPaswd] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: paswd,
    };
    setLoading(true);
    dispatch(loginAction(data)).then((res) => {
      setLoading(false);
      props.history.push("/home");
    });
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
        {loading ? <Spinner /> : <Button onClick={handleSubmit}>Login</Button>}
      </Form>
      <hr />
      <NavLink to="/register">Not Registered? Register Here</NavLink>
    </>
  );
}

export default withRouter(Login);
