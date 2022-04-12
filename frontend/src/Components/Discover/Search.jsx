import SearchIcon from '@mui/icons-material/Search';
import { Chip, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Col, Row, Spinner } from 'reactstrap';
import { searchUser } from '../../Store/ActionCreators/search';

function Search() {
	const [searchText, setSearchText] = useState('');
	const [userList, setuserList] = useState([]);
	const [searchLoading, setSearchLoading] = useState(false);
	const dispatch = useDispatch();

	var typingTimer;
	const startSearch = e => {
		clearTimeout(typingTimer);
		typingTimer = setTimeout(handleSearch, 500);
	};
	const endSearch = e => {
		clearTimeout(typingTimer);
	};

	const handleSearch = () => {
		setSearchLoading(true);
		dispatch(searchUser({ search: searchText })).then(res => {
			setuserList(res);
			setSearchLoading(false);
		});
	};
	return (
		<>
			<Row className="mt-5">
				<Col>
					<TextField
						label="Search"
						fullWidth
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
			</Row>
			<Row className="mt-3">
				<Col>
					{searchLoading ? (
						<>
							<Spinner size="sm" /> Fetching users...
						</>
					) : (
						<div className="text-break">
							{userList?.map(user => (
								<Chip
									label={
										<NavLink to={`/${user.username}`}>
											{user?.first_name} {user?.last_name}
										</NavLink>
									}
									size="medium"
									className="m-1"
									key={user.id}
								/>
							))}
						</div>
					)}
				</Col>
			</Row>
		</>
	);
}

export default Search;
