import { Col, Container, Row } from "reactstrap";
import { Tab } from "semantic-ui-react";
import Books from "./Data/Books";
import Electronics from "./Data/Electronics";
import Groups from "./Data/Groups";
import Other from "./Data/Other";

function Postings() {
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
          <h1>View Your Postings</h1>
          <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
        </Col>
      </Row>
    </Container>
  );
}

export default Postings;
