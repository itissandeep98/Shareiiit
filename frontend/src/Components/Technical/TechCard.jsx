import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import { CardActionArea, CardMedia } from "@material-ui/core";
import moment from "moment";

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
    <Card>
      <CardActionArea>
        <CardHeader avatar={<Avatar>RSP</Avatar>} title={title} />
        <CardContent>
          <small className="text-muted text-center">
            {created_by} Posted {moment(created_at).fromNow()}
          </small>
        </CardContent>
        <CardContent>
          <Typography
            variant="body2"
            color="textSecondary"
            className="text-justify"
          >
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default TechCard;
