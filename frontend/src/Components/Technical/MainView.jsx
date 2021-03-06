import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Button, Chip, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Col, Container, Row, Spinner } from 'reactstrap';
import {
	fetchNextSkillPosts,
	fetchSkillPosts,
} from '../../Store/ActionCreators/skill';
import FilterBar from './FilterBar';
import TechCard from './TechCard';

function MainView(props) {
	const { tags, modifyTags } = props;
	const { next } = props.skill;
	const [cards, setCards] = useState(props.skill.skills ?? []);
	const [moreLoading, setMoreLoading] = useState(false);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchSkillPosts()).then(res => {
			setCards(res);
		});
	}, [dispatch]);

	const fetchMore = () => {
		setMoreLoading(true);
		dispatch(fetchNextSkillPosts(next)).then(res => {
			setCards([...cards, ...res]);
			setMoreLoading(false);
		});
	};

	useEffect(() => {
		const allCards = props.skill.skills ?? [];
		const temp = allCards.filter(card => tags.includes(card.skill.label));
		if (temp.length > 0) {
			setCards(temp);
		} else if (tags.length > 0) {
			setCards([]);
		} else {
			setCards(allCards);
		}
	}, [tags]);

	return (
		<Container className="bg-white p-3 rounded_lg shadow">
			<FilterBar setCards={setCards} />
			<Row>
				<Col>
					{tags.map((tag, i) => (
						<Tooltip
							title={tag}
							placement="top"
							key={tag}
							className="mx-1 my-2">
							<Chip
								label={tag}
								onDelete={() => modifyTags(tag)}
								deleteIcon={<HighlightOffIcon />}
							/>
						</Tooltip>
					))}
				</Col>
			</Row>
			<Row className="mt-3">
				{!cards && (
					<p className="text-muted p-2">
						<Spinner size={'sm'} /> Loading Posts
					</p>
				)}
				{cards?.length > 0 ? (
					cards?.map(card => (
						<Col md={4} className="mt-4">
							<TechCard {...card} />
						</Col>
					))
				) : (
					<p className="text-center text-muted w-100">No Results Found !!</p>
				)}
			</Row>
			<Row className="mt-3 d-flex justify-content-center">
				{next && (
					<Button
						variant="contained"
						size="small"
						disabled={moreLoading}
						onClick={fetchMore}>
						Show More <i className="fa fa-caret-down ml-2" />
					</Button>
				)}
			</Row>
		</Container>
	);
}
const mapStateToProps = state => ({
	skill: state.skill,
});

export default connect(mapStateToProps)(MainView);
