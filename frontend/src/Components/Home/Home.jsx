import { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import Posts from "../Posts/Posts";
import CatDropdown from "./CatDropdown";
import ProfileCard from "./ProfileCard";

function Home(props) {
  const [category, setCategory] = useState("All");

  return (
    <Container fluid className="p-4 bg-light h-100">
      <br />
      <Row>
        <Col xs={2}>
          <ProfileCard />
        </Col>
        <Col>
          <CatDropdown
            category={category}
            changeCategory={(cat) => setCategory(cat)}
          />

          <br />
          <Posts cat={category} key="posts" />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
