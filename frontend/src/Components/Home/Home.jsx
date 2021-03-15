import { connect } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import { logoutAction } from "../../store/ActionCreators/auth";
import PostCards from "../Posts/PostCards";

function Home(props) {
  return (
    <Container fluid className="d-flex h-100 flex-column">
      <Row className="h-100  p-3 ">
        <Col xs={12} md={6} lg={4} className="h-100">
          <Col className=" bg-white rounded_lg h-100 shadow py-3">
            <h1>Books</h1>
            <hr />
            <PostCards />
          </Col>
        </Col>
        <Col md={6} lg={4} className="d-none d-md-block ">
          <Col className=" bg-white rounded_lg h-100 shadow py-3">
            <h1>Electronic Items</h1>
            <hr />
            <PostCards />
          </Col>
        </Col>
        <Col lg={4} className="d-none d-lg-block ">
          <Col className=" bg-white rounded_lg h-100 shadow py-3">
            <h1>Groups</h1>
            <hr />
            <PostCards />
          </Col>
        </Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logoutAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
