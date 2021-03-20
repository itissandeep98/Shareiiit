import { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import {
  Col,
  Collapse,
  Container,
  Nav,
  Navbar,
  NavbarToggler,
  NavItem,
  Row,
} from "reactstrap";
import "./style.css";
import { Dropdown, Icon, Image } from "semantic-ui-react";
import { logoutAction } from "../../store/ActionCreators/auth";

function TopHeader() {
  const dispatch = useDispatch();
  const [isNavOpen, setIsNavOpen] = useState(true);
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  const logout = (e) => {
    e.preventDefault();
    dispatch(logoutAction());
  };
  return (
    <>
      <Container>
        <Row>
          <Col className="float-left">
            <Image
              src={process.env.PUBLIC_URL + "/assets/images/iiitd2.png"}
              alt="IIIT-Delhi"
            />
          </Col>
        </Row>
      </Container>
      <Navbar dark expand="md">
        <Container>
          <NavbarToggler onClick={toggleNav} />
          <Collapse isOpen={isNavOpen} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink className="nav-link" to="/home">
                  <span className="fa fa-home fa-lg" /> Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/posts">
                  <span className="fa fa-list fa-lg" /> My Posts
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/create">
                  <span className="fa fa-plus fa-lg" /> Create Post
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/profile">
                  <Dropdown
                    item
                    direction="right"
                    icon={<Icon name="user circle outline" size="large" />}
                    text="Profile"
                    simple
                  >
                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <Icon name="cogs" />
                        Settings
                      </Dropdown.Item>
                      <Dropdown.Item onClick={logout}>
                        <Icon name="sign out" />
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default withRouter(TopHeader);
