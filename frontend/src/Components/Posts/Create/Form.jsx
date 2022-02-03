import CheckIcon from '@mui/icons-material/Check';
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost, fetchPosts } from '../../../Store/ActionCreators/post';
import ImageUploader from '../../../Utils/ImageUploader';
import UserSearchBar from './UserSearchBar';

function Form(props) {
	const { toggle, category } = props;
	const [state, setState] = useState({
		is_request: false,
		is_price_negotiable: true,
	});

	const dispatch = useDispatch();
	const handleSubmit = e => {
		e.preventDefault();
		let temp = {
			title: state.title,
			description: state.description,
			is_request: state.is_request,
			is_price_negotiable: state.is_price_negotiable,
		};
		let data = new FormData();
		Object.keys(temp).map(key => data.append(key, temp[key]));

		if (state?.image) {
			data.append('image', state.image);
		}
		if (state?.price) {
			data.append('price', state.price);
		}
		if (state?.book?.author) {
			data.append('book.author', state?.book?.author);
		}
		if (state?.members_needed) {
			data.append('group.members_needed', parseInt(state.members_needed));
		}
		if (state?.members?.length > 0) {
			data.append(
				'group.current_members',
				state?.members?.map(member => member.id)
			);
		}

		dispatch(createPost({ data, category })).then(() => {
			dispatch(fetchPosts({ category }));
			toggle();
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
				value={state?.title}
				name="title"
				onChange={onChange}
			/>
			{category === 'book' && (
				<TextField
					label="Author"
					className=" mt-3"
					fullWidth
					variant="outlined"
					required
					name="author"
					value={state?.book?.author}
					onChange={e =>
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
				value={state?.description}
				onChange={onChange}
			/>
			{category !== 'group' ? (
				<TextField
					type="number"
					label="Price"
					className=" mt-3"
					fullWidth
					variant="outlined"
					name="price"
					value={state?.price}
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
					value={state?.group?.members_needed}
					onChange={e =>
						setState({
							...state,
							group: { members_needed: parseInt(e.target.value) },
						})
					}
				/>
			)}
			{category === 'group' && (
				<UserSearchBar
					members={state?.group?.current_members}
					onChange={val =>
						setState({
							...state,
							group: { ...state?.group, current_members: val },
						})
					}
				/>
			)}
			<ImageUploader
				image={state?.image}
				setImage={val => setState({ ...state, image: val })}
			/>
			{category !== 'group' && (
				<>
					<FormControlLabel
						control={
							<Checkbox
								checked={state?.is_request}
								onChange={e =>
									setState({ ...state, is_request: !state?.is_request })
								}
								color="primary"
							/>
						}
						label="This is a Request Post"
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={state?.is_price_negotiable}
								onChange={e =>
									setState({
										...state,
										is_price_negotiable: !state?.is_price_negotiable,
									})
								}
								color="primary"
							/>
						}
						label="Negotiable Price"
					/>
				</>
			)}
			<Button
				variant="outlined"
				className="mt-3 float-right  "
				onClick={handleSubmit}
				startIcon={<CheckIcon />}>
				Update
			</Button>
		</form>
	);
}

export default Form;
