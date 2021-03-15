import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from "reactstrap";
import { Dropdown, Tab } from "semantic-ui-react";
import Books from "./Forms/Books";
import Electronics from "./Forms/Electronics";
import Groups from "./Forms/Groups";
import Other from "./Forms/Other";

function Create() {
  const panes = [
    {
      menuItem: "Books",
      render: () => (
        <Tab.Pane attached={false} className="p-0 border-0">
          <Books />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Electronic Items",
      render: () => (
        <Tab.Pane attached={false} className="p-0 border-0">
          <Electronics />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Group",
      render: () => (
        <Tab.Pane attached={false} className="p-0 border-0">
          <Groups />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Other Items",
      render: () => (
        <Tab.Pane attached={false} className="p-0 border-0">
          <Other />
        </Tab.Pane>
      ),
    },
  ];
  return (
    <Container>
      <Row>
        <Col className="shadow my-3 py-3">
          <h1> Create New Posting</h1>
          <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
        </Col>
      </Row>
    </Container>
  );
}

export default Create;
