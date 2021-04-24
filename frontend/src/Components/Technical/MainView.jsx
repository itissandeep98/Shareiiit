import { Chip, InputAdornment, TextField, Tooltip } from "@material-ui/core";
import { Col, Container, Row } from "reactstrap";
import TechCard from "./TechCard";
import SearchIcon from "@material-ui/icons/Search";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

function MainView(props) {
  const { tags, modifyTags } = props;
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
      <Row>
        <Col>
          {tags.map((tag, i) => (
            <Tooltip
              title={tag}
              placement="top"
              key={Math.random()}
              className="mx-1 my-2"
            >
              <Chip
                label={tag}
                onDelete={() => modifyTags(tag)}
                deleteIcon={<HighlightOffIcon />}
              />
            </Tooltip>
          ))}
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
