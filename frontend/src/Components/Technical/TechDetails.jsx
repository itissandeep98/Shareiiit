import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IconButton, Tooltip } from '@mui/material';
import classNames from 'classnames';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import { Icon, Image, Rating } from 'semantic-ui-react';
import { fetchPostDetails } from '../../Store/ActionCreators/post';
import { addVote } from '../../Store/ActionCreators/vote';
import Meta from '../Meta';
import Messages from '../Posts/Messages/Messages';

function TechDetails(props) {
	const id = props.match.params.id;
	const [details, setDetails] = useState({});
	const dispatch = useDispatch();
	const [num_upvotes, setNum_upvotes] = useState(null);
	const [endorse, setEndorse] = useState(false);
	const [save, setSave] = useState(false);

	useEffect(() => {
		dispatch(fetchPostDetails({ id, category: 'skill' })).then(res => {
			setDetails(res);
			setNum_upvotes(res?.upvote_count);
			setEndorse(res?.vote_log?.upvoted_flag);
			setSave(res?.vote_log?.saved_flag);
		});
	}, [dispatch]);

	const username = useSelector(state => state.user?.osadetails?.username);

	const Vote = option => {
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
		<Container className="shadow p-3 mt-4">
			{details === undefined && (
				<h3 className="text-danger text-center">
					<Icon name="ban" /> This post has been either been deleted or it
					doesn't exists
				</h3>
			)}
			{details && (
				<>
					<Meta
						head={`${details?.skill?.label} by ${details?.created_by?.username} | ShareIIITD`}
					/>
					<Row>
						<Col>
							<div className="text-center p-2  d-flex flex-column">
								<Image
									src={process.env.PUBLIC_URL + '/assets/images/skill.svg'}
									fluid
								/>
								<div className="d-flex flex-row justify-content-center">
									<Tooltip title="Endorse" placement="top">
										<IconButton
											onClick={() => Vote(1)}
											className={classNames({ 'text-danger': endorse })}>
											<FavoriteBorderIcon />
											<small> {num_upvotes > 0 && num_upvotes}</small>
										</IconButton>
									</Tooltip>
									<Tooltip title="Save" placement="top">
										<IconButton
											onClick={() => Vote(2)}
											className={classNames({ 'text-info': save })}>
											<BookmarkBorderIcon />
										</IconButton>
									</Tooltip>
								</div>
							</div>
						</Col>
						<Col xs={8}>
							<Row>
								<Col>
									<h1 className="text-capitalize">{details?.skill?.label}</h1>
									<br />
									<Rating
										rating={details?.skill?.rating}
										icon="star"
										maxRating={5}
										size="huge"
										clearable
									/>
									<p className="text-justify">{details?.description}</p>
									<br />
								</Col>
							</Row>
							<Row>
								<Col className="text-muted">
									<small>
										<Icon name="user" />
										Posted by{' '}
										<NavLink to={`/${details?.created_by?.username}`}>
											{details?.created_by?.name
												? details?.created_by?.name
												: details?.created_by?.username}
										</NavLink>
									</small>
									<br />
									<small>
										<Icon name="time" />
										{moment(details?.created_at).fromNow()}
									</small>
								</Col>
							</Row>
						</Col>
					</Row>
				</>
			)}

			{username && details?.created_by && (
				<Row className="mt-5">
					<Col>
						<hr />
						<h2>
							<Icon name="chat" /> Messages
						</h2>
						<Messages
							id={id}
							recipient={username}
							creator={details?.created_by}
						/>
					</Col>
				</Row>
			)}
		</Container>
	);
}

export default TechDetails;
