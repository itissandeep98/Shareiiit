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
import ImageUploader from "./ImageUploader";

function Books(props) {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    checked: false,
    is_price_negotiable: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: state.title,
      description: state.description,
      book: { author: state.author },
      is_request: state.checked,
      is_price_negotiable: state.is_price_negotiable,
      price: state.price,
    };
    props.toggle();
    dispatch(createBookPost(data)).then(() => {
      dispatch(fetchBooks());
    });
  };
  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <form>
      <TextField
        label="Name"
        variant="outlined"
        required
        fullWidth
        value={state.title}
        name="title"
        onChange={onChange}
      />
      <TextField
        label="Author"
        className=" mt-3"
        fullWidth
        variant="outlined"
        required
        name="author"
        value={state.author}
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
      <TextField
        type="number"
        label="Price"
        className=" mt-3"
        fullWidth
        variant="outlined"
        name="price"
        value={state.price}
        onChange={onChange}
      />
      <ImageUploader
        image={state.image}
        setImage={(val) => setState({ ...state, image: val })}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={state.checked}
            onChange={(e) => setState({ ...state, checked: !state.checked })}
            color="primary"
          />
        }
        label="This is a Request Post"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={state.is_price_negotiable}
            onChange={(e) =>
              setState({
                ...state,
                is_price_negotiable: !state.is_price_negotiable,
              })
            }
            color="primary"
          />
        }
        label="Negotiable Price"
      />
      <Button
        variant="outlined"
        className="mt-3 float-right"
        disabled={!state.title || !state.author || !state.description}
        onClick={handleSubmit}
        startIcon={<CheckIcon />}
      >
        Submit
      </Button>
    </form>
  );
}

export default Books;
