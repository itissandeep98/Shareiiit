import { lazy, Suspense } from "react";
import { Col, Container, Row } from "reactstrap";
import Loading from "../Loading";
const NavCard = lazy(() => import("../Cards/NavCard"));
const Create = lazy(() => import("./Create/Create"));
const Posts = lazy(() => import("./Posts"));
const Postings = lazy(() => import("./Postings/Postings"));
const Interests = lazy(() => import("./Interests"));

function Feed(props) {
  const { active } = props;

  return (
    <Container fluid className="p-3 bg-light h-100">
      <Row className="justify-content-center">
        <Col md={10}>
          <Row>
            <Col xs={2}>
              <Suspense fallback={<Loading />}>
                <NavCard active={active} />
              </Suspense>
            </Col>
            <Col>
              <Row>
                <Col className="my-3 py-3 pb-5 rounded_lg bg-white">
                  <Suspense fallback={<Loading />}>
                    {active === "feed" && <Posts />}
                    {active === "create" && <Create />}
                    {active === "interest" && <Interests />}
                    {active === "myposts" && <Postings />}
                  </Suspense>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Feed;
