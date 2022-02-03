import { Tooltip } from '@mui/material';
import moment from 'moment';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
import { Col, Container, Row } from 'reactstrap';
import { Icon, Image } from 'semantic-ui-react';
import { deletePost } from '../../../Store/ActionCreators/post';
import DeleteModal from './DeleteModal';
import EditPostModal from './EditPostModal';

function MyPostCard(props) {
	let { id, description, created_at, title, image, category } = props.details;

	const [modal, setModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const dispatch = useDispatch();

	const handleDelete = () => {
		dispatch(deletePost({ id, category })).then(() =>
			setDeleteModal(!deleteModal)
		);
	};

	return (
		<>
			<EditPostModal
				id={id}
				modal={modal}
				setModal={setModal}
				details={props.details}
			/>
			<DeleteModal
				modal={deleteModal}
				toggle={() => setDeleteModal(!deleteModal)}
				action={handleDelete}
			/>

			<Container className="bg-white pt-3 rounded_lg border-info border mt-3 h-100 d-flex justify-content-between flex-column card_hover">
				<Row className=" h-100">
					<Col>
						<Row>
							<Col>
								<Image
									src={
										image ??
										process.env.PUBLIC_URL +
											'/assets/images/' +
											(category === 'book' ? 'book.png' : `${category}.svg`)
									}
									size="small"
								/>
							</Col>
							<Col xs={9}>
								<h3
									className="text-capitalize"
									onClick={() => props.history.push(`/posts/${category}/${id}`)}
									style={{ cursor: 'pointer' }}>
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
								<p>
									<Icon
										name="trash"
										size="large"
										className="btn p-0"
										onClick={() => setDeleteModal(true)}
									/>
								</p>
							</Tooltip>
							<Tooltip title="Edit" placement="top">
								<p>
									<Icon
										name="pencil"
										size="large"
										className="btn p-0"
										onClick={() => setModal(true)}
									/>
								</p>
							</Tooltip>
							{/* <Tooltip title="Complete" placement="top">
								<p>
									<Icon
										name="check circle outline"
										size="large"
										className="btn p-0"
									/>
								</p>
							</Tooltip> */}
						</div>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default withRouter(MyPostCard);
