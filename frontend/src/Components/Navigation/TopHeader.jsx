import { Component, useState } from "react";
import { connect } from "react-redux";
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
import { Icon, Image } from "semantic-ui-react";

function TopHeader() {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
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
                  <span className="fa fa-user-circle fa-lg" /> Profile
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

const mapDispatchToProps = () => ({});

const mapStateToProps = () => ({});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TopHeader)
);
