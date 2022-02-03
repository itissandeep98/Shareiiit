import IconButton from '@mui/material/IconButton';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import { Icon } from 'semantic-ui-react';
import {
	fetchNotification,
	updateNotification,
} from '../../Store/ActionCreators/notification';

export default function Content({ notification, unread, read }) {
	return (
		<Container className="text-dark py-2">
			<Row>
				<Col>
					{notification?.length === 0 ? (
						<small className="text-muted">
							There is no new notification for you
						</small>
					) : (
						<>
							<h3>Notifications</h3>
							<hr />
							{unread?.length > 0 && (
								<>
									<h4>Unread</h4>
									<hr />
									<ul className="notif-list">
										{unread?.map(item => (
											<SingleNotification {...item} />
										))}
									</ul>
								</>
							)}
							{read?.length > 0 && (
								<>
									<h4>Read</h4>
									<hr />
									<ul className="notif-list">
										{read?.map(item => (
											<SingleNotification {...item} />
										))}
									</ul>
								</>
							)}
						</>
					)}
				</Col>
			</Row>
		</Container>
	);
}

const SingleNotification = ({ id, post, type, read, text, timestamp }) => {
	const dispatch = useDispatch();

	const markRead = e => {
		e.preventDefault();
		dispatch(updateNotification(id)).then(() => {
			dispatch(fetchNotification());
		});
	};
	return (
		<li>
			<Row>
				<Col className="text-break text-wrap">
					{type === 'VOTE' && <Icon name="thumbs up" />}
					{type === 'MSG' && <Icon name="facebook messenger" />}
					{type === 'TAG' && <Icon name="tag" />}
					{type === 'FLW' && <Icon name="user" />}

					{post.category === 'skill' ? (
						<NavLink to={`/skill/${post.id}`}>{text}</NavLink>
					) : (
						<NavLink to={`/posts/${post.category}/${post.id}`}>{text}</NavLink>
					)}
					<br />
					<small>{moment(timestamp).fromNow()}</small>
				</Col>
				{!read && (
					<Col xs={2} className="">
						<IconButton size="small" onClick={markRead}>
							<Icon name="check" />
						</IconButton>
					</Col>
				)}
			</Row>
		</li>
	);
};
