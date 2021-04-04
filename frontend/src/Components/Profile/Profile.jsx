import { Button, TextField } from "@material-ui/core";
import { Col, Container, Row } from "reactstrap";
import { Image } from "semantic-ui-react";
import BookmarksIcon from "@material-ui/icons/Bookmarks";
import GridOnIcon from "@material-ui/icons/GridOn";
import { withRouter } from "react-router";

function Profile(props) {
  const details = {
    name: "Sandeep",
    email: "Sandeep18363@iiitd.ac.in",
    batch: "2022",
    role: "Student",
  };
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
              onClick={() => props.history.push("/myposts")}
            >
              My Posts
            </Button>
            <Button
              variant="outlined"
              className="float-right rounded-pill "
              startIcon={<BookmarksIcon />}
              size="large"
              onClick={() => props.history.push("/saved")}
            >
              Saved Post
            </Button>
          </Col>
        </Row>
        <Row className="shadow my-3 py-4 rounded_lg bg-white align-items-center">
          <Col xs={2}>
            <Image src={process.env.PUBLIC_URL + "/assets/images/user.png"} />
          </Col>
          <Col>
            <h2>Edit Basic Details</h2>
            <hr />
            <form>
              <TextField
                label="Name"
                className="w-100"
                variant="outlined"
                required
                value={details.name}
                disabled
              />
              <TextField
                label="Email"
                className="w-100 mt-3"
                variant="outlined"
                required
                value={details.email}
                disabled
              />
              <TextField
                label="Batch"
                type="number"
                className="w-100 mt-3"
                variant="outlined"
                required
                value={details.batch}
                disabled
              />
              <TextField
                label="Role"
                className="w-100 mt-3"
                variant="outlined"
                required
                value={details.role}
                disabled
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
            <h2>Update Password</h2>
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
          <Col xs={2}>
            <Image
              src={process.env.PUBLIC_URL + "/assets/images/password.png"}
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default withRouter(Profile);
