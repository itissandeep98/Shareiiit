import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@material-ui/core";
import { Rating } from "semantic-ui-react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditSkill from "./EditSkill";
import { useState } from "react";

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
      <Accordion expanded={expanded} onChange={handleChange}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{details.skill.name}</Typography>
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
          <Typography>{details.description}</Typography>
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
