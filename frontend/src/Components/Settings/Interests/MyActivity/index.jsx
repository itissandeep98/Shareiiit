import { Box, Paper, Tab, Tabs } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import { fetchVotedPosts } from '../../../../Store/ActionCreators/vote';
import Dismissed from './Dismissed';
import Saved from './Saved';
import Upvoted from './Upvoted';

function MyActivity() {
	const choices = ['saved', 'upvoted', 'dismissed'];
	const categories = ['book', 'group', 'electronic', 'other', 'skill'];
	const [value, setValue] = useState(0);
	const [category, setCategory] = useState(0);
	const [cards, setCards] = useState([]);
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();
	useEffect(() => {
		setLoading(true);
		setCards([]);
		const data = {
			category: categories[category],
			choice: choices[value],
		};
		dispatch(fetchVotedPosts(data)).then(res => {
			setCards(res);
			setLoading(false);
		});
	}, [dispatch, value, category]);

	return (
		<Container fluid className="p-3 bg-light h-100">
			<Paper>
				<Tabs
					value={value}
					onChange={(e, value) => setValue(value)}
					indicatorColor="primary"
					textColor="primary"
					centered
				>
					<Tab label="Saved" />
					<Tab label="Upvoted" />
					<Tab label="Dismissed" />
				</Tabs>
			</Paper>
			<Row className="mt-3">
				<Col md={2}>
					<Paper>
						<Tabs
							value={category}
							onChange={(e, value) => setCategory(value)}
							indicatorColor="primary"
							textColor="primary"
							orientation="vertical"
							centered
						>
							<Tab label="Books" />
							<Tab label="Groups" />
							<Tab label="Electronics" />
							<Tab label="Other" />
							<Tab label="Skill" />
						</Tabs>
					</Paper>
				</Col>
				<Col>
					<TabPanel
						value={value}
						cards={cards}
						category={category}
						loading={loading}
						index={0}
					>
						<Saved />
					</TabPanel>
					<TabPanel
						value={value}
						cards={cards}
						category={category}
						loading={loading}
						index={1}
					>
						<Upvoted />
					</TabPanel>
					<TabPanel
						value={value}
						cards={cards}
						category={category}
						loading={loading}
						index={2}
					>
						<Dismissed />
					</TabPanel>
				</Col>
			</Row>
		</Container>
	);
}

function TabPanel(props) {
	const { children, value, index, ...other } = props;
	return (
		<>
			{value === index && (
				<div {...other}>
					{value === index && (
						<Box p={3}>
							{React.Children.map(children, (child, i) => {
								return React.cloneElement(child, {
									...props,
									index: i,
								});
							})}
						</Box>
					)}
				</div>
			)}
		</>
	);
}
export default MyActivity;
