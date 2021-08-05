import { Chip, InputAdornment, TextField, Tooltip } from "@material-ui/core";
import { Col, Container, Row } from "reactstrap";
import TechCard from "./TechCard";
import SearchIcon from "@material-ui/icons/Search";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { useEffect } from "react";
import { fetchSkillPosts } from "../../Store/ActionCreators/skill";
import { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { searchSkills } from "../../Store/ActionCreators/search";

const searchTest = function (varToSearch, jsonData) {
  var ans = false;
  for (var key in jsonData) {
    if (ans) {
      return true;
    }
    if (typeof jsonData[key] === "object") {
      ans = ans || searchTest(varToSearch, jsonData[key]);
    } else {
      if (
        typeof jsonData[key] === "string" &&
        jsonData[key].toLowerCase().includes(varToSearch.toLowerCase())
      ) {
        return true;
      }
    }
  }
  return ans;
};

function MainView(props) {
  const { tags, modifyTags } = props;
  const [cards, setCards] = useState(props.skill.skills ?? []);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSkillPosts()).then((res) => {
      setCards(res);
    });
  }, [dispatch]);

  useEffect(() => {
    const allCards = props.skill.skills ?? [];
    const temp = allCards.filter((card) => tags.includes(card.skill.name));
    if (temp.length > 0) {
      setCards(temp);
    } else if (tags.length > 0) {
      setCards([]);
    } else {
      setCards(allCards);
    }
  }, [tags]);

  useEffect(() => {
    // const allCards = props.skill.skills ?? [];
    // const temp = allCards.filter((card) => searchTest(searchText, card));
    dispatch(searchSkills({ name: searchText })).then((res) => {
      const temp = res;
      if (temp.length > 0) {
        setCards(temp);
      } else {
        setCards([]);
      }
    });
  }, [searchText]);

  return (
    <Container className="bg-white p-3 rounded_lg">
      <Row>
        <Col>
          <TextField
            label="Search Input"
            fullWidth
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
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
        {cards.length > 0 ? (
          cards?.map((card) => (
            <Col md={4} className="mt-4">
              <TechCard {...card} />
            </Col>
          ))
        ) : (
          <p className="text-center text-muted w-100">No Results Found !!</p>
        )}
      </Row>
    </Container>
  );
}
const mapStateToProps = (state) => ({
  skill: state.skill,
});

export default connect(mapStateToProps)(MainView);
