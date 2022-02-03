import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PhoneIcon from '@mui/icons-material/Phone';
import TelegramIcon from '@mui/icons-material/Telegram';
import {
	Button,
	FormControl,
	InputAdornment,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@mui/material';
import { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Col, Row } from 'reactstrap';
import { updateUser } from '../../Store/ActionCreators/user';
import ProfileUpload from './ProfileUpload';

function BasicDetails(props) {
	const dispatch = useDispatch();
	const [details, setDetails] = useState(props.user?.details);

	const onChange = e => {
		const { name, value } = e.target;
		setDetails({ ...details, [name]: value });
	};
	const updateDetails = () => {
		const { image, ...data } = details;
		dispatch(updateUser(data));
	};
	const osadetails = props.user?.osadetails;
	return (
		<Row className="shadow my-3 py-4 rounded_lg bg-white align-items-center poppins">
			<Col xs={12} md={3} lg={2} className="d-none d-md-block text-center">
				<ProfileUpload photo={details.image} osadetails={osadetails} />
			</Col>
			<Col className="poppins">
				<h2 className="poppins">
					Edit Basic Details
					<div className="d-inline ml-2 d-md-none">
						<ProfileUpload photo={details.image} osadetails={osadetails} />
					</div>
				</h2>
				<hr />
				<Row>
					<Col>
						<TextField
							label="Bio"
							className="mt-3"
							variant="outlined"
							fullWidth
							multiline
							rows={4}
							required
							onChange={onChange}
							name="bio"
							defaultValue={details?.bio}
							InputProps={{
								endAdornment: (
									<InputAdornment position="start">
										<AssignmentIndIcon />
									</InputAdornment>
								),
							}}
						/>
					</Col>
				</Row>
				<Row className="mt-3">
					<Col xs={12} md={6} className="mb-3">
						<FormControl variant="outlined" fullWidth>
							<InputLabel>Role</InputLabel>
							<Select
								label="Tag"
								value={details?.role}
								onChange={e =>
									setDetails({ ...details, role: e.target.value })
								}>
								<MenuItem value="Student">Student</MenuItem>
								<MenuItem value="Faculty">Faculty</MenuItem>
								<MenuItem value="Staff">Staff</MenuItem>
							</Select>
						</FormControl>
					</Col>
					<Col>
						<TextField
							type="number"
							label="Phone Number"
							fullWidth
							variant="outlined"
							fullWidth
							required
							onChange={onChange}
							name="phone_number"
							defaultValue={details?.phone_number}
							InputProps={{
								endAdornment: (
									<InputAdornment position="start">
										<PhoneIcon />
									</InputAdornment>
								),
							}}
						/>
					</Col>
				</Row>
				<Row className="mt-3">
					<Col xs={12} md={6} className="mb-3">
						<TextField
							label="LinkedIn"
							variant="outlined"
							fullWidth
							required
							onChange={onChange}
							name="linkedin_url"
							defaultValue={details?.linkedin_url}
							InputProps={{
								endAdornment: (
									<InputAdornment position="start">
										<LinkedInIcon />
									</InputAdornment>
								),
							}}
						/>
					</Col>
					<Col>
						<TextField
							label="Telegram"
							variant="outlined"
							fullWidth
							required
							onChange={onChange}
							name="telegram_url"
							defaultValue={details?.telegram_url}
							InputProps={{
								endAdornment: (
									<InputAdornment position="start">
										<TelegramIcon />
									</InputAdornment>
								),
							}}
						/>
					</Col>
				</Row>

				<Button
					variant="outlined"
					className="mt-3 float-right  text-iiitd"
					onClick={updateDetails}>
					Update
				</Button>
			</Col>
		</Row>
	);
}

const mapStateToProps = state => ({
	user: state.user,
});

export default connect(mapStateToProps)(BasicDetails);
