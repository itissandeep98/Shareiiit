import { Col, Container, Row, Spinner } from "reactstrap";
import Meta from "../../Meta";
import PostCard from "../../Posts/PostCard";

function Upvoted(props) {
  const { cards, loading } = props;

  return (
    <Container fluid className="py-4 h-100 rounded_lg bg-white">
      <Meta head="Upvoted Posts | ShareIIITD" />
      <Row>
        <Col>
          <h1>Upvoted Posts</h1>
          <hr />
          {loading && (
            <div className="text-muted text-center">
              <Spinner /> Fetching new data
            </div>
          )}
          <Row>
            {cards === undefined || cards?.length == 0 ? (
              <Col>
                <h3 className="text-muted"> Nothing to show here</h3>
              </Col>
            ) : (
              <>
                {cards.map((card, index) => (
                  <Col xs={12} md={6} lg={4} className="my-3" key={index}>
                    <PostCard {...card} />
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

export default Upvoted;
