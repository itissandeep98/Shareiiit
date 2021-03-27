import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Col, Container, Row, Spinner } from "reactstrap";
import { Search } from "semantic-ui-react";
import { fetchBooks } from "../../store/ActionCreators/books";
import { fetchGroups } from "../../store/ActionCreators/groups";
import PostCards from "../Cards/PostCards";
import FilterBar from "../Navigation/Filter/FilterBar";
import CatDropdown from "../Navigation/Filter/CatDropdown";

function Posts(props) {
  const [cards, setCards] = useState([]);
  const [category, setCategory] = useState("All");

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    if (category === "Books" || category === "All") {
      dispatch(fetchBooks()).then((res) => {
        setCards(props.books);
        setLoading(false);
      });
    } else if (category === "Groups") {
      dispatch(fetchGroups()).then((res) => {
        setCards(props.groups);
        setLoading(false);
      });
    } else {
      setCards({});
      setLoading(false);
    }
  }, [dispatch, category]);

  return (
    <Container>
      <Row>
        <Col>
          <br />
          <FilterBar
            category={category}
            changeCategory={(cat) => setCategory(cat)}
          />
          <br />
          {loading && (
            <p className="text-muted text-center">
              <Spinner /> Fetching new data
            </p>
          )}
          <Row className="justify-content-center">
            {cards?.data && cards?.data?.length > 0 ? (
              cards.data?.map((book) => (
                <Col xs={12} md={6} lg={4} className="my-2">
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
  groups: state.groups,
  books: state.books,
});

export default connect(mapStateToProps)(Posts);
