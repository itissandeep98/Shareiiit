import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Col, Container, Row, Spinner } from 'reactstrap';
import { fetchNextPosts, fetchPosts } from '../../Store/ActionCreators/post';
import Meta from '../Meta';
import BookCard from '../Posts/Cards/BookCard';
import ElectronicsCard from '../Posts/Cards/ElectronicsCard';
import GroupCard from '../Posts/Cards/GroupCard';
import OtherCard from '../Posts/Cards/OtherCard';
import Create from '../Posts/Create/Create';
import FilterBar from './FilterBar';

const CardTemplates = {
	book: BookCard,
	group: GroupCard,
	electronic: ElectronicsCard,
	other: OtherCard,
};

function Posts(props) {
	const [cards, setCards] = useState([]);
	const [category, setCategory] = useState('book');
	const [next, setNext] = useState(false);
	const [ordering, setOrdering] = useState('created_at');
	const [is_request, setRequest] = useState(0);
	const [modal, setModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [moreLoading, setMoreLoading] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		setLoading(true);
		setCards([]);
		if (is_request === 0) {
			dispatch(fetchPosts({ category, ordering })).then(res => {
				setCards(res.results);
				setNext(res.next);
				setLoading(false);
			});
		} else {
			dispatch(fetchPosts({ category, ordering, is_request })).then(res => {
				setCards(res.results);
				setNext(res.next);
				setLoading(false);
			});
		}
	}, [category, ordering, is_request]);

	const fetchMore = () => {
		setMoreLoading(true);
		dispatch(
			fetchNextPosts({ category, ordering, is_request, page: next })
		).then(res => {
			setCards([...cards, ...res.results]);
			setNext(res.next);
			setMoreLoading(false);
		});
	};

	return (
		<Container fluid className="p-3 bg-light h-100">
			<Meta head="Feed | ShareIIITD" />
			<Row className="justify-content-center">
				<Col md={10}>
					<Container
						fluid
						className="shadow my-3 py-4 rounded_lg bg-white align-items-center">
						<Row>
							<Col className="text-center">
								<Create
									modal={modal}
									setModal={setModal}
									trigger={
										<Button
											variant="outlined"
											className="mt-3 text-iiitd"
											startIcon={<AddIcon />}
											size="large"
											onClick={() => setModal(!modal)}>
											Create New Post
										</Button>
									}
								/>
							</Col>
						</Row>
						<Row>
							<Col>
								<br />
								<FilterBar
									setResult={setCards}
									category={category}
									setCategory={setCategory}
									ordering={ordering}
									setOrdering={setOrdering}
									request={is_request}
									setRequest={setRequest}
								/>
								<br />
								<Row>
									{cards && cards?.length > 0 ? (
										cards?.map(card => (
											<Col xs={12} md={6} lg={4} className="my-3" key={card.id}>
												{CardTemplates[card.category]({ ...card })}
											</Col>
										))
									) : (
										<p className="text-muted"> No Posts yet</p>
									)}
								</Row>
								<Row className="text-center d-flex justify-content-center mt-3">
									{next && cards?.length > 0 && (
										<Button
											variant="contained"
											size="small"
											disabled={moreLoading}
											onClick={fetchMore}>
											Show More <i className="fa fa-caret-down ml-2" />
										</Button>
									)}
								</Row>
								{loading && (
									<div className="text-muted text-center">
										<Spinner /> Fetching new data
									</div>
								)}
							</Col>
						</Row>
					</Container>
				</Col>
			</Row>
		</Container>
	);
}

export default Posts;
