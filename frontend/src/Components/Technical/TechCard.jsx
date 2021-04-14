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

function TechCard() {
  return (
    <Card>
      <CardActionArea>
        <CardHeader
          avatar={<Avatar>RSP</Avatar>}
          title=" Lorem ipsum dolor sit amet"
          subheader="Sandeep"
        />
        <CardMedia
          image={process.env.PUBLIC_URL + "/assets/images/iiitd2.png"}
        />
        <CardContent>
          <Typography
            variant="body2"
            color="textSecondary"
            className="text-justify"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea
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
