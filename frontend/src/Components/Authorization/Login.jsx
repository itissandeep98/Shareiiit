import { TextField, Button } from '@mui/material';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import {
	loginAction,
	loginCookieAction,
} from '../../Store/ActionCreators/auth';
import { showAlert } from '../../Utils/showAlert';
import Meta from '../Meta';

function Login(props) {
	const dispatch = useDispatch();
	const [username, setUsername] = useState('');
	const [paswd, setPaswd] = useState('');
	const [loading, setLoading] = useState(false);
	const handleSubmit = e => {
		e.preventDefault();
		const data = {
			username: username,
			password: paswd,
		};
		setLoading(true);
		dispatch(loginAction(data)).then(res => {
			setLoading(false);
			props.history.push('/feed');
		});
	};
	useEffect(() => {
		if (Cookies.get('osa_token')) {
			setLoading(true);
			showAlert('OSA login found, logging you in...', 'success');
			dispatch(loginCookieAction(Cookies.get('osa_token'))).then(res => {
				setLoading(false);
				props.history.push('/feed');
			});
		}
	}, []);

	return (
		<>
			<Meta head="Login | ShareIIITD" />
			<h1 className=" display-5">Login</h1>
			<form>
				<TextField
					label="Username"
					variant="outlined"
					className="mb-3"
					required
					fullWidth
					value={username}
					onChange={e => setUsername(e.target.value)}
					name="username"
				/>
				<TextField
					type="password"
					label="Password"
					variant="outlined"
					className="mb-3"
					required
					fullWidth
					value={paswd}
					onChange={e => setPaswd(e.target.value)}
					name="password"
				/>

				<Button onClick={handleSubmit} variant="contained">
					{loading ? <Spinner /> : 'Login'}
				</Button>
			</form>
			<hr />
			{/* <NavLink to="/register">Not Registered? Register Here</NavLink> */}
		</>
	);
}

export default withRouter(Login);
