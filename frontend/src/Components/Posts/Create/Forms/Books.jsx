import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBookPost } from "../../../../Store/ActionCreators/books";
import { Button, TextField } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";

function Books() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title,
      description: body,
      book: { author },
    };
    dispatch(createBookPost(data));
  };

  return (
    <form>
      <TextField
        label="Name"
        className="w-100"
        variant="outlined"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Author"
        className="w-100 mt-3"
        variant="outlined"
        required
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <TextField
        label="Description"
        className="w-100 mt-3"
        variant="outlined"
        required
        multiline
        rows={4}
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <Button
        variant="contained"
        className="mt-3 float-right rounded-pill "
        onClick={handleSubmit}
        startIcon={<CheckIcon />}
      >
        Submit
      </Button>
    </form>
  );
}

export default Books;
