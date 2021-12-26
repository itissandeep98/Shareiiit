import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Dropdown, Icon } from "semantic-ui-react";
import { fetchNotification } from "../../Store/ActionCreators/notification";
import { NavLink } from "react-router-dom";
import Content from "./Content";

function Notification(props) {
	const { notification, page } = props;
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchNotification());
	}, []);

	const unread = notification?.filter((noti) => !noti.read);
	const read = notification?.filter((noti) => noti.read);

	return (
		<>
			{page ? (
				<Content notification={notification} read={read} unread={unread} />
			) : (
				<>
					<NavLink
						className="nav-link p-3 cust_link d-md-none"
						to="/notification"
					>
						Notifications
					</NavLink>
					<a className="nav-link p-3 d-none d-md-block">
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
						>
							<Dropdown.Menu>
								<Content
									notification={notification}
									read={read}
									unread={unread}
								/>
							</Dropdown.Menu>
						</Dropdown>
					</a>
				</>
			)}
		</>
	);
}

const mapStateToProps = (state) => ({
	notification: state.notification.details,
});

export default connect(mapStateToProps)(Notification);
