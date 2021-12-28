import { useDispatch } from "react-redux";
import { Icon } from "semantic-ui-react";
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
									<hr />
									<ul>
										{unread?.map((item) => (
											<SingleNotification {...item} />
										))}
									</ul>
								</>
							)}
							{read?.length > 0 && (
								<>
									<h4>Read</h4>
									<hr />
									<ul>
										{read?.map((item) => (
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

const SingleNotification = ({ id, post, read, text, timestamp }) => {
	const dispatch = useDispatch();

	const markRead = (e) => {
		e.preventDefault();
		dispatch(updateNotification(id)).then(() => {
			dispatch(fetchNotification());
		});
	};
	return (
		<li>
			<Row>
				<Col className="text-break text-wrap">
					<NavLink to={`/posts/${post.id}`}>{text}</NavLink>
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
