import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row, Spinner } from 'reactstrap';
import { fetchMyPosts } from '../../../../Store/ActionCreators/post';
import ExpiredCard from './ExpiredCard';
import MyPostCard from './MyPostCard';

function PostList({ category }) {
	const dispatch = useDispatch();
	const posts = useSelector(state => state.user?.[category]);
	const [cards, setCards] = useState(posts ?? []);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		setLoading(true);
		dispatch(fetchMyPosts({ category })).then(res => {
			setCards(res);
			setLoading(false);
		});
	}, [dispatch, category]);

	return (
		<Container fluid>
			{loading && (
				<div className="text-muted text-center">
					<Spinner /> Fetching new data
				</div>
			)}
			<Row>
				{cards && cards.length > 0 ? (
					cards.map((card, index) => (
						<Col md={6} lg={4} className="my-2" key={card.id}>
							{card.is_expired ? (
								<ExpiredCard details={card} />
							) : (
								<MyPostCard details={card} />
							)}
						</Col>
					))
				) : (
					<p className="text-muted p-3">No Cards Here !!!</p>
				)}
			</Row>
		</Container>
	);
}

export default PostList;
