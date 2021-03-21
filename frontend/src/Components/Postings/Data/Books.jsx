import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import { fetchMyBooks } from "../../../store/ActionCreators/books";
import PostCards from "../../Cards/PostCards";

function Books() {
  const dispatch = useDispatch();
  const [cards, setCards] = useState([]);
  useEffect(() => {
    dispatch(fetchMyBooks()).then((res) => setCards(res));
  }, [dispatch]);
  return (
    <Container fluid>
      <Row className="justify-content-center">
        {cards && cards.length > 0 ? (
          cards.map((card) => (
            <Col md={6} lg={4} className="my-2">
              <PostCards {...card} />
            </Col>
          ))
        ) : (
          <p className="text-muted p-3">No Cards Here !!!</p>
        )}
      </Row>
    </Container>
  );
}

export default Books;
