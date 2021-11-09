import { Tooltip } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import { Icon, Image, Label, Placeholder } from "semantic-ui-react";
import { addVote } from "../../Store/ActionCreators/vote";
import Meta from "../Meta";
import classNames from "classnames";
import Messages from "./Messages/Messages";
import { NavLink } from "react-router-dom";
import { fetchPostCategoryDetails } from "../../Store/ActionCreators/post";

function PostDetail(props) {
  const id = props.match.params.postId;
  const dispatch = useDispatch();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [num_upvotes, setNum_upvotes] = useState(null);
  const [liked, setLiked] = useState(null);
  const [saved, setSaved] = useState(null);
  const [dismiss, setDismiss] = useState(null);
  const username = useSelector((state) => state.user?.details?.username);
  useEffect(() => {
    dispatch(fetchPostCategoryDetails({ id, category: "book" })).then((res) => {
      setDetails(res);
      setLoading(false);
      setNum_upvotes(res?.upvote_count);
      setLiked(res?.vote_log?.upvoted_flag);
      setSaved(res?.vote_log?.saved_flag);
      setDismiss(res?.vote_log?.dismiss_flag);
    });
  }, [dispatch]);

  const Vote = (option) => {
    let data = {};
    if (option == 1) {
      if (liked) {
        setNum_upvotes(num_upvotes - 1);
      } else {
        setNum_upvotes(num_upvotes + 1);
      }
      data.upvoted_flag = !liked;
      setLiked(!liked);
    } else if (option == 2) {
      data.saved_flag = !saved;
      setSaved(!saved);
    } else if (option == 3) {
      data.dismiss_flag = !dismiss;
      setDismiss(!dismiss);
    }

    dispatch(addVote({ id, data }));
  };
  return (
    <Container className="shadow p-3 my-4">
      {details && (
        <>
          <Meta head={`${details.title} | ShareIIITD`} />
          <Row>
            <Col>
              {loading ? (
                <Placeholder style={{ height: 150, width: 150 }}>
                  <Placeholder.Image />
                </Placeholder>
              ) : (
                <div className="text-center p-2  d-flex flex-column">
                  <Image
                    src={
                      details.image_url ??
                      process.env.PUBLIC_URL + "/assets/images/book.png"
                    }
                    fluid
                  />
                  <Row>
                    <Col>
                      <hr />
                      <div className="d-flex justify-content-around mb-1 w-100">
                        <Tooltip title="Upvote" placement="top">
                          <p>
                            <Icon
                              name="arrow up circle"
                              className={classNames({ "text-success": liked })}
                              onClick={() => Vote(1)}
                              style={{ cursor: "pointer" }}
                              size="large"
                            />
                            <small> {num_upvotes > 0 && num_upvotes}</small>
                          </p>
                        </Tooltip>
                        <Tooltip title="Save" placement="top">
                          <Icon
                            name="bookmark outline"
                            className={classNames({ "text-info": saved })}
                            onClick={() => Vote(2)}
                            style={{ cursor: "pointer" }}
                            size="large"
                          />
                        </Tooltip>
                        <Tooltip title="Dismiss" placement="top">
                          <Icon
                            name="times"
                            className={classNames({ "text-danger": dismiss })}
                            onClick={() => Vote(3)}
                            style={{ cursor: "pointer" }}
                            size="large"
                          />
                        </Tooltip>
                      </div>
                    </Col>
                  </Row>
                </div>
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
                  <h2 className="text-capitalize text-center">
                    {details.title}
                  </h2>
                  <h4 className="text-capitalize">
                    By {details?.book?.author}
                  </h4>
                  <NavLink
                    to={`/${details.created_by}`}
                    className="float-right"
                  >
                    - {details.created_by}
                  </NavLink>
                  {details.price > 0 && (
                    <Tooltip
                      title={
                        details.is_price_negotiable
                          ? "Price is negotiable"
                          : "Fixed Price"
                      }
                    >
                      <Label size="large">
                        <Icon name="rupee" />
                        {details.price}
                      </Label>
                    </Tooltip>
                  )}
                  <Row className="mt-5">
                    <Col className="text-justify">{details.description}</Col>
                  </Row>
                </>
              )}
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <hr />
              <h2>
                <Icon name="chat" /> Messages
              </h2>
              <Messages
                id={id}
                recipient={username}
                creator={details.created_by}
              />
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}

export default PostDetail;
