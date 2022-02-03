import { Button, List, ListItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row, Spinner } from 'reactstrap';
import {
	fetchPeople,
	followPeople,
	unfollowPeople,
} from '../../Store/ActionCreators/people';
import CustomImage from '../../Utils/CustomImage';
import Meta from '../Meta';
import Notfound from '../NotFound/Notfound';
import Contact from './Contact';
import Skills from './Skills';

function Profile(props) {
	const { user } = props.match.params;
	const dispatch = useDispatch();
	const [details, setDetails] = useState(null);
	const [loading, setLoading] = useState(false);
	const username = useSelector(state => state.user?.osadetails?.username);

	useEffect(() => {
		updateData();
	}, [dispatch]);

	const updateData = () => {
		dispatch(fetchPeople(user)).then(res => {
			setDetails(res);
			setLoading(false);
		});
	};

	const handleFollow = () => {
		setLoading(true);
		if (details.following.state) {
			dispatch(unfollowPeople({ id: details?.following?.id })).then(res =>
				updateData()
			);
		} else {
			dispatch(followPeople({ id: details.id })).then(res => updateData());
		}
		setDetails({ ...details, following: { state: !details?.following.state } });
	};
	if (details === undefined) {
		return <Notfound />;
	}

	return (
		<Container fluid className="p-3 bg-light h-100">
			{details ? (
				<Container className="shadow my-3 py-4 rounded_lg bg-white align-items-center">
					<Meta head={`${details.username} | ShareIIITD`} />
					<Row className=" align-items-center">
						<Col xs={12} md={3} className=" text-center">
							<CustomImage
								src={
									details.profile?.image ??
									process.env.PUBLIC_URL + '/assets/images/user.png'
								}
							/>
							<div className="d-flex align-items-center flex-row  justify-content-around">
								<p className="text-muted pt-3">
									{details?.profile?.follower_count} Follower
									{details?.profile?.follower_count > 1 && 's'}
								</p>
								{username !== user && (
									<Button
										variant="text"
										className="text-iiitd"
										disabled={loading}
										onClick={handleFollow}>
										{loading ? (
											<Spinner size="sm" />
										) : (
											<>{details?.following.state ? 'Following' : 'Follow'}</>
										)}
									</Button>
								)}
							</div>
						</Col>
						<Col>
							<h2 className="d-inline">{details?.username}</h2>
							<Contact {...details?.profile} />
							<hr />
							<List>
								<ListItem className="text-capitalize">
									{details?.first_name} {details?.last_name}
								</ListItem>

								<ListItem>{details?.profile?.bio}</ListItem>
							</List>
							<Skills user={user} />
						</Col>
					</Row>
				</Container>
			) : (
				<p className="text-center text-muted">
					<Spinner size="sm" /> Loading Profile
				</p>
			)}
		</Container>
	);
}

export default Profile;
