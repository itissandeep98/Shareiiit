import { Col, Container, Row } from "reactstrap";
import MainView from "./MainView";
import Tags from "./Tags";

function Technical() {
  return (
    <Container fluid className="p-3 bg-light h-100">
      <Row>
        <Col xs={2}>
          <Tags />
        </Col>
        <Col>
          <MainView />
        </Col>
      </Row>
    </Container>
  );
}

export default Technical;
