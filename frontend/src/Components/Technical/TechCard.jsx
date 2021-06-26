import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { CardActionArea, CardMedia } from "@material-ui/core";
import moment from "moment";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./style.scss";

function TechCard(props) {
  const {
    id,
    title,
    description,
    created_by,
    created_at,
    is_request,
    skill,
    upvotes,
  } = props;
  const history = useHistory();

  return (
    <Card className=" border border-info d-flex card_hover justify-content-between h-100">
      <CardActionArea>
        <div className="d-flex justify-content-between flex-column">
          <CardContent>
            <div onClick={() => history.push(`/tech/${id}`)}>
              <Typography variant="h4">{skill?.name}</Typography>
              <Typography variant="h5">{title}</Typography>
            </div>
            <Typography variant="overline" color="textSecondary">
              <NavLink to={`/${created_by}`}> {created_by}</NavLink>
            </Typography>
            <div onClick={() => history.push(`/tech/${id}`)}>
              <Typography variant="body2">{description}</Typography>
              <small className="text-muted text-center">
                Posted {moment(created_at).fromNow()}
              </small>
            </div>
          </CardContent>
          <div className="d-flex flex-row">
            <IconButton>
              <BookmarkBorderIcon />
            </IconButton>
            <IconButton>
              <FavoriteBorderIcon />
            </IconButton>
          </div>
        </div>
      </CardActionArea>
      <CardMedia
        className="float-right w-50"
        image={process.env.PUBLIC_URL + "/assets/images/skill.svg"}
      />
    </Card>
  );
}

export default TechCard;
