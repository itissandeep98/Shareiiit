import { Component } from "react";
import { connect } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import { Button, Icon, Image } from "semantic-ui-react";
import { loginAction } from "../../store/ActionCreators/auth";

function AuthComp(props) {
  const login = () => {
    props.login();
  };

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
              alt="stadaa"
              size="large"
            />
          </Col>
          <Col className="align-items-center d-flex justify-content-center">
            <div className="w-100 text-center">
              <h1 className="text-info display-1">Stadaa</h1>
              <h1 className=" display-5">
                Resource Sharing Platform for IIITD
              </h1>

              <Button
                onClick={login}
                className="bg-success rounded-pill text-white"
                size="massive"
                fluid
              >
                IIITD Google Login <Icon name="google" />
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  login: () => dispatch(loginAction()),
});

export default connect(null, mapDispatchToProps)(AuthComp);
