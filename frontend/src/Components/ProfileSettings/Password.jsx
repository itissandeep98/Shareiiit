import { Button, TextField } from "@material-ui/core";
import { Col, Container, Row } from "reactstrap";
import { Image } from "semantic-ui-react";

function Password() {
  return (
    <Row className="shadow my-3 py-4 rounded_lg bg-white align-items-center">
      <Col xs={12} md={2} className="d-none d-md-block">
        <Image
          src={process.env.PUBLIC_URL + "/assets/images/password.png"}
          fluid
        />
      </Col>
      <Col>
        <h2>
          Update Password
          <div className="d-inline ml-2 d-md-none">
            <Image
              src={process.env.PUBLIC_URL + "/assets/images/password.png"}
              avatar
            />
          </div>
        </h2>
        <hr />
        <form>
          <TextField
            label="Old Password"
            type="password"
            className="mt-3"
            variant="outlined"
            fullWidth
            required
          />
          <TextField
            label="New Password"
            type="password"
            className=" mt-3"
            variant="outlined"
            fullWidth
            required
          />
          <TextField
            label="Confirm Password"
            type="password"
            className=" mt-3"
            variant="outlined"
            fullWidth
            required
          />
          <Button
            variant="outlined"
            className="mt-3 float-right rounded-pill bg-info text-white"
          >
            Update
          </Button>
        </form>
      </Col>
    </Row>
  );
}

export default Password;
