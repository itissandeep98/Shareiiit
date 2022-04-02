import { Col, Container, Row, Spinner } from 'reactstrap';
import Meta from '../../../Meta';
import BookCard from '../../../Posts/Cards/BookCard';
import ElectronicsCard from '../../../Posts/Cards/ElectronicsCard';
import GroupCard from '../../../Posts/Cards/GroupCard';
import OtherCard from '../../../Posts/Cards/OtherCard';
import TechCard from '../../../Technical/TechCard';

function Saved(props) {
	const { cards, loading, category } = props;
	return (
		<Container fluid className="py-4 h-100 rounded_lg bg-white">
			<Meta head="Saved Posts | ShareIIIT" />
			<Row>
				<Col>
					<h1>Saved Posts</h1>
					<hr />
					{loading && (
						<div className="text-muted text-center">
							<Spinner /> Fetching new data
						</div>
					)}
					<Row>
						{cards === undefined || cards?.length == 0 ? (
							<Col>
								<h3 className="text-muted"> Nothing to show here</h3>
							</Col>
						) : (
							<>
								{cards?.map((card, index) => (
									<Col xs={12} md={6} lg={4} className="my-3" key={index}>
										{category === 0 && <BookCard {...card} />}
										{category === 1 && <GroupCard {...card} />}
										{category === 2 && <ElectronicsCard {...card} />}
										{category === 3 && <OtherCard {...card} />}
										{category === 4 && <TechCard {...card} />}
									</Col>
								))}
							</>
						)}
					</Row>
				</Col>
			</Row>
		</Container>
	);
}

export default Saved;
