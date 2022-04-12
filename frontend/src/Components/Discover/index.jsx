import { Col, Container, Row } from 'reactstrap';
import Meta from '../Meta';
import Search from './Search';
import TopUsers from './TopUsers';

function Discover() {
	return (
		<Container fluid className="p-3 bg-light h-100">
			<Meta head="Discover | ShareIIIT" />
			<Row className="justify-content-center">
				<Col md={10}>
					<Container
						fluid
						className="shadow my-3 py-4 rounded_lg bg-white align-items-center">
						<TopUsers />
						<Search />
					</Container>
				</Col>
			</Row>
		</Container>
	);
}

export default Discover;
