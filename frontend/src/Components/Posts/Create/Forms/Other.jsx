import { Button, TextField } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";

function Other() {
  return (
    <form>
      <TextField label="Name" className="w-100" variant="outlined" required />
      <TextField
        label="Author"
        className="w-100 mt-3"
        variant="outlined"
        required
      />
      <TextField
        label="Description"
        className="w-100 mt-3"
        variant="outlined"
        required
        multiline
        rows={4}
      />
      <Button
        variant="contained"
        className="mt-3 float-right rounded-pill "
        startIcon={<CheckIcon />}
      >
        Submit
      </Button>
    </form>
  );
}

export default Other;
