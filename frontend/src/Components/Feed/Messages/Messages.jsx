import { Comment, Input, Label, Menu, Tab } from "semantic-ui-react";
import "./style.css";

function Messages(props) {
  const panes = props.users.map((user, i) => ({
    menuItem: (
      <Menu.Item key={i}>
        {user.name}
        {user.unread > 0 && <Label>{user.unread}</Label>}
      </Menu.Item>
    ),
    render: () => (
      <Tab.Pane attached={false}>
        <UserMessage messages={user.messages} />
      </Tab.Pane>
    ),
  }));

  return <Tab menu={{ pointing: true }} panes={panes} />;
}

function UserMessage(props) {
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
        <Input fluid placeholder="Type Your Message Here" />
      </Comment.Action>
    </Comment.Group>
  );
}

export default Messages;
