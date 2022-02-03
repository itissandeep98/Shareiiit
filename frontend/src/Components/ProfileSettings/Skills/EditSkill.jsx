import { Autocomplete, Button, InputLabel, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Rating } from 'semantic-ui-react';
import {
	fetchSkillList,
	searchSkillList,
	updateSkillPost,
} from '../../../Store/ActionCreators/skill';
import { showAlert } from '../../../Utils/showAlert';

function EditSkill(props) {
	const { modal, toggle, details } = props;
	const [data, setData] = useState({ ...details });
	const [skillList, setSkillList] = useState([]);
	const [searchText, setSearchText] = useState(data?.skill?.label);
	const [searchLoading, setSearchLoading] = useState(false);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchSkillList()).then(res => {
			setSkillList(res);
		});
	}, [dispatch]);

	const addSkill = e => {
		const id = data.id;
		const body = {
			skill: data.skill,
			description: data.description,
		};
		dispatch(updateSkillPost({ id, body })).catch(err => {
			showAlert('Update Failed', 'error');
		});

		toggle();
	};

	const onChange = e => {
		setData({ ...data, [e.target.name]: e.target.value });
	};
	const changeSkill = (name, value) => {
		const skill = { ...data.skill, [name]: value };
		setData({ ...data, skill });
	};

	var typingTimer;
	const startSearch = e => {
		clearTimeout(typingTimer);
		typingTimer = setTimeout(searchSkills, 500);
	};
	const endSearch = e => {
		clearTimeout(typingTimer);
	};

	const searchSkills = () => {
		setSearchLoading(true);
		dispatch(searchSkillList(searchText)).then(res => {
			setSkillList(res);
			setSearchLoading(false);
		});
	};

	return (
		<Modal isOpen={modal} toggle={toggle}>
			<ModalHeader toggle={toggle}>Add Skill</ModalHeader>
			<ModalBody>
				<Autocomplete
					freeSolo
					openOnFocus
					loading={searchLoading}
					loadingText="Searching..."
					value={data?.skill?.label}
					options={skillList}
					onChange={(e, value) => changeSkill('label', value?.label)}
					renderInput={params => (
						<TextField
							fullWidth
							{...params}
							onChange={e => setSearchText(e.target.value)}
							onKeyDown={endSearch}
							onKeyUp={startSearch}
							label="Tag"
						/>
					)}
				/>

				<TextField
					label="Short Description"
					variant="outlined"
					name="description"
					className="mt-2"
					value={data.description}
					multiline
					fullWidth
					onChange={onChange}
				/>

				<p className="mt-2 d-flex justify-content-around">
					<InputLabel>Rate Your Skill</InputLabel>
					<Rating
						rating={data?.skill?.rating}
						icon="star"
						maxRating={5}
						size="huge"
						clearable
						onRate={(e, { rating, maxRating }) => changeSkill('rating', rating)}
					/>
				</p>
			</ModalBody>
			<ModalFooter>
				<Button variant="outlined" className="float-right " onClick={addSkill}>
					Update
				</Button>
			</ModalFooter>
		</Modal>
	);
}

export default EditSkill;
