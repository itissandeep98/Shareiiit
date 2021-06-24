import { Tooltip } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, NavLink, Row } from "reactstrap";
import { Icon, Image, Label, Placeholder } from "semantic-ui-react";
import { fetchPostDetails } from "../../Store/ActionCreators/post";
import Meta from "../Meta";
import Messages from "./Messages/Messages";

function PostDetail(props) {
  const id = props.match.params.postId;
  const dispatch = useDispatch();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const username = useSelector((state) => state.user?.details?.username);
  useEffect(() => {
    dispatch(fetchPostDetails(id)).then((res) => {
      setDetails(res);
      setLoading(false);
    });
  }, [dispatch]);
  return (
    <Container className="shadow p-3 mt-4">
      {details && (
        <>
          <Meta head={`${details.title} | ShareIIITD`} />
          <Row>
            <Col>
              {loading ? (
                <Placeholder style={{ height: 150, width: 150 }}>
                  <Placeholder.Image />
                </Placeholder>
              ) : (
                <div className="text-center p-2  d-flex flex-column">
                  <Image
                    src={process.env.PUBLIC_URL + "/assets/images/book.png"}
                    fluid
                  />

                  <Tooltip
                    title={
                      details.is_price_negotiable
                        ? "Price is negotiable"
                        : "Fixed Price"
                    }
                  >
                    <Label size="large">
                      <Icon name="rupee" />
                      {details.price}
                    </Label>
                  </Tooltip>
                </div>
              )}
            </Col>
            <Col xs={9}>
              {loading ? (
                <Placeholder fluid>
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder>
              ) : (
                <>
                  <h2 className="text-capitalize text-center">
                    {details.title}
                  </h2>
                  <h4>By {details?.book?.author}</h4>
                  <p className="text-muted float-right">
                    <NavLink to={`/${details.created_by}`}>
                      - {details.created_by}
                    </NavLink>
                  </p>
                  <Row className="mt-5">
                    <Col className="text-justify">{details.description}</Col>
                  </Row>
                </>
              )}
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <Messages
                id={id}
                recipient={username}
                creator={details.created_by}
              />
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}

export default PostDetail;
