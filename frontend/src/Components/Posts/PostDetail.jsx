import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, NavLink, Row } from "reactstrap";
import { Image, Placeholder } from "semantic-ui-react";
import { fetchPostDetails } from "../../Store/ActionCreators/post";
import Messages from "./Messages/Messages";

function PostDetail(props) {
  const id = props.match.params.postId;
  const dispatch = useDispatch();
  const [details, setDetails] = useState({});
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
      <Row>
        <Col>
          {loading ? (
            <Placeholder style={{ height: 150, width: 150 }}>
              <Placeholder.Image />
            </Placeholder>
          ) : (
            <Image
              src={process.env.PUBLIC_URL + "/assets/images/book.png"}
              size="small"
            />
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
              <h2 className="text-capitalize text-center">{details.title}</h2>
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
          <Messages id={id} recipient={username} creator={details.created_by} />
        </Col>
      </Row>
    </Container>
  );
}

export default PostDetail;
