import SearchIcon from '@mui/icons-material/Search';
import {
	InputAdornment,
	List,
	ListItem,
	ListItemText,
	TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Col, Container, Row, Spinner } from 'reactstrap';
import {
	fetchSkillList,
	searchSkillList,
} from '../../Store/ActionCreators/skill';

function Tags(props) {
	const { tags, modifyTags } = props;
	const dispatch = useDispatch();
	const [skillList, setSkillList] = useState([]);
	const [searchText, setSearchText] = useState('');
	const [searchLoading, setSearchLoading] = useState(false);
	var typingTimer;
	const startSearch = e => {
		clearTimeout(typingTimer);
		typingTimer = setTimeout(OnChange, 1000);
	};
	const endSearch = e => {
		clearTimeout(typingTimer);
	};
	useEffect(() => {
		dispatch(fetchSkillList()).then(res => {
			setSkillList(res);
		});
	}, [dispatch]);

	const OnChange = e => {
		setSearchLoading(true);
		if (searchText.length > 0) {
			dispatch(searchSkillList(searchText)).then(res => {
				setSkillList(res);
				setSearchLoading(false);
			});
		} else {
			dispatch(fetchSkillList()).then(res => {
				setSkillList(res);
				setSearchLoading(false);
			});
		}
	};

	return (
		<Container className="bg-white p-2 rounded_lg shadow poppins">
			<Row>
				<Col>
					<TextField
						label="Filter Tags"
						onChange={e => setSearchText(e.target.value)}
						onKeyDown={endSearch}
						onKeyUp={startSearch}
						fullWidth
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									{searchLoading ? <Spinner size="sm" /> : <SearchIcon />}
								</InputAdornment>
							),
						}}
					/>
					<List className="d-none d-md-block">
						{skillList.map(tag => (
							<ListItem
								button
								selected={tags?.includes(tag.label)}
								className="poppins text-break"
								key={Math.random()}
								onClick={() => modifyTags(tag.label)}
							>
								<ListItemText primary={tag.label} />
							</ListItem>
						))}
					</List>
				</Col>
			</Row>
		</Container>
	);
}

export default Tags;
