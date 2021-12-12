import {
	InputAdornment,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	TextField,
	Typography,
} from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { Col, Container, Row } from "reactstrap";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchSkillList } from "../../Store/ActionCreators/skill";

function Tags(props) {
	const { tags, modifyTags } = props;
	const [query, setQuery] = useState("");
	const dispatch = useDispatch();
	const [skillList, setSkillList] = useState([]);
	useEffect(() => {
		dispatch(fetchSkillList()).then((res) => {
			setSkillList(res);
		});
	}, [dispatch]);
	return (
		<Container className="bg-white p-2 rounded_lg shadow">
			<Row>
				<Col>
					<Typography variant="h3">Skills</Typography>
					<TextField
						label="Filter Tags"
						value={query}
						onChange={(e) => setQuery(e.target.value.toLowerCase())}
						fullWidth
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<SearchIcon />
								</InputAdornment>
							),
						}}
					/>
					<List component="nav" aria-label="main mailbox folders">
						{skillList
							.filter((tag) => tag.name.toLowerCase().includes(query))
							.map((tag) => (
								<ListItem
									button
									selected={tags?.includes(tag.name)}
									key={Math.random()}
									onClick={() => modifyTags(tag.name)}
								>
									<ListItemIcon>
										<LocalOfferIcon />
									</ListItemIcon>
									<ListItemText primary={tag.name} />
								</ListItem>
							))}
					</List>
				</Col>
			</Row>
		</Container>
	);
}

export default Tags;
