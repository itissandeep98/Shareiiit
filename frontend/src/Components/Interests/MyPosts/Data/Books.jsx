import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row, Spinner } from "reactstrap";
import { fetchMyBooks } from "../../../../Store/ActionCreators/books";
import MyPostCard from "../MyPostCard";

function Books() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.user?.books);
  const [cards, setCards] = useState(books ?? []);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(fetchMyBooks()).then((res) => {
      setCards(res);
      setLoading(false);
    });
  }, [dispatch]);

  return (
    <Container fluid>
      {loading && (
        <div className="text-muted text-center">
          <Spinner /> Fetching new data
        </div>
      )}
      <Row>
        {cards && cards.length > 0 ? (
          cards.map((card) => (
            <Col md={6} lg={4} className="my-2" key={Math.random()}>
              <MyPostCard {...card} />
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
