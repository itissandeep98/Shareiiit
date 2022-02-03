import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Col, Row } from 'reactstrap';
import { Image } from 'semantic-ui-react';
import {
	deleteSkillPost,
	fetchUserSkills,
} from '../../../Store/ActionCreators/skill';
import AddSkill from './AddSkill';
import SkillCard from './SkillCard';

function Skills() {
	const [userTags, setuserTags] = useState([]);
	const [modal, setModal] = useState(false);
	const dispatch = useDispatch();
	const [expanded, setExpanded] = useState(0);

	const handleChange = value => {
		setExpanded(value === expanded ? -1 : value);
	};
	useEffect(() => {
		dispatch(fetchUserSkills()).then(res => {
			setuserTags(res);
		});
	}, [dispatch]);
	const handleDelete = (i, id) => {
		setuserTags([...userTags.slice(0, i), ...userTags.slice(i + 1)]);
		dispatch(deleteSkillPost(id));
	};

	return (
		<Row className="shadow my-3 py-4 rounded_lg bg-white align-items-center">
			<Col>
				<h2>
					Add Skills
					<div className="d-inline ml-2 d-md-none">
						<Image
							src={process.env.PUBLIC_URL + '/assets/images/skill.png'}
							avatar
						/>
					</div>
					<hr />
				</h2>
				<AddSkill
					userTags={userTags}
					setuserTags={setuserTags}
					modal={modal}
					toggle={() => setModal(!modal)}
				/>
				<Button
					variant="outlined"
					className="text-iiitd"
					onClick={() => setModal(true)}>
					Add New Skill Post
				</Button>
				<Row>
					<Col className="text-center my-3">
						{userTags?.map((tag, i) => (
							<SkillCard
								key={i}
								details={tag}
								handleChange={() => handleChange(i)}
								expanded={expanded == i}
								handleDelete={() => handleDelete(i, tag.id)}
							/>
						))}
					</Col>
				</Row>
			</Col>
			<Col xs={12} md={2} className="d-none d-md-block">
				<Image
					src={process.env.PUBLIC_URL + '/assets/images/skill.png'}
					fluid
				/>
			</Col>
		</Row>
	);
}

export default Skills;
