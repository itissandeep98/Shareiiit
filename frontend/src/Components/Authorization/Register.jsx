import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Button, Form, Input } from 'semantic-ui-react';
import { registerAction } from '../../Store/ActionCreators/auth';

function Register() {
	const dispatch = useDispatch();
	const [username, setUsername] = useState('');
	const [first, setFirst] = useState('');
	const [last, setLast] = useState('');
	const [paswd, setPaswd] = useState('');
	const [cnfpswd, setCnfpswd] = useState('');
	const handleSubmit = e => {
		e.preventDefault();
		const data = {
			username: username,
			first_name: first,
			last_name: last,
			password: paswd,
		};
		dispatch(registerAction(data));
	};

	return (
		<>
			<h1 className=" display-5">Register</h1>
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
						placeholder="First Name"
						value={first}
						onChange={e => setFirst(e.target.value)}
					/>
				</Form.Field>
				<Form.Field required>
					<Input
						placeholder="Last Name"
						value={last}
						onChange={e => setLast(e.target.value)}
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
				<Form.Field required>
					<Input
						type="password"
						placeholder="Confirm Password"
						value={cnfpswd}
						onChange={e => setCnfpswd(e.target.value)}
						error={paswd !== cnfpswd}
					/>
				</Form.Field>
				<Button onClick={handleSubmit}>Register</Button>
			</Form>
			<hr />
			<NavLink to="/login">Already Registered? Login Here</NavLink>
		</>
	);
}

export default Register;
