import { Icon, IconButton, Tooltip } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { Image, Placeholder } from "semantic-ui-react";
import { addVote } from "../../Store/ActionCreators/vote";
import Messages from "../Posts/Messages/Messages";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import classNames from "classnames";
import Meta from "../Meta";
import { fetchPostDetails } from "../../Store/ActionCreators/post";

function TechDetails(props) {
  const id = props.match.params.id;
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({});
  const dispatch = useDispatch();
  const [num_upvotes, setNum_upvotes] = useState(null);

  const [endorse, setEndorse] = useState(false);
  const [save, setSave] = useState(false);

  useEffect(() => {
    dispatch(fetchPostDetails({ id, category: "skill" })).then((res) => {
      setDetails(res);
      setNum_upvotes(res.upvote_count);
      setEndorse(res.vote_log.upvoted_flag);
      setSave(res.vote_log.saved_flag);
      setLoading(false);
    });
  }, [dispatch]);

  const username = useSelector((state) => state.user?.details?.username);

  const Vote = (option) => {
    let data = {};
    if (option == 1) {
      if (endorse) {
        setNum_upvotes(num_upvotes - 1);
      } else {
        setNum_upvotes(num_upvotes + 1);
      }

      data.upvoted_flag = !endorse;
      setEndorse(!endorse);
    } else if (option == 2) {
      data.saved_flag = !save;
      setSave(!save);
    }

    dispatch(addVote({ id, data }));
  };

  return (
    <Container className="shadow p-3 mt-4">
      <Meta head={`${details.title} by ${details.created_by} | ShareIIITD`} />
      <Row>
        <Col>
          {loading ? (
            <Placeholder style={{ height: 150, width: 150 }}>
              <Placeholder.Image />
            </Placeholder>
          ) : (
            <div className="text-center p-2  d-flex flex-column">
              <Image
                src={process.env.PUBLIC_URL + "/assets/images/skill.svg"}
                fluid
              />
              <div className="d-flex flex-row justify-content-center">
                <Tooltip title="Endorse" placement="top">
                  <IconButton
                    onClick={() => Vote(1)}
                    className={classNames({ "text-danger": endorse })}
                  >
                    <FavoriteBorderIcon />
                    <small> {num_upvotes > 0 && num_upvotes}</small>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Save" placement="top">
                  <IconButton
                    onClick={() => Vote(2)}
                    className={classNames({ "text-info": save })}
                  >
                    <BookmarkBorderIcon />
                  </IconButton>
                </Tooltip>
              </div>
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
              <h2 className="text-capitalize text-center">{details.title}</h2>
              <p className="text-muted float-right">
                <NavLink to={`/${details.created_by}`}>
                  - {details.created_by}
                </NavLink>
              </p>
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
          <Messages id={id} recipient={username} creator={details.created_by} />
        </Col>
      </Row>
    </Container>
  );
}

export default TechDetails;
