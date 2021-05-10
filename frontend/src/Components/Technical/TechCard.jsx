import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { CardActionArea, CardMedia } from "@material-ui/core";
import moment from "moment";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import TelegramIcon from "@material-ui/icons/Telegram";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import { NavLink } from "react-router-dom";

function TechCard(props) {
  const {
    title,
    description,
    created_by,
    created_at,
    is_request,
    skill,
    upvotes,
  } = props;
  return (
    <Card className=" border border-info d-flex justify-content-between h-100">
      <CardActionArea>
        <div className="d-flex justify-content-between flex-column">
          <CardContent>
            <Typography variant="h5">{title}</Typography>
            <Typography variant="overline" color="textSecondary">
              <NavLink to={`/${created_by}`}> {created_by}</NavLink>
            </Typography>
            <Typography variant="body2">{description}</Typography>
            <small className="text-muted text-center">
              Posted {moment(created_at).fromNow()}
            </small>
          </CardContent>
          <div className="d-flex flex-row">
            <IconButton>
              <BookmarkBorderIcon />
            </IconButton>
            <IconButton>
              <FavoriteBorderIcon />
            </IconButton>
            <IconButton>
              <TelegramIcon fontSize="large" />
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
