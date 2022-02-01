import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Comment, Label, Menu, Tab } from "semantic-ui-react";
import { fetchMessages } from "../../../Store/ActionCreators/message";
import "./style.css";
import UserMessage from "./UserMessage";

function Messages(props) {
	const { id, recipient, creator } = props;
	const dispatch = useDispatch();
	const [users, setUsers] = useState([]);

	const updateData = () => {
		dispatch(fetchMessages({ post: id })).then((res) => {
			if (creator != recipient && res.length === 0) {
				setUsers([{ user2: recipient, messages: [] }]);
			} else {
				setUsers(res);
			}
		});
	};
	useEffect(() => {
		const interval = setInterval(() => {
			updateData();
		}, 7000);
		return () => clearInterval(interval);
	}, []);

	if (users.length == 0) {
		return <p className="text-center text-muted">No Messages Here !!</p>;
	}

	if (users.length == 1) {
		return (
			<div className=" p-3 shadow-sm rounded-lg">
				<Comment.Group>
					<UserMessage
						messages={users[0]?.messages}
						postid={id}
						convid={users[0]?.id}
					/>
				</Comment.Group>
			</div>
		);
	}

	const panes = users?.map((user, i) => ({
		menuItem: (
			<Menu.Item key={i}>
				{user.user2}
				{user?.unread > 0 && <Label>{user.unread}</Label>}
			</Menu.Item>
		),
		render: () => (
			<Tab.Pane attached={false} key={i}>
				<Comment.Group>
					<UserMessage messages={user?.messages} postid={id} convid={user.id} />
				</Comment.Group>
			</Tab.Pane>
		),
	}));

	return <Tab menu={{ pointing: true }} panes={panes} />;
}

export default Messages;
