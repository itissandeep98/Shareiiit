import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import { Col, Container, Row } from "reactstrap";

function Tags() {
  const tags = [
    "React",
    "React Native",
    "Firebase",
    "Angular",
    "Django",
    "Flask",
  ];

  return (
    <Container className="bg-white p-2 rounded_lg">
      <Row>
        <Col>
          <Typography variant="h3">Tags</Typography>
          <List component="nav" aria-label="main mailbox folders">
            {tags.map((tag) => (
              <ListItem button>
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
