import { useDispatch } from "react-redux";
import { Feed, Icon } from "semantic-ui-react";
import {
	fetchNotification,
	updateNotification,
} from "../../Store/ActionCreators/notification";
import { NavLink } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import IconButton from "@mui/material/IconButton";
import moment from "moment";

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
									{unread?.map((item) => (
										<SingleNotification {...item} />
									))}
								</>
							)}
							<h4>Read</h4>
							<hr />
							{read?.map((item) => (
								<SingleNotification {...item} />
							))}
						</>
					)}
				</Col>
			</Row>
		</Container>
	);
}

const SingleNotification = ({ id, post, read, text, timestamp }) => {
	const dispatch = useDispatch();

	const markRead = (e) => {
		e.preventDefault();
		dispatch(updateNotification(id)).then(() => {
			dispatch(fetchNotification());
		});
	};
	return (
		<Feed.Event>
			<Feed.Label>
				{!read && (
					<IconButton size="small" onClick={markRead}>
						<Icon name="check" />
					</IconButton>
				)}
			</Feed.Label>
			<Feed.Content className="text-break">
				<Feed.Summary>
					<NavLink to={`/posts/${post.id}`}>{text}</NavLink>
					<Feed.Date>{moment(timestamp).fromNow()}</Feed.Date>
				</Feed.Summary>
			</Feed.Content>
		</Feed.Event>
	);
};
