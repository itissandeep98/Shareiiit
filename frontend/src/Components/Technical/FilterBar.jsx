import SearchIcon from '@mui/icons-material/Search';
import {
	FormControl,
	InputAdornment,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Spinner } from 'reactstrap';
import { searchSkills } from '../../Store/ActionCreators/search';

function FilterBar(props) {
	const { setCards } = props;
	const [searchText, setSearchText] = useState('');
	const [rating, setRating] = useState(0);
	const [searchLoading, setSearchLoading] = useState(false);
	const dispatch = useDispatch();
	const skills = useSelector(state => state.skill?.skills);

	var typingTimer;
	const startSearch = e => {
		clearTimeout(typingTimer);
		typingTimer = setTimeout(OnChange, 1000);
	};
	const endSearch = e => {
		clearTimeout(typingTimer);
	};

	const OnChange = () => {
		if (searchText.length > 0) {
			setSearchLoading(true);
			dispatch(searchSkills({ search: searchText })).then(res => {
				const temp = res;
				if (temp?.length > 0) {
					setCards(temp);
				} else {
					setCards([]);
				}
				setSearchLoading(false);
			});
		} else {
			setCards(skills);
		}
	};

	const onRatingChange = e => {
		setSearchLoading(true);
		const { value } = e.target;
		setRating(value);
		dispatch(searchSkills({ rating_gte: value })).then(res => {
			const temp = res;
			if (temp?.length > 0) {
				setCards(temp);
			} else {
				setCards([]);
			}
			setSearchLoading(false);
		});
	};

	return (
		<Row>
			<Col md={10}>
				<TextField
					className="mb-3"
					label="Search Input"
					fullWidth
					value={searchText}
					onChange={e => setSearchText(e.target.value)}
					onKeyDown={endSearch}
					onKeyUp={startSearch}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								{searchLoading ? <Spinner size="sm" /> : <SearchIcon />}
							</InputAdornment>
						),
					}}
				/>
			</Col>
			<Col md={2}>
				<FormControl variant="outlined" fullWidth>
					<InputLabel>Rating greater than</InputLabel>
					<Select
						label="Rating Greate Than"
						value={rating}
						onChange={onRatingChange}
					>
						{Array.from(Array(6).keys()).map(i => (
							<MenuItem value={i}>{i}</MenuItem>
						))}
					</Select>
				</FormControl>
			</Col>
			<Col></Col>
		</Row>
	);
}

export default FilterBar;
