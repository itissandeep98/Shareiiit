import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Dropdown, Feed, Icon } from "semantic-ui-react";
import {
	fetchNotification,
	updateNotification,
} from "../../Store/ActionCreators/notification";
import { NavLink } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import classNames from "classnames";
import IconButton from "@mui/material/IconButton";

function Notification(props) {
	const { notification } = props;
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchNotification());
	}, []);

	const unread = notification?.filter((noti) => !noti.read);
	const read = notification?.filter((noti) => noti.read);

	return (
		<Dropdown
			item
			direction="left"
			icon={
				<Icon.Group size="large">
					<Icon name="bell" />
					{unread?.length > 0 && (
						<Icon corner="top left" name="circle" color="red" />
					)}
				</Icon.Group>
			}
			simple
		>
			<Dropdown.Menu>
				<Container className="text-dark py-2">
					<Row>
						<Col>
							<h3>Notifications</h3>
							<hr />
							{unread?.length > 0 && (
								<>
									<h4>Unread</h4>
									{unread?.map((item) => (
										<SingleNotification {...item} />
									))}
									<hr />
								</>
							)}

							{read?.map((item) => (
								<SingleNotification {...item} />
							))}
						</Col>
					</Row>
				</Container>
			</Dropdown.Menu>
		</Dropdown>
	);
}

const SingleNotification = ({ id, post, read, text, timestamp }) => {
	const dispatch = useDispatch();

	const markRead = (e) => {
		e.preventDefault();
		dispatch(updateNotification(id));
	};
	return (
		<Feed.Event>
			<Feed.Content>
				<Feed.Extra className={classNames({ "bg-light": !read }, "p-1")}>
					<NavLink to={`/posts/${id}`}>
						<Icon name="external" />
					</NavLink>
					{text}
					{!read && (
						<IconButton size="small" onClick={markRead}>
							<Icon name="check" />
						</IconButton>
					)}
				</Feed.Extra>
			</Feed.Content>
		</Feed.Event>
	);
};
const mapStateToProps = (state) => ({
	notification: state.notification.details,
});

export default connect(mapStateToProps)(Notification);
