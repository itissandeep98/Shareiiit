import { useEffect, useState } from "react";
import { Autocomplete, Chip, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { searchUser } from "../../../Store/ActionCreators/search";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { NavLink, withRouter } from "react-router-dom";

function UserSearchBar(props) {
	const { members, onChange } = props;
	const [userList, setuserList] = useState([]);
	const [searchLoading, setSearchLoading] = useState(false);
	const [searchText, setSearchText] = useState("");
	const dispatch = useDispatch();

	var typingTimer;
	const startSearch = (e) => {
		clearTimeout(typingTimer);
		typingTimer = setTimeout(handleSearch, 500);
	};
	const endSearch = (e) => {
		clearTimeout(typingTimer);
	};

	const handleSearch = () => {
		setSearchLoading(true);
		dispatch(searchUser({ search: searchText })).then((res) => {
			setuserList(res);
			setSearchLoading(false);
		});
	};

	const addMembers = (user) => {
		if (members) {
			onChange([...members, user]);
		} else {
			onChange([user]);
		}
	};
	const removeMembers = (user) => {
		if (members) {
			onChange(members.filter((member) => member.username !== user));
		}
	};
	return (
		<>
			<Autocomplete
				freeSolo
				openOnFocus
				className="mt-3"
				loading={searchLoading}
				loadingText="Searching..."
				options={userList}
				getOptionLabel={(option) => option.username}
				renderInput={(params) => (
					<TextField
						fullWidth
						{...params}
						onChange={(e) => setSearchText(e.target.value)}
						onKeyDown={endSearch}
						onKeyUp={startSearch}
						label="Tag Members"
					/>
				)}
				renderOption={(props, option) =>
					CustomOption(props, option, addMembers)
				}
			/>
			{members &&
				members?.map((member) => (
					<Chip
						label={
							<NavLink to={`/${member.username}`} target="__blank">
								{member.username}
							</NavLink>
						}
						className="m-1 btn "
						key={Math.random()}
						onDelete={() => removeMembers(member.username)}
						deleteIcon={<HighlightOffIcon />}
					/>
				))}
		</>
	);
}

const CustomOption = (props, option, addMembers) => {
	return (
		<div
			className="p-2"
			style={{ cursor: "pointer" }}
			onClick={(e) => addMembers(option)}
		>
			{option.first_name} {option.last_name} - {option.username}
		</div>
	);
};

export default UserSearchBar;
