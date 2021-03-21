import { Dropdown, Form, Input, TextArea } from "semantic-ui-react";

function Groups() {
  return (
    <Form>
      <Form.Field required className="row">
        <label className="col-1"> Team Name </label>
        <Input fluid className="col" />
      </Form.Field>
      <Form.Field required className="row">
        <label className="col-1">Team Size</label>
        <Input fluid className="col" type="number" />
      </Form.Field>
      <Form.Field required className="row">
        <label className="col-1">Description </label>
        <TextArea fluid className="col" />
      </Form.Field>
      <Form.Field required className="row">
        <label className="col-1">Course </label>
        <Dropdown
          fluid
          placeholder="Select all the associated courses"
          search
          selection
          className="col"
        />
      </Form.Field>
    </Form>
  );
}

export default Groups;
