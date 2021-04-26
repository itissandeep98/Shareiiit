import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createBookPost,
  fetchBooks,
} from "../../../../Store/ActionCreators/books";
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";

function Books(props) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [checked, setChecked] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title,
      description: body,
      book: { author },
      is_request: checked,
    };
    props.toggle();
    dispatch(createBookPost(data)).then(() => {
      dispatch(fetchBooks());
    });
  };

  return (
    <form>
      <TextField
        label="Name"
        variant="outlined"
        required
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Author"
        className=" mt-3"
        fullWidth
        variant="outlined"
        required
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <TextField
        label="Description"
        className=" mt-3"
        fullWidth
        variant="outlined"
        required
        multiline
        rows={4}
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={(e) => setChecked(!checked)}
            name="checkedB"
            color="primary"
          />
        }
        label="This is a Request Post"
      />
      <Button
        variant="outlined"
        className="mt-3 float-right"
        disabled={!title || !author || !body}
        onClick={handleSubmit}
        startIcon={<CheckIcon />}
      >
        Submit
      </Button>
    </form>
  );
}

export default Books;
