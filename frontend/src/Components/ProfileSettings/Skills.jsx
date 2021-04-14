import {
  Button,
  Chip,
  FormControl,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@material-ui/core";
import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import { Image } from "semantic-ui-react";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { TagList } from "../../Config/Tags";

function Skills() {
  const [currentTag, setCurrentTag] = useState("");
  const [description, setDescription] = useState("");
  const [userTags, setuserTags] = useState([]);
  const handleDelete = (i) => {
    setuserTags([...userTags.slice(0, i), ...userTags.slice(i + 1)]);
  };
  const addSkill = () => {
    setuserTags([...userTags, { label: currentTag, desc: description }]);
    setCurrentTag("");
    setDescription("");
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
        <Row>
          <Col xs={3}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Tag</InputLabel>
              <Select
                label="Tag"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
              >
                {TagList.map((tag) => (
                  <MenuItem value={tag}>{tag}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Col>
          <Col xs={6}>
            <TextField
              label="Short Description"
              variant="outlined"
              value={description}
              multiline
              fullWidth
              onChange={(e) => setDescription(e.target.value)}
            />
          </Col>
          <Col xs={2}>
            <Button
              variant="outlined"
              className="float-right "
              onClick={addSkill}
            >
              Add Skill
            </Button>
          </Col>
        </Row>
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
