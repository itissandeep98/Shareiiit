import { Col, Container, Row } from "reactstrap";
import { Icon, Image } from "semantic-ui-react";
import { withRouter } from "react-router";
import { useDispatch } from "react-redux";
import { Tooltip } from "@material-ui/core";
import moment from "moment";
import { deleteBookPost } from "../../../Store/ActionCreators/books";
import { useState } from "react";
import EditPostModal from "./EditPostModal";
import DeleteModal from "./DeleteModal";

function MyPostCard(props) {
  let { id, description, created_at, title } = props;

  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteBookPost(id));
  };

  return (
    <Container className="bg-white pt-3 rounded_lg border-info border mt-3 h-100 d-flex justify-content-between flex-column card_hover">
      <Row className=" h-100">
        <EditPostModal modal={modal} setModal={setModal} {...props} />
        <DeleteModal
          modal={deleteModal}
          toggle={() => setDeleteModal(!deleteModal)}
          action={handleDelete}
        />

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
              >
                {title}
              </h3>
            </Col>
          </Row>
          <Row className="mt-1">
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
          <div className="d-flex justify-content-around mb-3 w-100">
            <Tooltip title="Delete" placement="top">
              <Icon
                name="trash"
                size="large"
                className="btn p-0"
                onClick={() => setDeleteModal(true)}
              />
            </Tooltip>
            <Tooltip title="Edit" placement="top">
              <Icon
                name="pencil"
                size="large"
                className="btn p-0"
                onClick={() => setModal(true)}
              />
            </Tooltip>
            <Tooltip title="Complete" placement="top">
              <Icon
                name="check circle outline"
                size="large"
                className="btn p-0"
              />
            </Tooltip>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default withRouter(MyPostCard);
