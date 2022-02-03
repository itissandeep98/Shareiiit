import { Col, Container, Row } from 'reactstrap';
import { Image } from 'semantic-ui-react';
import Login from './Login';
import './style.scss';

function AuthComp(props) {
	return (
		<div
			className="align-items-center bg-gradient px-3 pt-5"
			style={{ minHeight: '100vh' }}
		>
			<Container className="py-4">
				<Row
					className="bg-white py-5 rounded-lg shadow"
					style={{ minHeight: '80vh' }}
				>
					<Col
						xs={12}
						lg={6}
						className="align-items-center d-flex justify-content-center"
					>
						<Image
							src={process.env.PUBLIC_URL + '/assets/images/auth-image.png'}
							alt="ShareIIITD"
							size="large"
						/>
					</Col>
					<Col className="align-items-center d-flex justify-content-center">
						<div className="w-100 text-center">
							<h1 className="text-info text-grad">ShareIIITD</h1>

							<Login />
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default AuthComp;
