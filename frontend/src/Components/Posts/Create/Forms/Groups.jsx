import { Button, TextField } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createGroupPost,
  fetchGroups,
} from "../../../../Store/ActionCreators/groups";

function Groups(props) {
  const dispatch = useDispatch();
  const [state, setState] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: state.title,
      description: state.description,
      size: state.size,
    };
    props.toggle();
    dispatch(createGroupPost(data)).then(() => {
      dispatch(fetchGroups());
    });
  };
  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <form>
      <TextField
        label=" Team Name"
        fullWidth
        variant="outlined"
        required
        value={state.title}
        name="title"
        onChange={onChange}
      />
      <TextField
        label="Team Size"
        className=" mt-3"
        fullWidth
        variant="outlined"
        required
        name="size"
        value={state.size}
        onChange={onChange}
      />
      <TextField
        label="Description"
        className=" mt-3"
        fullWidth
        variant="outlined"
        required
        multiline
        rows={4}
        name="description"
        value={state.description}
        onChange={onChange}
      />
      <Button
        variant="outlined"
        className="mt-3 float-right"
        startIcon={<CheckIcon />}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </form>
  );
}

export default Groups;
