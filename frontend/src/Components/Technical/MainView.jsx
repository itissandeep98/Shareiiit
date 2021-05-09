import { Chip, InputAdornment, TextField, Tooltip } from "@material-ui/core";
import { Col, Container, Row } from "reactstrap";
import TechCard from "./TechCard";
import SearchIcon from "@material-ui/icons/Search";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { useEffect } from "react";
import { fetchSkillPosts } from "../../Store/ActionCreators/skill";
import { useState } from "react";
import { connect, useDispatch } from "react-redux";

function MainView(props) {
  const { tags, modifyTags } = props;
  const [cards, setCards] = useState(props.skill.skills ?? []);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSkillPosts()).then((res) => {
      setCards(res);
    });
  }, [dispatch]);
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
        {cards?.map((card) => (
          <Col md={4} className="mt-4">
            <TechCard {...card} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
const mapStateToProps = (state) => ({
  skill: state.skill,
});

export default connect(mapStateToProps)(MainView);
