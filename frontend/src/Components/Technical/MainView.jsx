import { InputAdornment, TextField } from "@material-ui/core";
import { Col, Container, Row } from "reactstrap";
import TechCard from "./TechCard";
import SearchIcon from "@material-ui/icons/Search";

function MainView() {
  return (
    <Container className="bg-white p-3 rounded_lg">
      <Row>
        <Col>
          <TextField
            label="Search Input"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <TechCard />
        </Col>
        <Col>
          <TechCard />
        </Col>
        <Col>
          <TechCard />
        </Col>
        <Col>
          <TechCard />
        </Col>
      </Row>
    </Container>
  );
}

export default MainView;
