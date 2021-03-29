import { Col, Container, Row } from "reactstrap";
import { Button, Form, Image, Input } from "semantic-ui-react";

function Profile() {
  const details = {
    name: "Sandeep",
    email: "Sandeep18363@iiitd.ac.in",
    batch: "2022",
  };
  return (
    <Container fluid className="p-3 bg-light h-100">
      <Container>
        <Row className="shadow my-3 py-3 rounded_lg bg-white align-items-center">
          <Col xs={2}>
            <Image src={process.env.PUBLIC_URL + "/assets/images/user.png"} />
          </Col>
          <Col>
            <h2>Edit Basic Details</h2>
            <hr />
            <Form>
              <Form.Field>
                <label>Username</label>
                <Input value={details.name} disabled />
              </Form.Field>
              <Form.Field>
                <label>Email</label>
                <Input type="email" value={details.email} disabled />
              </Form.Field>
              <Form.Field>
                <label>Batch</label>
                <Input type="number" value={details.batch} disabled />
              </Form.Field>
              <Button floated="right">Update</Button>
            </Form>
          </Col>
        </Row>
        <Row className="shadow my-3 py-3 rounded_lg bg-white align-items-center">
          <Col>
            <h2>Update Password</h2>
            <hr />
            <Form>
              <Form.Field>
                <label>Old Password</label>
                <Input type="password" />
              </Form.Field>
              <Form.Field>
                <label>New Password</label>
                <Input type="password" />
              </Form.Field>
              <Form.Field>
                <label>Confirm Password</label>
                <Input type="password" />
              </Form.Field>
              <Button floated="right">Update</Button>
            </Form>
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

export default Profile;
