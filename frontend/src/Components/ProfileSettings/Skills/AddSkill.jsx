import {
	Autocomplete,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Rating } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import {
	createSkillPost,
	fetchSkillList,
	searchSkillList,
} from "../../../Store/ActionCreators/skill";
import { showAlert } from "../../../Utils/showAlert";

function AddSkill(props) {
	const { modal, toggle, userTags, setuserTags } = props;
	const [data, setData] = useState({});
	const [skillList, setSkillList] = useState([]);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchSkillList()).then((res) => {
			setSkillList(res);
		});
	}, [dispatch]);
	const addSkill = () => {
		const body = {
			description: data.desc,
			is_request: data.checked,
			skill: {
				label: data.label,
				rating: data.rate,
			},
		};
		dispatch(createSkillPost(body))
			.then((res) => {
				setuserTags([{ ...res }, ...userTags]);
				setData({});
				toggle();
			})
			.catch((err) => {
				if (err?.response?.data?.Error) {
					showAlert(err.response.data.Error, "error");
				} else {
					showAlert("Something went wrong", "error");
				}
			});
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
					options={skillList}
					onChange={(e, value) => setData({ ...data, label: value.label })}
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
					className="mt-2"
					value={data.desc}
					multiline
					fullWidth
					onChange={(e) => setData({ ...data, desc: e.target.value })}
				/>

				<p className="mt-2 d-flex justify-content-around">
					<InputLabel>Rate Your Skill</InputLabel>
					<Rating
						rating={data.rate}
						icon="star"
						maxRating={5}
						size="huge"
						clearable
						onRate={(e, { rating, maxRating }) =>
							setData({ ...data, rate: rating })
						}
					/>
				</p>
			</ModalBody>
			<ModalFooter className="d-flex justify-content-end">
				<Button
					variant="outlined"
					className=" text-iiitd"
					onClick={addSkill}
					// disabled={!data.rate || !data.label}
				>
					Add Skill
				</Button>
			</ModalFooter>
		</Modal>
	);
}

export default AddSkill;
