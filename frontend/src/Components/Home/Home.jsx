import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import {
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import { Dropdown, Icon, Search } from "semantic-ui-react";
import { logoutAction } from "../../store/ActionCreators/auth";
import { fetchBooks } from "../../store/ActionCreators/books";
import PostCards from "../Posts/PostCards";

function Home(props) {
  const dispatch = useDispatch();
  const [category, setCategory] = useState("All");
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <Container>
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
          <Dropdown.Item onClick={() => setCategory("All")}>All</Dropdown.Item>
          <Dropdown.Item onClick={() => setCategory("Books")}>
            Books
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setCategory("Electronics")}>
            Electronic Items
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setCategory("Groups")}>
            Groups
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setCategory("Other")}>
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
        {props.books?.books?.map((book) => (
          <Col xs={4}>
            <PostCards {...book} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  books: state.books,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logoutAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
