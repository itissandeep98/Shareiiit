import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Rating } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import {
  createSkillPost,
  fetchSkillList,
} from "../../../Store/ActionCreators/skill";

function AddSkill(props) {
  const { modal, toggle, userTags, setuserTags } = props;
  const [data, setData] = useState({});
  const [skillList, setSkillList] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSkillList()).then((res) => {
      setSkillList(res);
    });
  }, [dispatch]);
  const addSkill = () => {
    const body = {
      title: data.title,
      description: data.desc,
      is_request: data.checked,
      skill: {
        name: data.label,
        rating: data.rate,
      },
    };
    dispatch(createSkillPost(body));
    setuserTags([...userTags, { ...body }]);
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
            {skillList.map((tag) => (
              <MenuItem value={tag.name}>{tag.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Title"
          variant="outlined"
          className="mt-2"
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
