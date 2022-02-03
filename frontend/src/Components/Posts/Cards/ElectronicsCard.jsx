import { Tooltip } from '@mui/material';
import moment from 'moment';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import { Icon } from 'semantic-ui-react';
import { addVote } from '../../../Store/ActionCreators/vote';
import CustomImage from '../../../Utils/CustomImage';
import '../style.scss';
import Reaction from './Reaction';

function ElectronicsCards(props) {
	let {
		id,
		description,
		category,
		image,
		created_by,
		created_at,
		is_request,
		title,
		upvote_count,
		vote_log,
	} = props;
	const [num_upvotes, setNum_upvotes] = useState(upvote_count);
	const [liked, setLiked] = useState(vote_log.upvoted_flag);
	const [saved, setSaved] = useState(vote_log.saved_flag);
	const [dismiss, setDismiss] = useState(vote_log.dismiss_flag);
	const [imgErr, setImgErr] = useState(false);
	const dispatch = useDispatch();
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
		<Container className="bg-white pt-3 rounded_lg border-info border mt-3 h-100 d-flex justify-content-between flex-column card_hover">
			<Row className=" h-100">
				<Col>
					<Row>
						<Col>
							<CustomImage
								src={
									!imgErr
										? image ??
										  process.env.PUBLIC_URL + '/assets/images/electronic.svg'
										: process.env.PUBLIC_URL + '/assets/images/electronic.svg'
								}
								onError={e => setImgErr(true)}
								size="small"
							/>
						</Col>
						<Col xs={9}>
							<NavLink to={`/posts/electronic/${id}`} className="text-dark">
								<h3 className="text-capitalize">{title}</h3>
							</NavLink>
							<small className="text-muted float-right">
								-{' '}
								<NavLink to={`/${created_by.username}`} className="creatorlink">
									{created_by.name ? created_by.name : created_by.username}
								</NavLink>
							</small>
						</Col>
					</Row>
					<Row className="mt-1 ">
						<NavLink to={`/posts/electronic/${id}`} className="text-dark">
							<Col className="text-justify">{description}</Col>
						</NavLink>
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
	);
}

export default withRouter(ElectronicsCards);
