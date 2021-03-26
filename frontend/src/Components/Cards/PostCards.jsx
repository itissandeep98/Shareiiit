import { Col, Container, Row } from "reactstrap";
import { Button, Card, Icon, Image } from "semantic-ui-react";
import classNames from "classnames";
import { useState } from "react";

function PostCards(props) {
  const {
    id,
    body,
    book,
    category,
    created_by,
    is_request,
    title,
    votes,
  } = props;
  const [liked, setLiked] = useState(false);
  const [dismiss, setDismiss] = useState(false);
  const [message, setMessage] = useState(false);
  return (
    <Container className="shadow bg-white pt-4 rounded_lg border-info border mt-3 h-100 d-flex justify-content-between flex-column">
      <Row className="text-center">
        <Col>
          <Row>
            <Col>
              <Image
                src={process.env.PUBLIC_URL + "/assets/images/book.png"}
                size="small"
              />
            </Col>
            <Col xs={9}>
              <h3 className="text-capitalize">{title}</h3>
              <small className="text-muted float-right"> - {created_by}</small>
            </Col>
          </Row>
          <Row className="mt-1">
            <Col className="text-justify">{body}</Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <hr />
          <div className="d-flex justify-content-around mb-3 w-100">
            <Icon
              name="star outline"
              className={classNames({ "text-info": liked })}
              onClick={() => setLiked(!liked)}
              style={{ cursor: "pointer" }}
              size="large"
            />
            <Icon
              name="envelope"
              className={classNames({ "text-info": message })}
              onClick={() => setMessage(!message)}
              style={{ cursor: "pointer" }}
              size="large"
            />
            <Icon
              name="times"
              className={classNames({ "text-danger": dismiss })}
              onClick={() => setDismiss(!dismiss)}
              style={{ cursor: "pointer" }}
              size="large"
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default PostCards;
