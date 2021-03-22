import { Col, Container, Row } from "reactstrap";
import { Button, Form, Input } from "semantic-ui-react";

function Profile() {
  return (
    <Container fluid className="p-3 bg-light h-100">
      <Container>
        <Row className="shadow my-3 py-3 rounded_lg bg-white">
          <Col>
            <h2>Edit Basic Details</h2>
            <Form>
              <Form.Field>
                <label>Username</label>
                <Input />
              </Form.Field>
              <Button floated="right">Update</Button>
            </Form>
          </Col>
        </Row>
        <Row className="shadow my-3 py-3 rounded_lg bg-white">
          <Col>
            <h2>Update Password</h2>
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
        </Row>
      </Container>
    </Container>
  );
}

export default Profile;
