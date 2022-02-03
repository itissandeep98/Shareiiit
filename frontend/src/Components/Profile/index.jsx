import FaceIcon from '@mui/icons-material/Face';
import { Button, Chip, List, ListItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import { Icon } from 'semantic-ui-react';
import {
	fetchPeople,
	fetchPeopleSkills,
} from '../../Store/ActionCreators/people';
import CustomImage from '../../Utils/CustomImage';
import { showAlert } from '../../Utils/showAlert';
import Meta from '../Meta';

function Profile(props) {
	const { user } = props.match.params;
	const dispatch = useDispatch();
	const [details, setDetails] = useState(null);
	const [skills, setSkills] = useState([]);
	useEffect(() => {
		dispatch(fetchPeople(user)).then(res => {
			setDetails(res);
		});
		dispatch(fetchPeopleSkills(user)).then(res => {
			setSkills(res);
		});
	}, [dispatch]);

	const copyToClipboard = textToCopy => {
		if (navigator.clipboard && window.isSecureContext) {
			return navigator.clipboard.writeText(textToCopy);
		} else {
			// text area method
			let textArea = document.createElement('textarea');
			textArea.value = textToCopy;
			// make the textarea out of viewport
			textArea.style.position = 'fixed';
			textArea.style.left = '-999999px';
			textArea.style.top = '-999999px';
			document.body.appendChild(textArea);
			textArea.focus();
			textArea.select();
			return new Promise((res, rej) => {
				// here the magic happens
				document.execCommand('copy') ? res() : rej();
				textArea.remove();
			});
		}
	};

	return (
		<Container fluid className="p-3 bg-light h-100">
			{details && (
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
									{details?.profile?.follower_count} Followers
								</p>
								<Button variant="text" className="text-iiitd">
									{details?.following.state ? 'Following' : 'Follow'}
								</Button>
							</div>
						</Col>
						<Col>
							<h2 className="d-inline">{details?.username}</h2>
							<div className="float-right d-inline">
								{details?.profile?.telegram_url && (
									<a
										href={details?.profile?.telegram_url}
										target="_blank"
										rel="noopener noreferrer">
										<Icon name="telegram" size="big" />
									</a>
								)}
								{details?.profile?.linkedin_url && (
									<a
										href={details?.profile?.linkedin_url}
										target="_blank"
										rel="noopener noreferrer">
										<Icon name="linkedin" size="big" />
									</a>
								)}
								{details?.profile?.phone_number && (
									<buton
										onClick={() => {
											copyToClipboard(`${details?.profile?.phone_number}`);
											showAlert('Phone Number Copied to Clipboard');
										}}>
										<a>
											<Icon name="phone" size="big" />
										</a>
									</buton>
								)}
							</div>
							<hr />
							<List>
								<ListItem className="text-capitalize">
									{details?.first_name} {details?.last_name}
								</ListItem>

								<ListItem>{details?.profile?.bio}</ListItem>
							</List>
							{skills.length > 0 && (
								<div className="text-center ">
									<h3>Knows About</h3>
									<div className="text-break">
										{skills?.map(term => (
											<NavLink to={`/skill/${term.id}`} key={term.id}>
												<Chip
													label={term.skill.label}
													className="m-1 btn "
													icon={<FaceIcon />}
													key={Math.random()}
												/>
											</NavLink>
										))}
									</div>
								</div>
							)}
						</Col>
					</Row>
				</Container>
			)}
		</Container>
	);
}

export default Profile;
