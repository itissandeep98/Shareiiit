import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Col, Container, Row, Spinner } from 'reactstrap';
import { fetchUserFollowers } from '../../Store/ActionCreators/user';
import { UserResult } from '../Discover/Search';

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
					{!users && (
						<p className="text-muted">
							<Spinner size="sm" /> Fetching your following list !!{' '}
						</p>
					)}
					{users?.length > 0 ? (
						<div className="text-break">
							{users?.map(user => (
								<UserResult user={user.user} />
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
