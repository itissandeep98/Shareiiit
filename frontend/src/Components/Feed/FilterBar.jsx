import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import { searchBooks } from "../../Store/ActionCreators/books";

function FilterBar(props) {
  const { category, setCategory } = props;
  const [search, setSearch] = useState("");
  const categories = ["Books", "Groups", "Electronics", "Other"];
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
    </Container>
  );
}

export default FilterBar;
