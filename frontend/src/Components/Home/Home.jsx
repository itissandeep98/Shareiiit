import { Col, Container, Row } from 'reactstrap';
import { Image } from 'semantic-ui-react';
import ProfileCard from '../Cards/ProfileCard';
import SummaryCard from '../Cards/SummaryCard';
import Meta from '../Meta';
import Faq from './Faq';

function Home(props) {
	return (
		<Container fluid className="p-3 bg-light h-100">
			<Meta head="Home | ShareIIITD" />
			<br />
			<Row>
				<Image
					fluid
					src={process.env.PUBLIC_URL + '/assets/images/campus.jpg'}
				/>
			</Row>
			<Row className="d-flex justify-content-center h-100 ">
				<Col sm={3} xl={2} className="mb-2">
					<ProfileCard />
				</Col>
				<Col sm={4} xl={3} className="mb-2">
					<SummaryCard
						image={process.env.PUBLIC_URL + '/assets/images/book.png'}
						title="Most Active Category"
						key="category"
					/>
				</Col>
				<Col sm={4} xl={3} className="mb-2">
					<SummaryCard
						image={process.env.PUBLIC_URL + '/assets/images/book.png'}
						title="Recent Activity"
						key="activity"
					/>
				</Col>
			</Row>
			<Row className="mt-5">
				<Faq />
			</Row>
			<br />
			<br />
		</Container>
	);
}

export default Home;
