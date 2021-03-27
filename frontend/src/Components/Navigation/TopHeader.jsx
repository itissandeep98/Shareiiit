import { useState } from "react";
import { useDispatch } from "react-redux";
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
import { Image } from "semantic-ui-react";
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
      <Navbar dark expand="md" className="p-0">
        <Container>
          <NavbarToggler onClick={toggleNav} />
          <Collapse isOpen={isNavOpen} navbar className="p-0">
            <Nav navbar>
              <NavItem>
                <NavLink className="nav-link p-3 cust_link" to="/home">
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link p-3 cust_link" to="/feed">
                  Feed
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link p-3 cust_link" to="/profile">
                  Profile
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link p-3" to="#" onClick={logout}>
                  Logout
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
