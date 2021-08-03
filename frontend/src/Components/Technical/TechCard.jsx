import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { CardActionArea, CardMedia, Tooltip } from "@material-ui/core";
import moment from "moment";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./style.scss";
import { useState } from "react";
import classNames from "classnames";
import { addVote } from "../../Store/ActionCreators/post";
import { useDispatch } from "react-redux";

function TechCard(props) {
  const {
    id,
    title,
    description,
    created_by,
    created_at,
    is_request,
    skill,
    vote_count_log,
    vote_log,
  } = props;
  const [num_upvotes, setNum_upvotes] = useState(vote_count_log.upvote_count);

  const [endorse, setEndorse] = useState(vote_log.upvoted_flag);
  const [save, setSave] = useState(vote_log.saved_flag);
  const history = useHistory();
  const dispatch = useDispatch();

  const Vote = (option) => {
    let data = {};
    if (option == 1) {
      if (endorse) {
        setNum_upvotes(num_upvotes - 1);
      } else {
        setNum_upvotes(num_upvotes + 1);
      }

      data.upvoted_flag = !endorse;
      setEndorse(!endorse);
    } else if (option == 2) {
      data.saved_flag = !save;
      setSave(!save);
    }

    dispatch(addVote({ id, data }));
  };

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
            <Tooltip title="Endorse" placement="top">
              <IconButton
                onClick={() => Vote(1)}
                className={classNames({ "text-danger": endorse })}
              >
                <FavoriteBorderIcon />
                <small> {num_upvotes > 0 && num_upvotes}</small>
              </IconButton>
            </Tooltip>
            <Tooltip title="Save" placement="top">
              <IconButton
                onClick={() => Vote(2)}
                className={classNames({ "text-info": save })}
              >
                <BookmarkBorderIcon />
              </IconButton>
            </Tooltip>
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
