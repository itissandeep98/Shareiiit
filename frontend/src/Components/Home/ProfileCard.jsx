import { Col, Container, Row } from "reactstrap";
import { Image, List } from "semantic-ui-react";

function ProfileCard() {
  const details = [
    {
      type: "Requests Made",
      value: 10,
    },
    {
      type: "Requests Accepted",
      value: 25,
    },
    {
      type: "Most Active Category",
      value: "Books",
    },
  ];
  return (
    <Container className="shadow bg-white py-4 rounded_lg sticky-top mt-3">
      <Row>
        <Col className="justify-content-center d-flex">
          <Image
            src={process.env.PUBLIC_URL + "/assets/images/user.png"}
            size="tiny"
          />
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <p className="text-muted">Sandeep</p>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <h3>Summary</h3>
          <List>
            {details.map((det) => (
              <List.Item>
                <List.Header>{det.type}:</List.Header>
                <List.Description>{det.value}</List.Description>
              </List.Item>
            ))}
          </List>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfileCard;
