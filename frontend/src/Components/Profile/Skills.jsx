import FaceIcon from '@mui/icons-material/Face';
import { Chip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { fetchPeopleSkills } from '../../Store/ActionCreators/people';

function Skills({ user }) {
	const [skills, setSkills] = useState([]);
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	useEffect(() => {
		setLoading(true);
		dispatch(fetchPeopleSkills(user)).then(res => {
			setSkills(res);
			setLoading(false);
		});
	}, [dispatch]);
	return (
		<>
			{loading && (
				<div className=" text-center">
					<small className=" text-muted">
						<Spinner size="sm" /> Fetching Skills
					</small>
				</div>
			)}
			{skills.length > 0 && (
				<div className="text-center ">
					<h3>Knows About</h3>
					<div className="text-break">
						{skills?.map(term => (
							<NavLink to={`/skill/${term.id}`} key={term.id}>
								<Chip
									label={term.skill.label}
									className="m-1 btn "
									icon={<FaceIcon />}
									key={Math.random()}
								/>
							</NavLink>
						))}
					</div>
				</div>
			)}
		</>
	);
}

export default Skills;
