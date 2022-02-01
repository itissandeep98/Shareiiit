import { Col, Container, Row } from "reactstrap";
import { Icon, Image } from "semantic-ui-react";
import { Tooltip } from "@mui/material";

import { useState } from "react";
import { withRouter } from "react-router";
import { useDispatch } from "react-redux";
import { addVote } from "../../../Store/ActionCreators/vote";
import { NavLink } from "react-router-dom";
import moment from "moment";
import "../style.scss";
import Reaction from "./Reaction";
import ImagePopup from "../../../Utils/ImagePopup";

function BookCard(props) {
	let {
		id,
		description,
		book,
		category,
		image,
		created_by,
		created_at,
		is_request,
		title,
		upvote_count,
		vote_log,
	} = props;
	const [modal, setModal] = useState(false);
	const [num_upvotes, setNum_upvotes] = useState(upvote_count);
	const [liked, setLiked] = useState(vote_log.upvoted_flag);
	const [saved, setSaved] = useState(vote_log.saved_flag);
	const [dismiss, setDismiss] = useState(vote_log.dismiss_flag);
	const [imgErr, setImgErr] = useState(false);
	const dispatch = useDispatch();
	const Vote = (option) => {
		let data = {};
		if (option == 1) {
			if (liked) {
				setNum_upvotes(num_upvotes - 1);
			} else {
				setNum_upvotes(num_upvotes + 1);
			}
			data.upvoted_flag = !liked;
			setLiked(!liked);
		} else if (option == 2) {
			data.saved_flag = !saved;
			setSaved(!saved);
		} else if (option == 3) {
			data.dismiss_flag = !dismiss;
			setDismiss(!dismiss);
		}

		dispatch(addVote({ id, data }));
	};
	return (
		<>
			<ImagePopup
				image={image ?? process.env.PUBLIC_URL + "/assets/images/book.png"}
				open={modal}
				onClose={() => setModal(!modal)}
			/>
			<Container className="bg-white pt-3 rounded_lg border-info border mt-3 h-100 d-flex justify-content-between flex-column card_hover">
				<Row className=" h-100">
					<Col>
						<Row>
							<Col>
								<Image
									onClick={() => setModal(!modal)}
									src={
										!imgErr
											? image ??
											  process.env.PUBLIC_URL + "/assets/images/book.png"
											: process.env.PUBLIC_URL + "/assets/images/book.png"
									}
									onError={(e) => setImgErr(true)}
									size="small"
								/>
							</Col>
							<Col xs={9}>
								<h3
									className="text-capitalize"
									onClick={() => props.history.push(`/posts/book/${id}`)}
									style={{ cursor: "pointer" }}
								>
									{title}
								</h3>
								<small className="text-muted float-right">
									-{" "}
									<NavLink to={`/${created_by.username}`}>
										{created_by.name ? created_by.name : created_by.username}
									</NavLink>
								</small>
							</Col>
						</Row>
						<Row
							className="mt-1 btn p-0"
							onClick={() => props.history.push(`/posts/book/${id}`)}
						>
							<Col className="text-justify">{description}</Col>
						</Row>
					</Col>
				</Row>
				<Row className="d-flex justify-content-around">
					<small className="text-muted text-center">
						Posted {moment(created_at).fromNow()}
					</small>
					{is_request && (
						<Tooltip title="This is a Request Post" placement="top">
							<p>
								<Icon name="handshake" color="red" />
							</p>
						</Tooltip>
					)}
				</Row>
				<Reaction
					num_upvotes={num_upvotes}
					liked={liked}
					saved={saved}
					dismiss={dismiss}
					Vote={Vote}
				/>
			</Container>
		</>
	);
}

export default withRouter(BookCard);
