import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardMedia, Tooltip } from "@mui/material";
import moment from "moment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./style.scss";
import { useState } from "react";
import classNames from "classnames";
import { addVote } from "../../Store/ActionCreators/vote";
import { useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
function TechCard(props) {
	const {
		id,
		title,
		description,
		created_by,
		created_at,
		is_request,
		skill,
		upvote_count,
		vote_log,
	} = props;
	const [num_upvotes, setNum_upvotes] = useState(upvote_count);

	const [endorse, setEndorse] = useState(vote_log.upvoted_flag);
	const [save, setSave] = useState(vote_log.saved_flag);
	const [dismiss, setDismiss] = useState(vote_log.dismiss_flag);

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
		} else if (option == 3) {
			data.dismiss_flag = !dismiss;
			setDismiss(!dismiss);
		}

		dispatch(addVote({ id, data }));
	};

	return (
		<Card className=" border border-info d-flex card_hover justify-content-between h-100">
			<CardActionArea>
				<div className="d-flex justify-content-between flex-column">
					<CardContent>
						<div onClick={() => history.push(`/skill/${id}`)}>
							<Typography variant="h5">{skill?.label}</Typography>
						</div>
						<Typography variant="overline" color="textSecondary">
							<NavLink to={`/${created_by.username}`}>
								{created_by.name ? created_by.name : created_by.username}
							</NavLink>
						</Typography>
						<div onClick={() => history.push(`/skill/${id}`)}>
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
						<Tooltip title="Dismiss" placement="top">
							<IconButton
								onClick={() => Vote(3)}
								className={classNames({ "text-danger": dismiss })}
							>
								<CloseIcon />
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
