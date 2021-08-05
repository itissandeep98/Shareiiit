import { Col, Container, Row } from "reactstrap";
import { Icon, Image } from "semantic-ui-react";
import classNames from "classnames";
import { useState } from "react";
import { withRouter } from "react-router";
import { useDispatch } from "react-redux";
import { addVote } from "../../Store/ActionCreators/post";
import { NavLink } from "react-router-dom";
import { Tooltip } from "@material-ui/core";
import moment from "moment";
import "./style.scss";

function PostCards(props) {
  let {
    id,
    description,
    book,
    category,
    created_by,
    created_at,
    is_request,
    title,
    vote_count_log,
    vote_log,
  } = props;
  const [num_upvotes, setNum_upvotes] = useState(vote_count_log.upvote_count);
  const [liked, setLiked] = useState(vote_log.upvoted_flag);
  const [saved, setSaved] = useState(vote_log.saved_flag);
  const [dismiss, setDismiss] = useState(vote_log.dismiss_flag);
  const dispatch = useDispatch();
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
    <Container className="bg-white pt-3 rounded_lg border-info border mt-3 h-100 d-flex justify-content-between flex-column card_hover">
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
              <h3
                className="text-capitalize"
                onClick={() => props.history.push(`/posts/${id}`)}
                style={{ cursor: "pointer" }}
              >
                {title}
              </h3>
              <small className="text-muted float-right">
                - <NavLink to={`/${created_by}`}>{created_by}</NavLink>
              </small>
            </Col>
          </Row>
          <Row
            className="mt-1 btn p-0"
            onClick={() => props.history.push(`/posts/${id}`)}
          >
            <Col className="text-justify">{description}</Col>
          </Row>
        </Col>
      </Row>
      <small className="text-muted text-center">
        Posted {moment(created_at).fromNow()}
      </small>
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
    </Container>
  );
}

export default withRouter(PostCards);
