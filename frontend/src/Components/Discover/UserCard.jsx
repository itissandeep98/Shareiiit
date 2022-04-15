import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import CustomImage from '../../Utils/CustomImage';

function UserCard({ user }) {
	const [imgErr, setImgErr] = useState(false);

	return (
		<Container className=" bg-white py-2 rounded_lg h-100 card_hover border">
			<Row>
				<Col className="justify-content-center d-flex">
					<div
						style={{ height: '6rem', width: '6rem', borderRadius: '50%' }}
						className="overflow-hidden">
						<CustomImage
							src={
								!imgErr
									? user.image ??
									  process.env.PUBLIC_URL + '/assets/images/user.png'
									: process.env.PUBLIC_URL + '/assets/images/user.png'
							}
							onError={e => setImgErr(true)}
							className="h-100 w-100"
							style={{
								objectFit: 'cover',
							}}
						/>
					</div>
				</Col>
			</Row>
			<Row>
				<Col className="text-center mt-2">
					<NavLink to={`/${user.username}`}>
						<p className="text-muted">{user?.name}</p>
					</NavLink>
				</Col>
			</Row>
			<hr />
			<Row>
				<Col>
					<NavLink to={`/${user.username}`}>
						<small className="text-muted">
							{user.bio ? (
								<>
									{user.bio?.slice(0, 70)}{' '}
									{user.bio?.length > 70 && (
										<p className="text-info">... see more</p>
									)}
								</>
							) : (
								<p>Too modest to write something here ;)</p>
							)}
						</small>
					</NavLink>
				</Col>
			</Row>
		</Container>
	);
}

export default UserCard;
