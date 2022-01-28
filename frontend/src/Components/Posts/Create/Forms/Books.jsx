import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost, fetchPosts } from "../../../../Store/ActionCreators/post";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import MultiUpload from "../../../../Utils/MultiUpload";
import ImageUploader from "../../../../Utils/ImageUploader";

function Books(props) {
	const dispatch = useDispatch();
	const [state, setState] = useState({
		is_request: false,
		is_price_negotiable: true,
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		const temp = {
			title: state.title,
			description: state.description,
			is_request: state.is_request,
			is_price_negotiable: state.is_price_negotiable,
		};
		let data = new FormData();
		if (state.image) {
			data.append("image", state.image);
		}
		data.append("price", state.price);
		data.append("book.author", state.author);
		Object.keys(temp).map((key) => data.append(key, temp[key]));
		// props.toggle();
		dispatch(createPost({ data, category: "book" })).then(() => {
			dispatch(fetchPosts({ category: "book" }));
		});
	};
	const onChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value });
	};

	return (
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
			<TextField
				label="Author"
				className=" mt-3"
				fullWidth
				variant="outlined"
				required
				name="author"
				value={state.author}
				onChange={onChange}
			/>
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
				className="mt-3 float-right"
				disabled={!state.title || !state.author || !state.description}
				onClick={handleSubmit}
				startIcon={<CheckIcon />}
			>
				Submit
			</Button>
		</form>
	);
}

export default Books;
