import CheckIcon from '@mui/icons-material/Check';
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost, fetchPosts } from '../../../../Store/ActionCreators/post';
import ImageUploader from '../../../../Utils/ImageUploader';

function Other(props) {
	const dispatch = useDispatch();
	const [state, setState] = useState({
		checked: false,
		is_price_negotiable: true,
	});
	const handleSubmit = e => {
		e.preventDefault();
		const data = {
			title: state.title,
			description: state.description,
			is_request: state.checked,
			is_price_negotiable: state.is_price_negotiable,
			price: state.price,
		};
		props.toggle();
		dispatch(createPost({ data, category: 'other' })).then(() => {
			dispatch(fetchPosts({ category: 'other' }));
		});
	};
	const onChange = e => {
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
				setImage={val => setState({ ...state, image: val })}
			/>
			<FormControlLabel
				control={
					<Checkbox
						checked={state.checked}
						onChange={e => setState({ ...state, checked: !state.checked })}
						color="primary"
					/>
				}
				label="This is a Request Post"
			/>
			<FormControlLabel
				control={
					<Checkbox
						checked={state.is_price_negotiable}
						onChange={e =>
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
				startIcon={<CheckIcon />}
				onClick={handleSubmit}>
				Submit
			</Button>
		</form>
	);
}

export default Other;
