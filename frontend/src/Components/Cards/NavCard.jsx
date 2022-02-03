import { NavLink } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import { Icon, List } from 'semantic-ui-react';

function NavCard(props) {
	const { active } = props;
	return (
		<Container className="sticky-top" style={{ zIndex: 1 }}>
			<Row className="shadow bg-white  p-3 mt-5">
				<Col>
					<hr />
					<List link size="big">
						<List.Item active={active === 'feed'} className="mb-3">
							<NavLink to="/feed">
								<Icon name="feed" size="large" />
								<p className="d-none d-lg-inline">Posts</p>
							</NavLink>
						</List.Item>
						<List.Item active={active === 'create'} className="mb-3">
							<NavLink to="/create">
								<Icon name="add circle" size="large" />
								<p className="d-none d-lg-inline">Create</p>
							</NavLink>
						</List.Item>
						<List.Item active={active === 'interest'} className="mb-3">
							<NavLink to="/interest">
								<Icon name="users" size="large" />
								<p className="d-none d-lg-inline">Interested</p>
							</NavLink>
						</List.Item>
						<List.Item active={active === 'myposts'} className="mb-3">
							<NavLink to="/myposts">
								<Icon name="zip" size="large" />
								<p className="d-none d-lg-inline"> My Posts</p>
							</NavLink>
						</List.Item>
					</List>
					<hr />
				</Col>
			</Row>
		</Container>
	);
}

export default NavCard;
