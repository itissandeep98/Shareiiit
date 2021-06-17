import { TextField } from "@material-ui/core";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Comment, Label, Menu, Tab } from "semantic-ui-react";
import {
  createMessage,
  fetchMessages,
} from "../../../Store/ActionCreators/message";
import "./style.css";

function Messages(props) {
  const { id, recipient } = props;
  const [mess, setMess] = useState("");
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    dispatch(fetchMessages({ post: id })).then((res) => {
      if (res.filter((user) => user.user2 === recipient).length === 0) {
        setUsers([...res, { user2: recipient, messages: [] }]);
      } else {
        setUsers(res);
      }
    });
  }, [dispatch]);
  const onChange = (e) => {
    if (e.charCode === 13 && e.target.value !== "") {
      const data = {
        recipient: recipient,
        post: id,
        text: mess,
      };
      setMess("");
      dispatch(createMessage(data)).then(setUsers([...users]));
    } else {
      setMess(e.target.value);
    }
  };
  const panes = users?.map((user, i) => ({
    menuItem: (
      <Menu.Item key={i}>
        {user.user2}
        {user?.unread > 0 && <Label>{user.unread}</Label>}
      </Menu.Item>
    ),
    render: () => (
      <Tab.Pane attached={false}>
        <Comment.Group>
          <UserMessage
            messages={user?.messages}
            mess={mess}
            onChange={onChange}
          />
        </Comment.Group>
      </Tab.Pane>
    ),
  }));

  return <Tab menu={{ pointing: true }} panes={panes} />;
}

function UserMessage(props) {
  const { mess, onChange, messages } = props;
  return (
    <>
      {messages.map((message) => (
        <Comment key={Math.random()}>
          <Comment.Avatar
            src={process.env.PUBLIC_URL + "/assets/images/user.png"}
          />
          <Comment.Content>
            <Comment.Author as="a" href={`/${message.sender}`}>
              {message.sender}
            </Comment.Author>
            <Comment.Metadata>
              <div>{moment(message.created_at).fromNow()}</div>
            </Comment.Metadata>
            <Comment.Text>{message.text}</Comment.Text>
          </Comment.Content>
        </Comment>
      ))}

      <Comment.Action>
        <TextField
          fullWidth
          label="Type Your Message Here"
          value={mess}
          onChange={onChange}
          onKeyPress={onChange}
        />
      </Comment.Action>
    </>
  );
}

export default Messages;
