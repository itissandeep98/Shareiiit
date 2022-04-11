import { Chip } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Col, Container, Row, Spinner } from 'reactstrap';
import { fetchTopPeople } from '../../Store/ActionCreators/people';
import Meta from '../Meta';

function Discover() {
	const dispatch = useDispatch();
	const [topPeople, setTopPeople] = useState(null);
	useEffect(async () => {
		setTopPeople(await dispatch(fetchTopPeople()));
	}, []);

	return (
		<Container fluid className="p-3 bg-light h-100">
			<Meta head="Discover | ShareIIIT" />
			<Row className="justify-content-center">
				<Col md={10}>
					<Container
						fluid
						className="shadow my-3 py-4 rounded_lg bg-white align-items-center">
						<Row>
							<Col>
								<h2>Most Popular Users</h2>
								{topPeople ? (
									<div className="text-break">
										{topPeople?.map(user => (
											<Chip
												label={
													<NavLink to={`/${user.username}`}>
														{user?.first_name} {user?.last_name}
													</NavLink>
												}
												size="medium"
												className="m-1"
												key={Math.random()}
											/>
										))}
									</div>
								) : (
									<p className="text-muted">
										<Spinner size="sm" /> Fetching Popular users
									</p>
								)}
							</Col>
						</Row>
					</Container>
				</Col>
			</Row>
		</Container>
	);
}

export default Discover;
