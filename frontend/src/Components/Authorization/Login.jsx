import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { Button, Form, Input } from 'semantic-ui-react';
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
			<Form>
				<Form.Field required>
					<Input
						placeholder="Username"
						value={username}
						onChange={e => setUsername(e.target.value)}
					/>
				</Form.Field>
				<Form.Field required>
					<Input
						type="password"
						placeholder="Password"
						value={paswd}
						onChange={e => setPaswd(e.target.value)}
					/>
				</Form.Field>
				{loading ? <Spinner /> : <Button onClick={handleSubmit}>Login</Button>}
			</Form>
			<hr />
			{/* <NavLink to="/register">Not Registered? Register Here</NavLink> */}
		</>
	);
}

export default withRouter(Login);
