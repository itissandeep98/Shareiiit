import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import { Icon, Image, Label, Placeholder } from "semantic-ui-react";
import { addVote } from "../../../Store/ActionCreators/vote";
import Meta from "../../Meta";
import moment from "moment";
import Messages from "../Messages/Messages";
import { NavLink } from "react-router-dom";
import { fetchPostDetails } from "../../../Store/ActionCreators/post";
import Reaction from "../Cards/Reaction";
import ImagePopup from "../../../Utils/ImagePopup";

function PostDetail(props) {
	const id = props.match.params.postId;
	const [modal, setModal] = useState(false);
	const dispatch = useDispatch();
	const [details, setDetails] = useState({});
	const [loading, setLoading] = useState(true);
	const [num_upvotes, setNum_upvotes] = useState(null);
	const [liked, setLiked] = useState(null);
	const [saved, setSaved] = useState(null);
	const [dismiss, setDismiss] = useState(null);
	const [imgErr, setImgErr] = useState(false);
	const username = useSelector((state) => state.user?.osadetails?.username);
	useEffect(() => {
		dispatch(fetchPostDetails({ id, category: "book" })).then((res) => {
			setDetails(res);
			setLoading(false);
			setNum_upvotes(res?.upvote_count);
			setLiked(res?.vote_log?.upvoted_flag);
			setSaved(res?.vote_log?.saved_flag);
			setDismiss(res?.vote_log?.dismiss_flag);
		});
	}, [dispatch]);

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
				image={details.image}
				open={modal}
				onClose={() => setModal(!modal)}
			/>
			<Container className="shadow p-3 my-4">
				{details && (
					<>
						<Meta head={`${details.title} | ShareIIITD`} />
						<Row>
							<Col className="d-flex align-items-center">
								{loading ? (
									<Placeholder style={{ height: 150, width: 150 }}>
										<Placeholder.Image />
									</Placeholder>
								) : (
									<div className="text-center p-2  d-flex flex-column">
										<Image
											onClick={() => setModal(!modal)}
											src={
												!imgErr
													? details.image ??
													  process.env.PUBLIC_URL + "/assets/images/book.png"
													: process.env.PUBLIC_URL + "/assets/images/book.png"
											}
											onError={(e) => setImgErr(true)}
											fluid
										/>
										<Reaction
											num_upvotes={num_upvotes}
											liked={liked}
											saved={saved}
											dismiss={dismiss}
											Vote={Vote}
										/>
									</div>
								)}
							</Col>
							<Col xs={8}>
								{loading ? (
									<Placeholder fluid>
										<Placeholder.Line />
										<Placeholder.Line />
										<Placeholder.Line />
										<Placeholder.Line />
										<Placeholder.Line />
									</Placeholder>
								) : (
									<Row>
										<Col>
											<h1 className="text-capitalize">{details.title}</h1>
											<p className="text-capitalize text-muted">
												By {details?.book?.author}
											</p>
											<br />
											<p className="text-justify">{details.description}</p>
											<br />
										</Col>
									</Row>
								)}
								<Row>
									{details.price > 0 && (
										<Col className="align-items-center d-flex" md={3}>
											<Tooltip
												title={
													details.is_price_negotiable
														? "Price is negotiable"
														: "Fixed Price"
												}
											>
												<p>
													<Label size="large" color="teal">
														Price <Icon name="rupee" className="ml-1" />
														{details.price}
													</Label>
												</p>
											</Tooltip>
										</Col>
									)}
									<Col className="text-muted">
										<small>
											<Icon name="user" />
											Posted by{" "}
											<NavLink to={`/${details.created_by?.username}`}>
												{details.created_by?.name
													? details.created_by?.name
													: details.created_by?.username}
											</NavLink>
										</small>
										<br />
										<small>
											<Icon name="time" />
											{moment(details.created_at).fromNow()}
										</small>
									</Col>
								</Row>
							</Col>
						</Row>

						{username && details && (
							<Row className="mt-5">
								<Col>
									<hr />
									<h2>
										<Icon name="chat" /> Messages
									</h2>
									<Messages
										id={id}
										recipient={username}
										creator={details.created_by}
									/>
								</Col>
							</Row>
						)}
					</>
				)}
			</Container>
		</>
	);
}

export default PostDetail;
