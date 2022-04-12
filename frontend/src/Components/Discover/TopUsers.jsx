import { Chip } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Col, Row, Spinner } from 'reactstrap';
import { fetchTopPeople } from '../../Store/ActionCreators/people';

function TopUsers() {
	const dispatch = useDispatch();
	const [topPeople, setTopPeople] = useState(null);
	useEffect(async () => {
		setTopPeople(await dispatch(fetchTopPeople()));
	}, []);

	return (
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
	);
}

export default TopUsers;
