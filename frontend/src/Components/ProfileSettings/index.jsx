import BookmarksIcon from '@mui/icons-material/Bookmarks';
import GridOnIcon from '@mui/icons-material/GridOn';
import PeopleIcon from '@mui/icons-material/People';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import { fetchUser, fetchUserOSA } from '../../Store/ActionCreators/user';
import Meta from '../Meta';
import BasicDetails from './BasicDetails';
import Skills from './Skills';

function Profile(props) {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchUserOSA());
		dispatch(fetchUser());
	}, [dispatch]);

	return (
		<Container fluid className="p-3 bg-light h-100">
			<Meta head="Profile | ShareIIITD" />
			<Container>
				<Row>
					<Col className="d-flex justify-content-around">
						<NavLink
							className="mr-2 rounded-pill text-iiitd border p-3 border-info"
							to={`/profile/following`}>
							<PeopleIcon /> Following
						</NavLink>
						<NavLink
							className="mr-2 rounded-pill text-iiitd border p-3 border-info"
							to={'/profile/myposts'}>
							<GridOnIcon /> My Posts
						</NavLink>
						<NavLink
							className="mr-2 rounded-pill text-iiitd border p-3 border-info"
							to={'/profile/myactivity'}>
							<BookmarksIcon /> My Activity
						</NavLink>
					</Col>
				</Row>

				<BasicDetails />
				<Skills />
			</Container>
		</Container>
	);
}

export default Profile;
