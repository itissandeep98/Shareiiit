import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Col, Container, Row, Spinner } from "reactstrap";
import { fetchBooks } from "../../Store/ActionCreators/books";
import { fetchGroups } from "../../Store/ActionCreators/groups";
import PostCards from "../Posts/PostCard";
import FilterBar from "./FilterBar";
import AddIcon from "@material-ui/icons/Add";
import Create from "../Posts/Create/Create";
import Meta from "../Meta";

function Posts(props) {
  const [cards, setCards] = useState([]);
  const [category, setCategory] = useState("Books");
  const [sortby, setSortby] = useState("created_at");
  const [modal, setModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    if (category === "Books") {
      dispatch(fetchBooks()).then((res) => {
        setCards(res);
        setLoading(false);
      });
    } else if (category === "Groups") {
      dispatch(fetchGroups()).then((res) => {
        setCards(res);
        setLoading(false);
      });
    } else {
      setCards([]);
      setLoading(false);
    }
  }, [dispatch, category]);

  return (
    <Container fluid className="p-3 bg-light h-100">
      <Meta head="Feed | ShareIIITD" />
      <Row className="justify-content-center">
        <Col md={10}>
          <Container
            fluid
            className="shadow my-3 py-4 rounded_lg bg-white align-items-center"
          >
            <Row>
              <Col className="text-center">
                <Create
                  modal={modal}
                  setModal={setModal}
                  trigger={
                    <Button
                      variant="outlined"
                      className="mt-3"
                      startIcon={<AddIcon />}
                      size="large"
                      onClick={() => setModal(!modal)}
                    >
                      Create New Post
                    </Button>
                  }
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <br />
                <FilterBar
                  setResult={setCards}
                  category={category}
                  setCategory={setCategory}
                  sortby={sortby}
                  setSortby={setSortby}
                />
                <br />
                <Row className="justify-content-center">
                  {cards && cards?.length > 0 ? (
                    cards?.map((book) => (
                      <Col xs={12} md={6} lg={4} className="my-3" key={book.id}>
                        <PostCards {...book} />
                      </Col>
                    ))
                  ) : (
                    <p className="text-muted"> No Posts yet</p>
                  )}
                </Row>
                {loading && (
                  <div className="text-muted text-center">
                    <Spinner /> Fetching new data
                  </div>
                )}
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  posts: state.posts,
});

export default connect(mapStateToProps)(Posts);
