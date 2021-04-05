import { Button, TextField } from "@material-ui/core";
import { Col, Container, Row } from "reactstrap";
import { Image } from "semantic-ui-react";
import BookmarksIcon from "@material-ui/icons/Bookmarks";
import GridOnIcon from "@material-ui/icons/GridOn";
import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { fetchUser } from "../../Store/ActionCreators/people";
import { useHistory } from "react-router-dom";

function Profile(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  const history = useHistory();

  const details = props.user?.details;
  return (
    <Container fluid className="p-3 bg-light h-100">
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
              onClick={() => history.push("/profile/saved")}
            >
              Saved Post
            </Button>
          </Col>
        </Row>
        <Row className="shadow my-3 py-4 rounded_lg bg-white align-items-center">
          <Col xs={12} md={2} className="d-none d-md-block">
            <Image src={process.env.PUBLIC_URL + "/assets/images/user.png"} />
          </Col>
          <Col>
            <h2>
              Edit Basic Details{" "}
              <div className="d-inline ml-2 d-md-none">
                <Image
                  src={process.env.PUBLIC_URL + "/assets/images/user.png"}
                  avatar
                />
              </div>
            </h2>
            <hr />
            <form>
              <TextField
                label="Name"
                className="w-100"
                variant="outlined"
                required
                value={details?.name}
              />
              <TextField
                label="Email"
                className="w-100 mt-3"
                variant="outlined"
                required
                value={details?.email}
              />
              <TextField
                label="Batch"
                type="number"
                className="w-100 mt-3"
                variant="outlined"
                required
                value={details?.batch}
              />
              <TextField
                label="Role"
                className="w-100 mt-3"
                variant="outlined"
                required
                value={details?.role}
              />
              <Button
                variant="outlined"
                className="mt-3 float-right rounded-pill bg-info text-white"
              >
                Update
              </Button>
            </form>
          </Col>
        </Row>
        <Row className="shadow my-3 py-4 rounded_lg bg-white align-items-center">
          <Col>
            <h2>
              Update Password
              <div className="d-inline ml-2 d-md-none">
                <Image
                  src={process.env.PUBLIC_URL + "/assets/images/password.png"}
                  avatar
                />
              </div>
            </h2>
            <hr />
            <form>
              <TextField
                label="Old Password"
                type="password"
                className="w-100 mt-3"
                variant="outlined"
                required
              />
              <TextField
                label="New Password"
                type="password"
                className="w-100 mt-3"
                variant="outlined"
                required
              />
              <TextField
                label="Confirm Password"
                type="password"
                className="w-100 mt-3"
                variant="outlined"
                required
              />
              <Button
                variant="outlined"
                className="mt-3 float-right rounded-pill bg-info text-white"
              >
                Update
              </Button>
            </form>
          </Col>
          <Col xs={12} md={2} className="d-none d-md-block">
            <Image
              src={process.env.PUBLIC_URL + "/assets/images/password.png"}
              fluid
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Profile);
