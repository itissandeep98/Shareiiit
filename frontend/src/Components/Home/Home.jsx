import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Col, Container, Row, Spinner } from "reactstrap";
import { Dropdown, Icon, Search } from "semantic-ui-react";
import { logoutAction } from "../../store/ActionCreators/auth";
import { fetchBooks } from "../../store/ActionCreators/books";
import { fetchGroups } from "../../store/ActionCreators/groups";
import PostCards from "../Posts/PostCards";

function Home(props) {
  const dispatch = useDispatch();
  const [category, setCategory] = useState("All");
  const [cards, setCards] = useState([]);
  const changeCategory = (cat) => {
    setCategory(cat);
    if (cat === "Books") {
      dispatch(fetchBooks());
      setCards(props.books);
    } else if (cat === "Groups") {
      dispatch(fetchGroups());
      setCards(props.groups);
    }
  };

  return (
    <Container className="mb-4">
      <br />

      <Dropdown
        item
        direction="right"
        icon={<Icon name="chevron down" />}
        text={category}
        className="border p-2 rounded_lg shadow"
        simple
      >
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => changeCategory("All")}>
            All
          </Dropdown.Item>
          <Dropdown.Item onClick={() => changeCategory("Books")}>
            Books
          </Dropdown.Item>
          <Dropdown.Item onClick={() => changeCategory("Electronics")}>
            Electronic Items
          </Dropdown.Item>
          <Dropdown.Item onClick={() => changeCategory("Groups")}>
            Groups
          </Dropdown.Item>
          <Dropdown.Item onClick={() => changeCategory("Other")}>
            Other
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <h2 className="shadow text-center p-3 bg-light rounded_lg">{category}</h2>
      <Search
        category
        placeholder="Search for some post"
        maxLength={50}
        size="small"
        input={{ fluid: true }}
      />
      <br />
      <Row className="justify-content-center">
        {cards.isLoading && (
          <p className="text-muted">
            <Spinner /> Fetching new data
          </p>
        )}
        {cards?.data ? (
          cards.data?.map((book) => (
            <Col md={6} lg={4} className="my-2">
              <PostCards {...book} />
            </Col>
          ))
        ) : (
          <p className="text-muted"> No Posts yet</p>
        )}
      </Row>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  groups: state.groups,
  books: state.books,
});

export default connect(mapStateToProps)(Home);
