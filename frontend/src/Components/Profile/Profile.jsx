import { Col, Container, Row } from "reactstrap";
import { connect, useDispatch } from "react-redux";
import { Image } from "semantic-ui-react";
import { Chip, IconButton, List, ListItem } from "@material-ui/core";
import FaceIcon from "@material-ui/icons/Face";
import MessageIcon from "@material-ui/icons/Message";
import { fetchPeople } from "../../Store/ActionCreators/people";
import { useEffect } from "react";

function Profile(props) {
  const { user } = props.match.params;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPeople(user));
  }, [dispatch]);
  const { details } = props.people;

  const knowledge = ["React", "Django", "Firebase", "React Native"];

  return (
    <Container fluid className="p-3 bg-light h-100">
      <Container className="shadow my-3 py-4 rounded_lg bg-white align-items-center">
        <Row>
          <Col xs={12} md={2} className="d-none d-md-block">
            <Image src={process.env.PUBLIC_URL + "/assets/images/user.png"} />
          </Col>
          <Col>
            <h2 className="d-inline">
              {details?.username}
              <div className="d-inline ml-2 d-md-none">
                <Image
                  src={process.env.PUBLIC_URL + "/assets/images/user.png"}
                  avatar
                />
              </div>
            </h2>
            <IconButton className="float-right d-inline">
              <MessageIcon fontSize="large" />
            </IconButton>
            <hr />
            <List>
              <ListItem className="text-capitalize">
                {details?.first_name} {details?.last_name}
              </ListItem>
            </List>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <h3>Knows About</h3>
            {knowledge.map((term) => (
              <Chip
                label={term}
                className="m-1 "
                icon={<FaceIcon />}
                key={Math.random()}
              />
            ))}
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  people: state.people,
});

export default connect(mapStateToProps)(Profile);