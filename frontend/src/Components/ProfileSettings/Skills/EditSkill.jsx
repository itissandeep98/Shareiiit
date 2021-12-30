import { Button, InputLabel, TextField, Autocomplete } from "@mui/material";
import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Rating } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import {
	fetchSkillList,
	updateSkillPost,
	searchSkillList,
} from "../../../Store/ActionCreators/skill";
import { showAlert } from "../../../Utils/showAlert";

function EditSkill(props) {
	const { modal, toggle, details } = props;
	const [data, setData] = useState({ ...details });
	const [skillList, setSkillList] = useState([]);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchSkillList()).then((res) => {
			setSkillList(res);
		});
	}, [dispatch]);

	const addSkill = (e) => {
		const id = data.id;
		const body = {
			skill: data.skill,
			description: data.description,
		};
		dispatch(updateSkillPost({ id, body })).catch((err) => {
			showAlert("Update Failed", "error");
		});

		toggle();
	};

	const onChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};
	const changeSkill = (name, value) => {
		const skill = { ...data.skill, [name]: value };
		setData({ ...data, skill });
	};
	const searchSkills = (e) => {
		const { value } = e.target;
		dispatch(searchSkillList(value)).then((res) => {
			setSkillList(res);
		});
	};

	return (
		<Modal isOpen={modal} toggle={toggle}>
			<ModalHeader toggle={toggle}>Add Skill</ModalHeader>
			<ModalBody>
				<Autocomplete
					freeSolo
					value={data?.skill?.label}
					options={skillList}
					onChange={(e, value) => changeSkill("label", value?.label)}
					renderInput={(params) => (
						<TextField
							fullWidth
							{...params}
							onChange={searchSkills}
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
						onRate={(e, { rating, maxRating }) => changeSkill("rating", rating)}
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
