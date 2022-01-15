import { Col, Container, Row } from "reactstrap";
import { useDispatch } from "react-redux";
import { Icon, Image } from "semantic-ui-react";
import { Chip, List, ListItem } from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import {
	fetchPeople,
	fetchPeopleSkills,
} from "../../Store/ActionCreators/people";
import { useEffect, useState } from "react";
import Meta from "../Meta";
import { NavLink } from "react-router-dom";
import ImagePopup from "../../Utils/ImagePopup";

function Profile(props) {
	const { user } = props.match.params;
	const [modal, setModal] = useState(false);
	const dispatch = useDispatch();
	const [details, setDetails] = useState(null);
	const [skills, setSkills] = useState([]);
	useEffect(() => {
		dispatch(fetchPeople(user)).then((res) => {
			setDetails(res);
		});
		dispatch(fetchPeopleSkills(user)).then((res) => {
			setSkills(res);
		});
	}, [dispatch]);

	return (
		<>
			<ImagePopup
				image={
					details?.profile?.image ??
					process.env.PUBLIC_URL + "/assets/images/user.png"
				}
				open={modal}
				onClose={() => setModal(!modal)}
			/>
			<Container fluid className="p-3 bg-light h-100">
				{details && (
					<Container className="shadow my-3 py-4 rounded_lg bg-white align-items-center">
						<Meta head={`${details.username} | ShareIIITD`} />
						<Row className=" align-items-center">
							<Col xs={12} md={3} className="d-none d-md-block ">
								<Image
									onClick={() => setModal(!modal)}
									src={
										details.profile?.image ??
										process.env.PUBLIC_URL + "/assets/images/user.png"
									}
								/>
							</Col>
							<Col>
								<h2 className="d-inline">
									{details?.username}
									<div className="d-inline ml-2 d-md-none">
										<Image
											onClick={() => setModal(!modal)}
											src={
												details.profile?.image ??
												process.env.PUBLIC_URL + "/assets/images/user.png"
											}
											avatar
										/>
									</div>
								</h2>
								<div className="float-right d-inline">
									{details?.profile?.telegram_url && (
										<a
											href={details?.profile?.telegram_url}
											target="_blank"
											rel="noopener noreferrer"
										>
											<Icon name="telegram" size="big" />
										</a>
									)}
									{details?.profile?.linkedin_url && (
										<a
											href={details?.profile?.linkedin_url}
											target="_blank"
											rel="noopener noreferrer"
										>
											<Icon name="linkedin" size="big" />
										</a>
									)}
									{details?.profile?.phone_number && (
										<a
											href={`tel:${details?.profile?.phone_number}`}
											target="_blank"
											rel="noopener noreferrer"
										>
											<Icon name="phone" size="big" />
										</a>
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
										<div className="d-flex flex-row align-items-center justify-content-center">
											{skills?.map((term) => (
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
		</>
	);
}

export default Profile;
