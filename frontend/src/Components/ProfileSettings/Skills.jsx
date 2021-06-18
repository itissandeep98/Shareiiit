import { Button, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { Image, Rating } from "semantic-ui-react";
import AddSkill from "./AddSkill";
import { useDispatch } from "react-redux";
import { fetchUserSkills } from "../../Store/ActionCreators/skill";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccordionActions from "@material-ui/core/AccordionActions";

function Skills() {
  const [userTags, setuserTags] = useState([]);
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(0);

  const handleChange = (value) => {
    setExpanded(value === expanded ? -1 : value);
  };
  useEffect(() => {
    dispatch(fetchUserSkills()).then((res) => {
      setuserTags(res);
    });
  }, [dispatch]);
  const handleDelete = (i) => {
    setuserTags([...userTags.slice(0, i), ...userTags.slice(i + 1)]);
  };

  return (
    <Row className="shadow my-3 py-4 rounded_lg bg-white align-items-center">
      <Col>
        <h2>
          Add Skills
          <div className="d-inline ml-2 d-md-none">
            <Image
              src={process.env.PUBLIC_URL + "/assets/images/skill.png"}
              avatar
            />
          </div>
          <hr />
        </h2>
        <AddSkill
          userTags={userTags}
          setuserTags={setuserTags}
          modal={modal}
          toggle={() => setModal(!modal)}
        />
        <Button variant="outlined" onClick={() => setModal(true)}>
          Add New Skill Post
        </Button>
        <Row>
          <Col className="text-center mb-3">
            {userTags.map((tag, i) => (
              <Accordion
                key={i}
                expanded={expanded === i}
                onChange={() => handleChange(i)}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{tag.skill.name}</Typography>
                  <Rating
                    className="ml-3"
                    rating={tag.skill.rating}
                    icon="star"
                    maxRating={5}
                    size="huge"
                    disabled
                  />
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{tag.description}</Typography>
                </AccordionDetails>
                <AccordionActions>
                  <Button size="small" onClick={() => handleDelete(i)}>
                    Delete
                  </Button>
                  <Button size="small" color="primary">
                    Edit
                  </Button>
                </AccordionActions>
              </Accordion>
            ))}
          </Col>
        </Row>
      </Col>
      <Col xs={12} md={2} className="d-none d-md-block">
        <Image
          src={process.env.PUBLIC_URL + "/assets/images/skill.png"}
          fluid
        />
      </Col>
    </Row>
  );
}

export default Skills;
