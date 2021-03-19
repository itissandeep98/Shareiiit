import { Col, Container, Row } from "reactstrap";
import { Image } from "semantic-ui-react";
import Login from "./Login";
import Register from "./Register";

function AuthComp(props) {
  const { right } = props;
  return (
    <div
      className="align-items-center bg-gradient px-3 pt-5"
      style={{ minHeight: "100vh" }}
    >
      <Container className="py-4">
        <Row
          className="bg-white py-5 rounded-lg shadow"
          style={{ minHeight: "80vh" }}
        >
          <Col
            xs={12}
            lg={6}
            className="align-items-center d-flex justify-content-center"
          >
            <Image
              src={process.env.PUBLIC_URL + "/assets/login-image.svg"}
              alt="Resource sharing platform"
              size="large"
            />
          </Col>
          <Col className="align-items-center d-flex justify-content-center">
            <div className="w-100 text-center">
              <h1 className="text-info display-4">Resource Sharing Platform</h1>

              {right === "login" ? <Login /> : <Register />}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AuthComp;
