import { Button } from "@material-ui/core";
import { Col, Container, Row } from "reactstrap";
import BookmarksIcon from "@material-ui/icons/Bookmarks";
import GridOnIcon from "@material-ui/icons/GridOn";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { fetchUser, updateUser } from "../../Store/ActionCreators/people";
import { useHistory } from "react-router-dom";
import BasicDetails from "./BasicDetails";
import Password from "./Password";
import Skills from "./Skills/Skills";
import Meta from "../Meta";

function Profile(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  const history = useHistory();

  const [details, setDetails] = useState(props.user?.details);

  const onChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const updateDetails = () => {
    const { id, ...data } = details;
    dispatch(updateUser(data));
  };
  return (
    <Container fluid className="p-3 bg-light h-100">
      <Meta head="Profile | ShareIIITD" />
      <Container>
        <Row>
          <Col className="d-flex justify-content-end">
            <Button
              variant="outlined"
              className="mr-2 rounded-pill "
              startIcon={<GridOnIcon />}
              size="large"
              onClick={() => history.push("/profile/myposts")}
            >
              My Posts
            </Button>
            <Button
              variant="outlined"
              className="float-right rounded-pill "
              startIcon={<BookmarksIcon />}
              size="large"
              onClick={() => history.push("/profile/myactivity")}
            >
              My Activity
            </Button>
          </Col>
        </Row>

        <BasicDetails
          updateDetails={updateDetails}
          onChange={onChange}
          details={details}
        />
        <Skills />
        <Password />
      </Container>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Profile);
