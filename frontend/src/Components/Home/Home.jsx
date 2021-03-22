import { Col, Container, Row } from "reactstrap";
import SummaryCard from "../Cards/SummaryCard";
import ProfileCard from "../Cards/ProfileCard";
import { Image } from "semantic-ui-react";
import Faq from "./Faq";

function Home(props) {
  return (
    <Container fluid className="p-3 bg-light h-100">
      <br />
      <Row>
        <Col>
          <Image
            fluid
            src={process.env.PUBLIC_URL + "/assets/images/campus.jpg"}
          />
        </Col>
      </Row>
      <Row className="d-flex justify-content-center h-100 ">
        <Col xs={2}>
          <ProfileCard />
        </Col>
        <Col xs={3}>
          <SummaryCard
            image={process.env.PUBLIC_URL + "/assets/images/book.png"}
            title="Most Active Category"
            key="category"
          />
        </Col>
        <Col xs={3}>
          <SummaryCard
            image={process.env.PUBLIC_URL + "/assets/images/book.png"}
            title="Recent Activity"
            key="activity"
          />
        </Col>
      </Row>
      <Row className="mt-5">
        <Faq />
      </Row>
      <br />
      <br />
    </Container>
  );
}

export default Home;
