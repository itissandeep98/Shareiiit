import { Col, Container, Row } from "reactstrap";
import { Icon, Image } from "semantic-ui-react";
import classNames from "classnames";
import { useState } from "react";
import { withRouter } from "react-router";
import { useDispatch } from "react-redux";
import { addVote } from "../../Store/ActionCreators/post";
import { NavLink } from "react-router-dom";
import { Tooltip } from "@material-ui/core";

function PostCards(props) {
  const {
    id,
    body,
    book,
    category,
    created_by,
    is_request,
    title,
    upvotes,
    current_user_votes,
  } = props;
  const [liked, setLiked] = useState(
    current_user_votes.filter((vote) => vote.choice == 1).length
  );
  const [saved, setSaved] = useState(
    current_user_votes.filter((vote) => vote.choice == 2).length
  );
  const [dismiss, setDismiss] = useState(
    current_user_votes.filter((vote) => vote.choice == 3).length
  );
  const dispatch = useDispatch();
  const Vote = (option) => {
    if (option == 1) {
      setLiked(!liked);
    } else if (option == 2) {
      setSaved(!saved);
    } else if (option == 3) {
      setDismiss(!dismiss);
    }
    const data = {
      post: id,
      choice: option,
    };
    dispatch(addVote(data));
  };
  return (
    <Container className="shadow bg-white pt-3 rounded_lg border-info border mt-3 h-100 d-flex justify-content-between flex-column zoom_on_hover">
      <Row className=" h-100">
        <Col>
          <Row>
            <Col>
              <Image
                src={process.env.PUBLIC_URL + "/assets/images/book.png"}
                size="small"
              />
            </Col>
            <Col xs={9}>
              <h3 className="text-capitalize">{title}</h3>
              <small className="text-muted float-right">
                - <NavLink to={`/${created_by}`}>{created_by}</NavLink>
              </small>
            </Col>
          </Row>
          <Row
            className="mt-1"
            onClick={() => props.history.push(`/posts/${id}`)}
            style={{ cursor: "pointer" }}
          >
            <Col className="text-justify">{body}</Col>
          </Row>
        </Col>
      </Row>
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
                {upvotes > 0 && upvotes}
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
    </Container>
  );
}

export default withRouter(PostCards);
