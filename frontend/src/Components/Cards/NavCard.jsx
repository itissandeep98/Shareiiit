import { NavLink } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { Icon, List } from "semantic-ui-react";

function NavCard(props) {
  const { active } = props;
  return (
    <Container className="sticky-top" style={{ zIndex: 0 }}>
      <Row className="shadow bg-white rounded_lg p-3 mt-5">
        <Col>
          <hr />
          <List link size="big">
            <List.Item active={active === "feed"}>
              <NavLink to="/feed">
                <Icon name="feed" />
                Posts
              </NavLink>
            </List.Item>
            <List.Item active={active === "create"}>
              <NavLink to="/create">
                <Icon name="add circle" />
                Create
              </NavLink>
            </List.Item>
            <List.Item active={active === "interest"}>
              <NavLink to="/interest">
                <Icon name="users" />
                Interested
              </NavLink>
            </List.Item>
            <List.Item active={active === "postings"}>
              <NavLink to="/postings">
                <Icon name="zip" />
                Postings
              </NavLink>
            </List.Item>
          </List>
          <hr />
        </Col>
      </Row>
    </Container>
  );
}

export default NavCard;
