import {
  Button,
  FormControl,
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
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const addSkill = () => {
    const body = {
      description: data.desc,
      is_request: data.checked,
      skill: {
        skill_item: {
          name: data.label,
        },
        rating: data.rate,
      },
    };
    dispatch(createSkillPost(body));
    setuserTags([...userTags, { ...data }]);
    setData({});
    toggle();
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add Skill</ModalHeader>
      <ModalBody>
        <FormControl variant="outlined" fullWidth className="mt-2">
          <InputLabel>Tag</InputLabel>
          <Select
            label="Tag"
            value={data.label}
            onChange={(e) => setData({ ...data, label: e.target.value })}
          >
            {TagList.map((tag) => (
              <MenuItem value={tag}>{tag}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Short Description"
          variant="outlined"
          className="mt-2"
          value={data.desc}
          multiline
          fullWidth
          onChange={(e) => setData({ ...data, desc: e.target.value })}
        />

        <p className="mt-2 d-flex justify-content-around">
          <InputLabel>Rate Your Skill</InputLabel>
          <Rating
            rating={data.rate}
            icon="star"
            maxRating={5}
            size="huge"
            clearable
            onRate={(e, { rating, maxRating }) =>
              setData({ ...data, rate: rating })
            }
          />
        </p>
      </ModalBody>
      <ModalFooter className="d-flex justify-content-between">
        <Button variant="outlined" className="float-right " onClick={addSkill}>
          Add Skill
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default AddSkill;
