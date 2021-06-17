import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@material-ui/core";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import CheckIcon from "@material-ui/icons/Check";
import { useState } from "react";

function EditPostModal(props) {
  const { modal, setModal } = props;
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.description);
  const [author, setAuthor] = useState(props.book.author);
  const [checked, setChecked] = useState(props.is_request);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title,
      description: body,
      book: { author },
      is_request: checked,
    };
    setModal(!modal);
    //  dispatch(createBookPost(data))
  };
  return (
    <Modal isOpen={modal} toggle={() => setModal(!modal)} size="lg">
      <ModalHeader toggle={() => setModal(!modal)}>Edit Post</ModalHeader>
      <ModalBody>
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
            className="mt-3 float-right  "
            onClick={handleSubmit}
            startIcon={<CheckIcon />}
          >
            Update
          </Button>
        </form>
      </ModalBody>
    </Modal>
  );
}

export default EditPostModal;
