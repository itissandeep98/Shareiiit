import { Col, Container, Row } from "reactstrap";
import { Tab } from "semantic-ui-react";
import Meta from "../../Meta";
import Books from "./Data/Books";
import Electronics from "./Data/Electronics";
import Groups from "./Data/Groups";
import Other from "./Data/Other";

function MyPosts(props) {
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
    <Container fluid className="p-3 bg-light h-100">
      <Meta head="My Posts | ShareIIITD" />
      <Container>
        <Row className="shadow my-3 py-4 rounded_lg bg-white align-items-center">
          <Col>
            <h1>View Your Posts</h1>
            <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default MyPosts;
