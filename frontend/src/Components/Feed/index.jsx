import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Col, Container, Row, Spinner } from "reactstrap";
import { fetchPosts } from "../../Store/ActionCreators/post";
import FilterBar from "./FilterBar";
import AddIcon from "@mui/icons-material/Add";
import Create from "../Posts/Create/Create";
import Meta from "../Meta";
import BookCard from "../Posts/Cards/BookCard";
import GroupCard from "../Posts/Cards/GroupCard";
import ElectronicsCard from "../Posts/Cards/ElectronicsCard";
import OtherCard from "../Posts/Cards/OtherCard";

function Posts(props) {
	const [cards, setCards] = useState([]);
	const [category, setCategory] = useState("book");
	const [ordering, setOrdering] = useState("created_at");
	const [modal, setModal] = useState(false);

	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	useEffect(() => {
		setLoading(true);
		if (category) {
			dispatch(fetchPosts({ category, ordering })).then((res) => {
				setCards(res);
				setLoading(false);
			});
		} else {
			setCards([]);
			setLoading(false);
		}
	}, [category, ordering]);

	return (
		<Container fluid className="p-3 bg-light h-100">
			<Meta head="Feed | ShareIIITD" />
			<Row className="justify-content-center">
				<Col md={10}>
					<Container
						fluid
						className="shadow my-3 py-4 rounded_lg bg-white align-items-center"
					>
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
											onClick={() => setModal(!modal)}
										>
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
								/>
								<br />
								<Row>
									{cards && cards?.length > 0 ? (
										cards?.map((card) => (
											<Col xs={12} md={6} lg={4} className="my-3" key={card.id}>
												{category === "book" && <BookCard {...card} />}
												{category === "group" && <GroupCard {...card} />}
												{category === "electronics" && (
													<ElectronicsCard {...card} />
												)}
												{category === "other" && <OtherCard {...card} />}
											</Col>
										))
									) : (
										<p className="text-muted"> No Posts yet</p>
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

const mapStateToProps = (state) => ({
	posts: state.posts,
});

export default connect(mapStateToProps)(Posts);
