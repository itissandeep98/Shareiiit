import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { CardActionArea, CardMedia } from "@material-ui/core";
import moment from "moment";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import TelegramIcon from "@material-ui/icons/Telegram";

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
      <div>
        <CardContent>
          <Typography variant="subtitle1" color="textSecondary">
            {created_by}
          </Typography>
          <Typography>{description}</Typography>
          <small className="text-muted text-center">
            Posted {moment(created_at).fromNow()}
          </small>
        </CardContent>
        <div className="d-flex flex-row">
          <IconButton>
            <ThumbUpIcon />
          </IconButton>
          <IconButton>
            <FavoriteBorderIcon />
          </IconButton>
          <IconButton>
            <TelegramIcon fontSize="large" />
          </IconButton>
        </div>
      </div>
      <CardMedia
        className="float-right w-50"
        image={process.env.PUBLIC_URL + "/assets/images/skill.svg"}
      />
    </Card>
  );
}

export default TechCard;
