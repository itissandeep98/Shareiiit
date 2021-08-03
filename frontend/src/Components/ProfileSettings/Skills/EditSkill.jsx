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

function EditSkill(props) {
  const { modal, toggle, details } = props;
  //   console.log(details);
  const [data, setData] = useState({ ...details });
  const [skillList, setSkillList] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSkillList()).then((res) => {
      setSkillList(res);
    });
  }, [dispatch]);

  const addSkill = (e) => {
    console.log(data);
    // const body = {
    //   title: data.title,
    //   description: data.desc,
    //   skill: {
    //     name: data.label,
    //     rating: data.rate,
    //   },
    // };
    // dispatch(createSkillPost(body));
    // setData({});
    // toggle();
  };

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const changeSkill = (name, value) => {
    const skill = { ...data.skill, [name]: value };
    setData({ ...data, skill });
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add Skill</ModalHeader>
      <ModalBody>
        <FormControl variant="outlined" fullWidth className="mt-2">
          <InputLabel>Tag</InputLabel>
          <Select
            label="Tag"
            value={data.skill.name}
            onChange={(e) => changeSkill("name", e.target.value)}
          >
            {skillList.map((tag, i) => (
              <MenuItem key={i} value={tag.name}>
                {tag.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Title"
          variant="outlined"
          className="mt-2"
          value={data.title}
          name="title"
          multiline
          fullWidth
          onChange={onChange}
        />
        <TextField
          label="Short Description"
          variant="outlined"
          name="description"
          className="mt-2"
          value={data.description}
          multiline
          fullWidth
          onChange={onChange}
        />

        <p className="mt-2 d-flex justify-content-around">
          <InputLabel>Rate Your Skill</InputLabel>
          <Rating
            rating={data.skill.rating}
            icon="star"
            maxRating={5}
            size="huge"
            clearable
            onRate={(e, { rating, maxRating }) => changeSkill("rating", rating)}
          />
        </p>
      </ModalBody>
      <ModalFooter>
        <Button variant="outlined" className="float-right " onClick={addSkill}>
          Update
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default EditSkill;