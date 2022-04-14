import SearchIcon from '@mui/icons-material/Search';
import { Chip, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Col, Row, Spinner, Container } from 'reactstrap';
import { searchUser } from '../../Store/ActionCreators/search';
import CustomImage from '../../Utils/CustomImage';

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
		if (searchText.length == 0) {
			return;
		}
		setSearchLoading(true);
		dispatch(searchUser({ search: searchText })).then(res => {
			setuserList(res);
			setSearchLoading(false);
		});
	};
	return (
		<>
			<Row>
				<Col>
					<TextField
						label="Search users"
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
			<Row className="my-3 mb-5">
				<Col>
					{searchLoading ? (
						<>
							<Spinner size="sm" /> Fetching users...
						</>
					) : (
						<div className="text-break">
							{userList.length === 0 && searchText.length > 0 && (
								<p>No Users Found !!!</p>
							)}
							{userList?.map(user => (
								<UserResult user={user} />
							))}
						</div>
					)}
				</Col>
			</Row>
		</>
	);
}

const UserResult = ({ user }) => {
	const [imgErr, setImgErr] = useState(false);

	return (
		<NavLink
			to={`/${user.username}`}
			className="bg-light d-inline-block py-2 px-3 rounded_lg m-2 card_hover ">
			<div className="d-flex flex-row justify-content-between align-items-center">
				<div className="mr-1">
					<CustomImage
						src={
							!imgErr
								? user.image ??
								  process.env.PUBLIC_URL + '/assets/images/user.png'
								: process.env.PUBLIC_URL + '/assets/images/user.png'
						}
						onError={e => setImgErr(true)}
						avatar
					/>
				</div>
				<div>
					<p>{user.username}</p>
					<small>
						{user?.first_name} {user?.last_name}
					</small>
				</div>
			</div>
		</NavLink>
	);
};
export default Search;
