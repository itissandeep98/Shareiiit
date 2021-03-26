import React from "react";
import { Col, Container, Row } from "reactstrap";
import CatDropdown from "./CatDropdown";
import SearchBar from "./SearchBar";

function FilterBar(props) {
  return (
    <Container fluid className="border pt-3 bg-light">
      <Row>
        <Col xs={3}>
          <CatDropdown {...props} />
        </Col>
        <Col>
          <SearchBar />
        </Col>
      </Row>
    </Container>
  );
}

export default FilterBar;
