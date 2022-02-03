import CheckIcon from '@mui/icons-material/Check';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost, fetchPosts } from '../../../../Store/ActionCreators/post';
import UserSearchBar from '../UserSearchBar';

function Groups(props) {
	const dispatch = useDispatch();
	const [state, setState] = useState({});

	const handleSubmit = e => {
		e.preventDefault();
		const data = {
			title: state.title,
			description: state.description,
			group: {
				members_needed: parseInt(state.members_needed),
				current_members: state?.members?.map(member => member.id),
			},
		};

		dispatch(createPost({ data, category: 'group' })).then(() => {
			dispatch(fetchPosts({ category: 'group' }));
			props.toggle();
		});
	};

	const onChange = e => {
		setState({ ...state, [e.target.name]: e.target.value });
	};

	return (
		<form>
			<TextField
				label="Title"
				fullWidth
				variant="outlined"
				required
				value={state.title}
				name="title"
				onChange={onChange}
			/>
			<TextField
				label="Members Needed"
				type="number"
				className=" mt-3"
				fullWidth
				variant="outlined"
				required
				name="members_needed"
				value={state.members_needed}
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
			<UserSearchBar
				members={state.members}
				onChange={val => setState({ ...state, members: val })}
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

export default Groups;
