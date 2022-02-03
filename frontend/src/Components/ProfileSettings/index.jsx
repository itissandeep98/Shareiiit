import BookmarksIcon from '@mui/icons-material/Bookmarks';
import GridOnIcon from '@mui/icons-material/GridOn';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
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
	const history = useHistory();

	return (
		<Container fluid className="p-3 bg-light h-100">
			<Meta head="Profile | ShareIIITD" />
			<Container>
				<Row>
					<Col className="d-flex justify-content-end">
						<Button
							variant="outlined"
							className="mr-2 rounded-pill text-iiitd"
							startIcon={<GridOnIcon />}
							size="large"
							onClick={() => history.push('/profile/myposts')}>
							My Posts
						</Button>
						<Button
							variant="outlined"
							className="float-right rounded-pill text-iiitd"
							startIcon={<BookmarksIcon />}
							size="large"
							onClick={() => history.push('/profile/myactivity')}>
							My Activity
						</Button>
					</Col>
				</Row>

				<BasicDetails />
				<Skills />
			</Container>
		</Container>
	);
}

export default Profile;
