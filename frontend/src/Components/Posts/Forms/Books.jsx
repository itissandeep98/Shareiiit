import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Dropdown, Form, Input, TextArea } from "semantic-ui-react";
import { createBookPost } from "../../../store/ActionCreators/books";

function Books() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title,
      body,
      book: { author },
    };
    console.log(data);
    dispatch(createBookPost(data));
  };

  return (
    <Form>
      <Form.Field required className="row">
        <label className="col-1">Name </label>
        <Input
          fluid
          className="col"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Field>
      <Form.Field required className="row">
        <label className="col-1">Author </label>
        <Input
          fluid
          className="col"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </Form.Field>
      <Form.Field required className="row">
        <label className="col-1">Description </label>
        <TextArea
          fluid
          className="col"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </Form.Field>
      {/* <Form.Field required className="row">
        <label className="col-1">Course </label>
        <Dropdown
          fluid
          placeholder="Select all the associated courses"
          search
          selection
          className="col"
        />
      </Form.Field> */}
      <Button floated="right" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}

export default Books;
