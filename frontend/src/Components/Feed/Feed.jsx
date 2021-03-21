import { lazy } from "react";
import { Col, Container, Row } from "reactstrap";
const NavCard = lazy(() => import("../Cards/NavCard"));
const Create = lazy(() => import("./Create/Create"));
const Posts = lazy(() => import("./Posts"));
const Postings = lazy(() => import("./Postings/Postings"));
const Interests = lazy(() => import("./Interests"));

function Feed(props) {
  const { active } = props;

  return (
    <Container>
      <Row>
        <Col xs={2}>
          <NavCard active={active} />
        </Col>
        <Col>
          <Row>
            <Col className="shadow my-3 py-3 rounded_lg">
              {active === "feed" && <Posts />}
              {active === "create" && <Create />}
              {active === "interest" && <Interests />}
              {active === "postings" && <Postings />}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Feed;
