import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import { Comment } from "semantic-ui-react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { createMessage } from "../../../Store/ActionCreators/message";

function UserMessage(props) {
  const { postid, convid } = props;
  const [mess, setMess] = useState("");
  const [messages, setMessages] = useState(props.messages);
  const dispatch = useDispatch();
  const onChange = (e) => {
    if (e.charCode === 13 && e.target.value !== "") {
      const data = {
        text: mess,
      };
      let type = {};
      if (convid) {
        type.conversation = convid;
      } else {
        type.post = postid;
      }
      //   console.log(type, data);
      setMess("");
      dispatch(createMessage({ type, data })).then((res) =>
        setMessages([res, ...messages])
      );
    } else {
      setMess(e.target.value);
    }
  };
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
              <div>{moment(message.timestamp).fromNow()}</div>
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

export default UserMessage;