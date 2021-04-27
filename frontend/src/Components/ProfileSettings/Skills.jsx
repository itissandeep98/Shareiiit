import { Button, Chip, Tooltip } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { Image } from "semantic-ui-react";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import AddSkill from "./AddSkill";
import { useDispatch } from "react-redux";
import { fetchUserSkills } from "../../Store/ActionCreators/skill";

function Skills() {
  const [userTags, setuserTags] = useState([]);
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserSkills()).then((res) => {
      setuserTags(res ?? userTags);
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
              <Tooltip
                title={tag.desc}
                placement="top"
                key={Math.random()}
                className="mx-1 my-2"
              >
                <Chip
                  label={tag.label}
                  onDelete={() => handleDelete(i)}
                  deleteIcon={<HighlightOffIcon />}
                />
              </Tooltip>
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
