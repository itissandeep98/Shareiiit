import { Chip } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import { fetchUserFollowers } from '../../Store/ActionCreators/user';

function Following() {
	const dispatch = useDispatch();
	const [users, setUsers] = useState(null);

	useEffect(() => {
		dispatch(fetchUserFollowers()).then(res => {
			setUsers(res);
		});
	}, []);

	return (
		<Container>
			<Row>
				<Col className="shadow mt-3 p-3 rounded_lg">
					<h3>Following List</h3>
					{users ? (
						<div className="text-break">
							{users?.map(user => (
								<Chip
									label={
										<NavLink to={`/${user.user.username}`}>
											{user.user?.first_name} {user.user?.last_name}
										</NavLink>
									}
									size="medium"
									key={Math.random()}
								/>
							))}
						</div>
					) : (
						<p>You don't follow anyone yet</p>
					)}
				</Col>
			</Row>
		</Container>
	);
}

export default Following;
