import { TextField } from "@material-ui/core";
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
  useEffect(() => {
    const data = {
      post: id,
      user2: recipient,
    };
    dispatch(fetchMessages(data));
  }, [dispatch]);
  const onChange = (e) => {
    if (e.charCode === 13 && e.target.value !== "") {
      const data = {
        recipient: recipient,
        post: id,
        text: mess,
      };
      setMess("");
      dispatch(createMessage(data));
    } else {
      setMess(e.target.value);
    }
  };
  const panes = props.users.map((user, i) => ({
    menuItem: (
      <Menu.Item key={i}>
        {user.name}
        {user.unread > 0 && <Label>{user.unread}</Label>}
      </Menu.Item>
    ),
    render: () => (
      <Tab.Pane attached={false}>
        <UserMessage messages={user.messages} mess={mess} onChange={onChange} />
      </Tab.Pane>
    ),
  }));

  return <Tab menu={{ pointing: true }} panes={panes} />;
}

function UserMessage(props) {
  const { mess, onChange } = props;
  return (
    <Comment.Group>
      {props.messages.map((message) => (
        <Comment key={Math.random()}>
          <Comment.Avatar src={message.pic} />
          <Comment.Content>
            <Comment.Author as="a">{message.user}</Comment.Author>
            <Comment.Metadata>
              <div>Today at 5:42PM</div>
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
    </Comment.Group>
  );
}

export default Messages;
