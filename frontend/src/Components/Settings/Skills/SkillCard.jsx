import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
	Accordion,
	AccordionActions,
	AccordionDetails,
	AccordionSummary,
	Button,
	Typography,
} from '@mui/material';
import { useState } from 'react';
import { Rating } from 'semantic-ui-react';
import EditSkill from './EditSkill';

function SkillCard(props) {
	const { details, handleChange, expanded, handleDelete } = props;
	const [modal, setModal] = useState(false);

	return (
		<>
			<EditSkill
				modal={modal}
				toggle={() => setModal(!modal)}
				details={details}
			/>
			<Accordion
				expanded={expanded}
				onChange={handleChange}
				className="poppins"
			>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Typography className="poppins">{details.skill.label}</Typography>
					<Rating
						className="ml-3"
						rating={details.skill.rating}
						icon="star"
						maxRating={5}
						size="huge"
						disabled
					/>
				</AccordionSummary>
				<AccordionDetails>
					<Typography className="poppins">{details.description}</Typography>
				</AccordionDetails>
				<AccordionActions>
					<Button size="small" onClick={handleDelete}>
						Delete
					</Button>
					<Button size="small" color="primary" onClick={() => setModal(true)}>
						Edit
					</Button>
				</AccordionActions>
			</Accordion>
		</>
	);
}

export default SkillCard;
