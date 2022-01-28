import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
import { Col, Spinner, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { searchSkills } from "../../Store/ActionCreators/search";

function FilterBar(props) {
	const { setCards } = props;
	const [searchText, setSearchText] = useState("");
	const [searchLoading, setSearchLoading] = useState(false);
	const dispatch = useDispatch();
	const skills = useSelector((state) => state.skill?.skills);

	var typingTimer;
	const startSearch = (e) => {
		clearTimeout(typingTimer);
		typingTimer = setTimeout(OnChange, 1000);
	};
	const endSearch = (e) => {
		clearTimeout(typingTimer);
	};

	const OnChange = () => {
		if (searchText.length > 0) {
			setSearchLoading(true);
			dispatch(searchSkills({ search: searchText })).then((res) => {
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

	return (
		<Row>
			<Col>
				<TextField
					label="Search Input"
					fullWidth
					value={searchText}
					onChange={(e) => setSearchText(e.target.value)}
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
	);
}

export default FilterBar;
