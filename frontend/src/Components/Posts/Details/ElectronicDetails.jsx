import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import { Icon } from 'semantic-ui-react';
import { fetchPostDetails } from '../../../Store/ActionCreators/post';
import { addVote } from '../../../Store/ActionCreators/vote';
import CustomImage from '../../../Utils/CustomImage';
import Meta from '../../Meta';
import Reaction from '../Cards/Reaction';
import Messages from '../Messages/Messages';

function ElectronicDetails(props) {
	const id = props.match.params.postId;
	const dispatch = useDispatch();
	const [details, setDetails] = useState(null);
	const [num_upvotes, setNum_upvotes] = useState(null);
	const [liked, setLiked] = useState(null);
	const [imgErr, setImgErr] = useState(false);
	const [saved, setSaved] = useState(null);
	const [dismiss, setDismiss] = useState(null);
	const username = useSelector(state => state.user?.osadetails?.username);
	useEffect(() => {
		dispatch(fetchPostDetails({ id, category: 'electronic' })).then(res => {
			setDetails(res);
			setNum_upvotes(res?.upvote_count);
			setLiked(res?.vote_log?.upvoted_flag);
			setSaved(res?.vote_log?.saved_flag);
			setDismiss(res?.vote_log?.dismiss_flag);
		});
	}, [dispatch]);

	const Vote = option => {
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
		<Container className="shadow p-3 my-4">
			{details === undefined && (
				<h3 className="text-danger text-center">
					<Icon name="ban" /> This post has been either been deleted or it
					doesn't exists
				</h3>
			)}
			{details && (
				<>
					<Meta head={`${details.title} | ShareIIIT`} />
					<Row>
						<Col className="d-flex align-items-center">
							<div className="text-center p-2  d-flex flex-column">
								<CustomImage
									src={
										!imgErr
											? details.image ??
											  process.env.PUBLIC_URL + '/assets/images/electronic.svg'
											: process.env.PUBLIC_URL + '/assets/images/electronic.svg'
									}
									onError={e => setImgErr(true)}
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
						</Col>
						<Col xs={8}>
							<Row>
								<Col>
									<h1 className="text-capitalize">{details.title}</h1>

									<br />
									<p className="text-justify">{details.description}</p>
									<br />
								</Col>
							</Row>
							<Row>
								<Col className="text-muted">
									<small>
										<Icon name="user" />
										Posted by{' '}
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

export default ElectronicDetails;
