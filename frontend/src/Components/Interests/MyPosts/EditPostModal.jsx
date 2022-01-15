import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";
import { updatePost } from "../../../Store/ActionCreators/post";
import { useDispatch } from "react-redux";
import ImageUploader from "../../../Utils/ImageUploader";

function EditPostModal(props) {
	const { modal, setModal, id } = props;
	const { category } = props.details;
	const [state, setState] = useState(props.details);

	const dispatch = useDispatch();
	const handleSubmit = (e) => {
		e.preventDefault();
		const temp = {
			title: state.title,
			description: state.description,
			is_request: state.is_request,
			is_price_negotiable: state.is_price_negotiable,
		};
		let data = new FormData();
		data.append("image", state.image);
		data.append("price", state.price);
		data.append("book.author", state.author);
		Object.keys(temp).map((key) => data.append(key, temp[key]));
		setModal(!modal);
		dispatch(updatePost({ id, data, category }));
	};
	const onChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value });
	};
	return (
		<Modal isOpen={modal} toggle={() => setModal(!modal)} size="lg">
			<ModalHeader>Edit Post</ModalHeader>
			<ModalBody>
				<form>
					<TextField
						label="Name"
						variant="outlined"
						required
						fullWidth
						value={state.title}
						name="title"
						onChange={onChange}
					/>
					{category === "book" && (
						<TextField
							label="Author"
							className=" mt-3"
							fullWidth
							variant="outlined"
							required
							name="author"
							value={state?.book?.author}
							onChange={(e) =>
								setState({ ...state, book: { author: e.target.value } })
							}
						/>
					)}
					<TextField
						label="Description"
						className=" mt-3"
						fullWidth
						variant="outlined"
						required
						multiline
						rows={4}
						name="description"
						value={state.description}
						onChange={onChange}
					/>
					{category !== "group" ? (
						<TextField
							type="number"
							label="Price"
							className=" mt-3"
							fullWidth
							variant="outlined"
							name="price"
							value={state.price}
							onChange={onChange}
						/>
					) : (
						<TextField
							label="Members Needed"
							type="number"
							className=" mt-3"
							fullWidth
							variant="outlined"
							name="members_needed"
							value={state.group?.members_needed}
							onChange={(e) =>
								setState({
									...state,
									group: { members_needed: parseInt(e.target.value) },
								})
							}
						/>
					)}

					<ImageUploader
						image={state.image}
						setImage={(val) => setState({ ...state, image: val })}
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={state.is_request}
								onChange={(e) =>
									setState({ ...state, is_request: !state.is_request })
								}
								color="primary"
							/>
						}
						label="This is a Request Post"
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={state.is_price_negotiable}
								onChange={(e) =>
									setState({
										...state,
										is_price_negotiable: !state.is_price_negotiable,
									})
								}
								color="primary"
							/>
						}
						label="Negotiable Price"
					/>
					<Button
						variant="outlined"
						className="mt-3 float-right  "
						onClick={handleSubmit}
						startIcon={<CheckIcon />}
					>
						Update
					</Button>
				</form>
			</ModalBody>
		</Modal>
	);
}

export default EditPostModal;
