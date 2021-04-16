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

function Tags() {
  return (
    <Container className="bg-white p-2 rounded_lg">
      <Row>
        <Col>
          <Typography variant="h3">Skills</Typography>
          <TextField
            label="Filter Tags"
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
            {TagList.map((tag) => (
              <ListItem button key={Math.random()}>
                <ListItemIcon>
                  <LocalOfferIcon />
                </ListItemIcon>
                <ListItemText primary={tag} />
              </ListItem>
            ))}
          </List>
        </Col>
      </Row>
    </Container>
  );
}

export default Tags;
