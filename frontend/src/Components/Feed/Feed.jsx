import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Col, Container, Row, Spinner } from "reactstrap";
import { fetchBooks } from "../../Store/ActionCreators/books";
import { fetchGroups } from "../../Store/ActionCreators/groups";
import PostCards from "../Posts/PostCard";
import FilterBar from "../Navigation/Filter/FilterBar";
import AddIcon from "@material-ui/icons/Add";
import Create from "../Posts/Create/Create";

function Posts(props) {
  const [cards, setCards] = useState(props?.posts?.books ?? []);
  const [category, setCategory] = useState("All");
  const [modal, setModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    if (category === "Books" || category === "All") {
      dispatch(fetchBooks()).then((res) => {
        setCards(props.posts?.books);
        setLoading(false);
      });
    } else if (category === "Groups") {
      dispatch(fetchGroups()).then((res) => {
        setCards(props.posts?.groups);
        setLoading(false);
      });
    } else {
      setCards([]);
      setLoading(false);
    }
  }, [dispatch, category]);

  return (
    <Container className="my-3 py-3 pb-5 rounded_lg bg-white  shadow">
      <Row>
        <Col>
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
            category={category}
            changeCategory={(cat) => setCategory(cat)}
          />
          <br />
          {loading && (
            <div className="text-muted text-center">
              <Spinner /> Fetching new data
            </div>
          )}
          <Row className="justify-content-center">
            {cards && cards?.length > 0 ? (
              cards?.map((book) => (
                <Col xs={12} md={6} lg={4} className="my-3" key={Math.random()}>
                  <PostCards {...book} />
                </Col>
              ))
            ) : (
              <p className="text-muted"> No Posts yet</p>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  posts: state.posts,
});

export default connect(mapStateToProps)(Posts);
