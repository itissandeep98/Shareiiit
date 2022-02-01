import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Dropdown, Icon } from "semantic-ui-react";
import {
	fetchNextNotification,
	fetchNotification,
} from "../../Store/ActionCreators/notification";
import { NavLink } from "react-router-dom";
import Content from "./Content";
import { Button } from "@mui/material";
import "./style.css";

function Notification(props) {
	const { notification, page, next } = props;
	const dispatch = useDispatch();
	const [moreLoading, setMoreLoading] = useState(false);
	useEffect(() => {
		const interval = setInterval(() => {
			dispatch(fetchNotification());
		}, 30000);
		return () => clearInterval(interval);
	}, []);

	const unread = notification?.filter((noti) => !noti.read);
	const read = notification?.filter((noti) => noti.read);

	const fetchMore = () => {
		setMoreLoading(true);
		dispatch(fetchNextNotification(next)).then((res) => {
			setMoreLoading(false);
		});
	};
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
							simple
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
					{next && (
						<Button
							variant="contained"
							size="small"
							disabled={moreLoading}
							onClick={fetchMore}
						>
							Show More <i className="fa fa-caret-down ml-2" />
						</Button>
					)}
				</>
			)}
		</>
	);
}

const mapStateToProps = (state) => ({
	notification: state.notification.details,
	next: state.notification.next,
});

export default connect(mapStateToProps)(Notification);
