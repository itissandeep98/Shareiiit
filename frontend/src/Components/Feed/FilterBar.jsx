import SearchIcon from '@mui/icons-material/Search';
import {
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	InputAdornment,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@mui/material';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Col, Container, Row, Spinner } from 'reactstrap';
import { searchAdvanced, searchPosts } from '../../Store/ActionCreators/search';

const categories = [
	{ label: 'Books', value: 'book' },
	{ label: 'Groups', value: 'group' },
	{ label: 'Electronics', value: 'electronic' },
	{ label: 'Other', value: 'other' },
];

const sort_by = [
	{ label: 'Most Recent', value: '-created_at' },
	{ label: 'Oldest first', value: 'created_at' },
	{ label: 'Most Upvoted', value: 'upvote_count' },
];

function FilterBar(props) {
	const {
		category,
		setCategory,
		ordering,
		setOrdering,
		request,
		setRequest,
		setResult,
	} = props;

	const history = useHistory();
	const dispatch = useDispatch();
	const posts = useSelector(state => state.posts?.[category]);

	const [search, setSearch] = useState('');
	const [searchLoading, setSearchLoading] = useState(false);
	const [modal, setModal] = useState(false);

	useEffect(() => {
		window.history.replaceState(
			null,
			null,
			'?' + JSON.stringify({ category, ordering, request })
		);
	}, [category, ordering, request]);

	var typingTimer;
	const startSearch = e => {
		clearTimeout(typingTimer);
		typingTimer = setTimeout(onChange, 1000);
	};
	const endSearch = e => {
		clearTimeout(typingTimer);
	};

	const onChange = () => {
		if (search.length > 0) {
			setSearchLoading(true);
			const data = { search };
			dispatch(searchPosts({ data, category })).then(res => {
				setResult(res);
				setSearchLoading(false);
			});
		} else {
			setResult(posts);
		}
	};

	return (
		<Container fluid className=" p-3 bg-light">
			<Row>
				<Col className="mt-2">
					<TextField
						label="Search"
						variant="outlined"
						value={search}
						multiline
						fullWidth
						onChange={e => setSearch(e.target.value)}
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
				<Col md={2} className="mt-2">
					<FormControl variant="outlined" fullWidth>
						<InputLabel>Request posts</InputLabel>
						<Select
							label="Requesting or giving"
							value={request}
							onChange={e => setRequest(e.target.value)}>
							<MenuItem value={0}>All</MenuItem>
							<MenuItem value={'True'}>Requested</MenuItem>
							<MenuItem value={'False'}>Giving Away</MenuItem>
						</Select>
					</FormControl>
				</Col>
				<Col md={2} className="mt-2">
					<FormControl variant="outlined" fullWidth>
						<InputLabel>Category</InputLabel>
						<Select
							label="Category"
							value={category}
							onChange={e => setCategory(e.target.value)}>
							{categories.map((tag, i) => (
								<MenuItem value={tag.value} key={i}>
									{tag.label}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Col>
				<Col md={2} className="mt-2">
					<FormControl variant="outlined" fullWidth>
						<InputLabel>Sort by</InputLabel>
						<Select
							label="Category"
							value={ordering}
							onChange={e => setOrdering(e.target.value)}>
							{sort_by.map((tag, i) => (
								<MenuItem value={tag.value} key={i}>
									{tag.label}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Col>
			</Row>
			<AdvancedSearch
				open={modal}
				toggle={() => setModal(!modal)}
				setResult={props.setResult}
				category={category}
			/>
			<Row>
				<Col>
					<Button
						className="float-right text-info"
						onClick={() => setModal(!modal)}>
						{modal ? 'Hide' : 'Show'} Advanced Search
					</Button>
				</Col>
			</Row>
		</Container>
	);
}

function AdvancedSearch(props) {
	const { open, setResult, category } = props;
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState({
		title: '',
		description: '',
		username: '',
	});
	useEffect(() => {
		setData({
			title: '',
			description: '',
			username: '',
		});
	}, [category]);

	const handleChange = e => {
		setData({ ...data, [e.target.name]: e.target.value });
	};
	const handleSearch = () => {
		setLoading(true);
		dispatch(searchAdvanced({ ...data, category })).then(res => {
			setResult(res);
			setLoading(false);
		});
	};
	return (
		<div
			className={classNames('mt-3 adv_search overflow-hidden', {
				hidden_details: !open,
			})}>
			<Row>
				<Col md={6}>
					<TextField
						label="Title"
						fullWidth
						variant="outlined"
						name="title"
						onChange={handleChange}
					/>
				</Col>
				<Col md={6}>
					<TextField
						label="Description"
						fullWidth
						variant="outlined"
						name="description"
						onChange={handleChange}
					/>
				</Col>
				<Col md={4}>
					<TextField
						label="Username"
						fullWidth
						variant="outlined"
						className="mt-2"
						name="username"
						onChange={handleChange}
					/>
				</Col>

				{category === 'book' && (
					<Col md={4}>
						<TextField
							label="Author"
							className=" mt-2"
							fullWidth
							variant="outlined"
							name="author"
							value={data.author}
							onChange={handleChange}
						/>
					</Col>
				)}

				{category !== 'group' ? (
					<Col md={4}>
						<TextField
							type="number"
							label="Price"
							fullWidth
							variant="outlined"
							className="mt-2"
							name="price"
							onChange={handleChange}
						/>
					</Col>
				) : (
					<Col md={6}>
						<TextField
							label="Members Needed"
							type="number"
							className=" mt-2"
							fullWidth
							variant="outlined"
							name="members_needed"
							value={data.members_needed}
							onChange={handleChange}
						/>
					</Col>
				)}
			</Row>
			<Row>
				<Col>
					<FormControlLabel
						control={
							<Checkbox
								checked={data.is_request}
								onChange={e =>
									setData({ ...data, is_request: !data.is_request })
								}
								color="primary"
							/>
						}
						label="Request Posts"
					/>
				</Col>
				<Col>
					<Button
						variant="outlined"
						className="mt-2 float-right"
						onClick={handleSearch}
						disabled={loading}>
						{loading ? <Spinner /> : 'Search'}
					</Button>
				</Col>
			</Row>
		</div>
	);
}
export default FilterBar;
