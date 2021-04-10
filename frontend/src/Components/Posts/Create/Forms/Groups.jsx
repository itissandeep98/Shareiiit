import { Button, TextField } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";

function Groups() {
  return (
    <form>
      <TextField
        label=" Team Name"
        className="w-100"
        variant="outlined"
        required
      />
      <TextField
        label="Team Size"
        type="number"
        className="w-100 mt-3"
        variant="outlined"
        required
      />
      <TextField
        label="Description"
        multiline
        className="w-100 mt-3"
        variant="outlined"
        required
        rows={4}
      />
      <Button
        variant="contained"
        className="mt-3 float-right rounded-pill "
        startIcon={<CheckIcon />}
      >
        Submit
      </Button>{" "}
    </form>
  );
}

export default Groups;
