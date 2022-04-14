import { Chip } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Col, Row, Spinner } from 'reactstrap';
import { fetchTopPeople } from '../../Store/ActionCreators/people';
import UserCard from './UserCard';

function TopUsers() {
	const dispatch = useDispatch();
	const [topPeople, setTopPeople] = useState(null);
	useEffect(async () => {
		setTopPeople(await dispatch(fetchTopPeople()));
	}, []);

	return (
		<Row>
			<Col>
				<h2>Popular Users</h2>
				{topPeople ? (
					<Row className="text-break">
						{topPeople?.map(user => (
							<Col sm={6} md={4} lg={3} className="my-2" key={Math.random()}>
								<UserCard user={user} />
							</Col>
						))}
					</Row>
				) : (
					<p className="text-muted">
						<Spinner size="sm" /> Fetching Popular users
					</p>
				)}
			</Col>
		</Row>
	);
}

export default TopUsers;
