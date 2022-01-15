import { Col, Container, Row } from "reactstrap";
import { Icon, Image } from "semantic-ui-react";
import { withRouter } from "react-router";
import { useDispatch } from "react-redux";
import { Tooltip } from "@mui/material";
import moment from "moment";
import { deletePost } from "../../../Store/ActionCreators/post";
import { useState } from "react";
import DeleteModal from "./DeleteModal";

function ExpiredCard(props) {
	let { id, description, created_at, title, image } = props.details;

	const [deleteModal, setDeleteModal] = useState(false);
	const dispatch = useDispatch();

	const handleDelete = () => {
		dispatch(deletePost(id));
	};

	return (
		<Container className="bg-light pt-3 rounded_lg border-danger border mt-3 h-100 d-flex justify-content-between flex-column card_hover">
			<Row className=" h-100">
				<DeleteModal
					modal={deleteModal}
					toggle={() => setDeleteModal(!deleteModal)}
					action={handleDelete}
				/>

				<Col>
					<Row>
						<Col>
							<Image
								src={
									image ?? process.env.PUBLIC_URL + "/assets/images/book.png"
								}
								size="small"
							/>
						</Col>
						<Col xs={9}>
							<h3 className="text-capitalize">{title}</h3>
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
							<p>
								<Icon
									name="trash"
									size="large"
									className="btn p-0"
									onClick={() => setDeleteModal(true)}
								/>
							</p>
						</Tooltip>
					</div>
				</Col>
			</Row>
		</Container>
	);
}

export default withRouter(ExpiredCard);
