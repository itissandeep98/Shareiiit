import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import { Image, Placeholder } from "semantic-ui-react";
import { fetchPostDetails } from "../../Store/ActionCreators/post";
import Messages from "./Messages/Messages";

function PostDetail(props) {
  const dispatch = useDispatch();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const id = props.match.params.postId;
    dispatch(fetchPostDetails(id)).then((res) => {
      setDetails(res);
      setLoading(false);
    });
  }, [dispatch]);
  const users = [
    {
      name: "Sandeep",
      unread: "15",
      messages: [
        {
          user: "Sandeep",
          text: "Hi I can help you",
          pic: process.env.PUBLIC_URL + "/assets/images/user1.png",
        },
        {
          user: "Anmol",
          text: "Thank You ",
          pic: process.env.PUBLIC_URL + "/assets/images/user.png",
        },
        {
          user: "Anmol",
          text: "Hi I can help you",
          pic: process.env.PUBLIC_URL + "/assets/images/user.png",
        },
        {
          user: "Sandeep",
          text: "Thank You ",
          pic: process.env.PUBLIC_URL + "/assets/images/user1.png",
        },
      ],
    },
    {
      name: "Anmol",
      unread: "1",
      messages: [
        {
          user: "Anmol",
          text: "Hi I can help you",
          pic: process.env.PUBLIC_URL + "/assets/images/user.png",
        },
        {
          user: "Sandeep",
          text: "Thank You ",
          pic: process.env.PUBLIC_URL + "/assets/images/user1.png",
        },
        {
          user: "Sandeep",
          text: "Hi I can help you",
          pic: process.env.PUBLIC_URL + "/assets/images/user1.png",
        },
        {
          user: "Anmol",
          text: "Thank You ",
          pic: process.env.PUBLIC_URL + "/assets/images/user.png",
        },
      ],
    },
    {
      name: "Naman",
      messages: [
        {
          user: "Naman",
          text: "Hi I can help you",
          pic: process.env.PUBLIC_URL + "/assets/images/user.png",
        },
        {
          user: "Sandeep",
          text: "Thank You ",
          pic: process.env.PUBLIC_URL + "/assets/images/user1.png",
        },
      ],
    },
  ];
  return (
    <Container className="shadow p-3 mt-4">
      <Row>
        <Col>
          {loading ? (
            <Placeholder style={{ height: 150, width: 150 }}>
              <Placeholder.Image />
            </Placeholder>
          ) : (
            <Image
              src={process.env.PUBLIC_URL + "/assets/images/book.png"}
              size="small"
            />
          )}
        </Col>
        <Col xs={9}>
          {loading ? (
            <Placeholder fluid>
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder>
          ) : (
            <>
              <h2 className="text-capitalize text-center">{details.title}</h2>
              <p className="text-muted float-right"> - {details.created_by}</p>
              <Row className="mt-5">
                <Col className="text-justify">{details.description}</Col>
              </Row>
            </>
          )}
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <Messages users={users} />
        </Col>
      </Row>
    </Container>
  );
}

export default PostDetail;
