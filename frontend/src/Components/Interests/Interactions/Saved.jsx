import { Col, Container, Row, Spinner } from "reactstrap";
import PostCard from "../../Posts/PostCard";

function Saved(props) {
  const { cards, loading } = props;
  return (
    <Container fluid className="py-4 h-100 rounded_lg bg-white">
      <Row>
        <Col>
          <h1>Saved Posts</h1>
          <hr />
          {loading && (
            <div className="text-muted text-center">
              <Spinner /> Fetching new data
            </div>
          )}
          <Row>
            {cards?.length == 0 ? (
              <Col>
                <h3 className="text-muted"> Nothing to show here</h3>
              </Col>
            ) : (
              <>
                {cards.map((card) => (
                  <Col
                    xs={12}
                    md={6}
                    lg={4}
                    className="my-3"
                    key={Math.random()}
                  >
                    <PostCard {...card.post} />
                  </Col>
                ))}
              </>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Saved;
