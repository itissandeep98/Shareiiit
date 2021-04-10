import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import { fetchVotedPosts } from "../../Store/ActionCreators/post";

function Saved(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    const data = {
      category: "book",
      choice: "save",
    };
    dispatch(fetchVotedPosts(data));
  }, [dispatch]);
  return (
    <Container fluid className="p-3 bg-light h-100">
      <Container>
        <Row className="shadow my-3 py-4 rounded_lg bg-white align-items-center">
          <Col>
            <h1>Saved Posts</h1>
            <hr />
            <h3 className="text-muted"> Nothing to show here</h3>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Saved;
