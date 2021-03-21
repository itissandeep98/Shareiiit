import { Col, Container, Row } from "reactstrap";
import Posts from "../Posts/Posts";
import SummaryCard from "../Cards/SummaryCard";
import ProfileCard from "../Cards/ProfileCard";

function Home(props) {
  return (
    <Container fluid className="p-3 bg-light h-100">
      <br />
      <Row className="d-flex justify-content-center h-100 ">
        <Col xs={2}>
          <ProfileCard />
        </Col>
        <Col xs={3}>
          <SummaryCard
            image={process.env.PUBLIC_URL + "/assets/images/book.png"}
            title="Most Active Category"
          />
        </Col>
        <Col xs={3}>
          <SummaryCard
            image={process.env.PUBLIC_URL + "/assets/images/book.png"}
            title="Recent Activity"
          />
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <Posts />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
