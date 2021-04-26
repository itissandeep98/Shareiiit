import {
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@material-ui/core";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import { Col, Container, Row } from "reactstrap";
import SearchIcon from "@material-ui/icons/Search";
import { TagList } from "../../Config/Tags";
import { useState } from "react";

function Tags(props) {
  const { tags, modifyTags } = props;
  const [query, setQuery] = useState("");
  return (
    <Container className="bg-white p-2 rounded_lg">
      <Row>
        <Col>
          <Typography variant="h3">Skills</Typography>
          <TextField
            label="Filter Tags"
            value={query}
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <List component="nav" aria-label="main mailbox folders">
            {TagList.filter((tag) => tag.toLowerCase().includes(query)).map(
              (tag) => (
                <ListItem
                  button
                  selected={tags?.includes(tag)}
                  key={Math.random()}
                  onClick={() => modifyTags(tag)}
                >
                  <ListItemIcon>
                    <LocalOfferIcon />
                  </ListItemIcon>
                  <ListItemText primary={tag} />
                </ListItem>
              )
            )}
          </List>
        </Col>
      </Row>
    </Container>
  );
}

export default Tags;
