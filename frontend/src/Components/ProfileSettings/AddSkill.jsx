import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Rating } from "semantic-ui-react";
import { TagList } from "../../Config/Tags";
import { useDispatch } from "react-redux";
import { createSkillPost } from "../../Store/ActionCreators/skill";

function AddSkill(props) {
  const { modal, toggle, userTags, setuserTags } = props;
  const [currentTag, setCurrentTag] = useState("");
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const addSkill = () => {
    const body = {
      title: data.title,
      description: data.desc,
      is_request: data.checked,
      skill: {
        skill_item: {
          name: currentTag,
        },
        rating: data.rate,
      },
    };
    dispatch(createSkillPost(body));
    setuserTags([
      ...userTags,
      { label: currentTag, title: data.title, desc: data.desc },
    ]);
    setCurrentTag("");
    setData({});
    toggle();
  };
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add Skill</ModalHeader>
      <ModalBody>
        <TextField
          label="Title"
          variant="outlined"
          value={data.title}
          multiline
          fullWidth
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
        <TextField
          label="Short Description"
          variant="outlined"
          className="mt-2"
          value={data.desc}
          multiline
          fullWidth
          onChange={(e) => setData({ ...data, desc: e.target.value })}
        />
        <FormControl variant="outlined" fullWidth className="mt-2">
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

        <p className="mt-2 d-flex justify-content-around">
          <InputLabel>Rate Your Skill</InputLabel>
          <Rating
            rating={data.rate}
            icon="star"
            maxRating={5}
            size="huge"
            onRate={(e) => setData({ ...data, rate: e.target.checked })}
          />
        </p>
      </ModalBody>
      <ModalFooter className="d-flex justify-content-between">
        <FormControlLabel
          control={
            <Checkbox
              checked={data.checked}
              onChange={(e) => setData({ ...data, checked: e.target.checked })}
              color="primary"
            />
          }
          label="This is a Request Post"
        />
        <Button variant="outlined" className="float-right " onClick={addSkill}>
          Add Skill
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default AddSkill;
