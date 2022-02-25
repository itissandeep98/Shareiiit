import React from 'react';
import { NavLink } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import './style.css';
function Notfound() {
	return (
		<Container fluid className="mt-4">
			<Row>
				<Col md={4}>
					<img
						src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4424790/Mirror.png"
						alt="404 Image"
						className="img-fluid"
					/>
				</Col>
				<Col className="notfound d-flex align-items-center flex-column justify-content-center">
					<h1>Sorry!</h1>
					<p>
						Either you aren't cool enough to visit this page or it doesn't exist{' '}
						<em>. . . like your social life.</em>
					</p>
					<NavLink to="/feed">You can go now!</NavLink>
				</Col>
			</Row>
		</Container>
	);
}

export default Notfound;
