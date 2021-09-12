import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@material-ui/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Col, Container, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { searchAdvanced, searchBooks } from "../../Store/ActionCreators/search";

function FilterBar(props) {
  const { category, setCategory, sortby, setSortby } = props;
  const [search, setSearch] = useState("");
  const categories = ["Books", "Groups", "Electronics", "Other"];
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const onChange = (value) => {
    setSearch(value);
    dispatch(searchBooks({ search: value })).then((res) => {
      props.setResult(res);
    });
  };
  return (
    <Container fluid className=" p-3 bg-light">
      <Row>
        <Col xs={2}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((tag) => (
                <MenuItem value={tag}>{tag}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Col>
        <Col xs={2}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Sort by</InputLabel>
            <Select
              label="Category"
              value={sortby}
              onChange={(e) => setSortby(e.target.value)}
            >
              <MenuItem value="created_at">Most Recent</MenuItem>
              <MenuItem value="most_active">Most Upvoted</MenuItem>
            </Select>
          </FormControl>
        </Col>
        <Col>
          <TextField
            label="Search"
            variant="outlined"
            value={search}
            multiline
            fullWidth
            onChange={(e) => onChange(e.target.value)}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            className="float-right text-info"
            onClick={() => setModal(true)}
          >
            Advanced Search
          </Button>
          <AdvancedSearch
            open={modal}
            toggle={() => setModal(!modal)}
            setResult={props.setResult}
          />
        </Col>
      </Row>
    </Container>
  );
}

function AdvancedSearch(props) {
  const { open, toggle, setResult } = props;
  const dispatch = useDispatch();
  const [data, setData] = useState({
    title: "",
    description: "",
    username: "",
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSearch = () => {
    dispatch(searchAdvanced(data)).then((res) => setResult(res));
  };
  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalHeader toggle={toggle}>Advanced Search</ModalHeader>
      <ModalBody>
        <form>
          <TextField
            label="Title"
            fullWidth
            variant="outlined"
            name="title"
            onChange={handleChange}
          />
          <TextField
            label="Description"
            fullWidth
            variant="outlined"
            className="mt-2"
            name="description"
            onChange={handleChange}
          />
          <TextField
            label="Username"
            fullWidth
            variant="outlined"
            className="mt-2"
            name="username"
            onChange={handleChange}
          />
          <Button
            variant="outlined"
            className="mt-2 float-right"
            onClick={handleSearch}
          >
            Search
          </Button>
        </form>
      </ModalBody>
    </Modal>
  );
}
export default FilterBar;
