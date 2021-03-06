import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import {
	Collapse,
	Container,
	Nav,
	Navbar,
	NavbarToggler,
	NavItem,
	Row,
} from 'reactstrap';
import { logoutAction } from '../../Store/ActionCreators/auth';
import { fetchUser, fetchUserOSA } from '../../Store/ActionCreators/user';
import Notification from '../Notification';
import './style.css';

function TopHeader() {
	const dispatch = useDispatch();
	const [isNavOpen, setIsNavOpen] = useState(false);
	useEffect(() => {
		dispatch(fetchUser());
		dispatch(fetchUserOSA());
	}, [dispatch]);

	const toggleNav = () => {
		setIsNavOpen(!isNavOpen);
	};
	const logout = e => {
		e.preventDefault();
		dispatch(logoutAction());
	};
	return (
		<>
			<Container>
				<Row className="d-flex flex-row justify-content-between align-items-center">
					<div>
						<img
							src={process.env.PUBLIC_URL + '/assets/images/iiitd2.png'}
							alt="IIIT-Delhi"
							className="img-fluid d-none d-lg-inline"
						/>
					</div>
					<img
						src={process.env.PUBLIC_URL + '/assets/images/logo.png'}
						alt="resource sharing app"
						size="medium"
						style={{ height: '50px' }}
						className="img-fluid d-none d-lg-inline"
					/>
				</Row>
			</Container>
			<Navbar dark expand="md" className="p-0 sticky-top">
				<Container>
					<NavbarToggler onClick={toggleNav} />
					<Collapse isOpen={isNavOpen} navbar className="p-0">
						<Nav navbar>
							<NavItem>
								<NavLink className="nav-link p-3 cust_link" to="/feed">
									Feed
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink className="nav-link p-3 cust_link" to="/technical">
									Skills
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink className="nav-link p-3 cust_link" to="/profile">
									Profile
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink className="nav-link p-3 cust_link" to="/discover">
									Discover
								</NavLink>
							</NavItem>
						</Nav>
						<Nav className="ml-auto" navbar>
							{/* <NavItem>
								<a
									className="nav-link p-3 "
									href="https://forms.gle/Fh641DgMdrveindm9"
									target="_blank"
									rel="noopener noreferrer">
									<p className="d-md-none">Feedback</p>
									<i className="fa fa-comment fa-lg d-none d-md-inline-block" />
								</a>
							</NavItem> */}
							<NavItem>
								<Notification />
							</NavItem>
							<NavItem>
								<NavLink className="nav-link p-3" to="#" onClick={logout}>
									Logout
								</NavLink>
							</NavItem>
						</Nav>
					</Collapse>
				</Container>
			</Navbar>
		</>
	);
}

export default withRouter(TopHeader);
