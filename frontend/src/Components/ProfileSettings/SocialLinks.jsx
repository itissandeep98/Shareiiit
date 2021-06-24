import { Button, InputAdornment, TextField } from "@material-ui/core";
import { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { Icon } from "semantic-ui-react";
import TelegramIcon from "@material-ui/icons/Telegram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

function SocialLinks(props) {
  const [modal, setModal] = useState(false);
  const [state, setState] = useState({ ...props.details });
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const toggle = () => setModal(!modal);

  return (
    <div>
      <Icon name="telegram" size="big" onClick={toggle} className="btn p-0" />
      <Icon name="linkedin" size="big" onClick={toggle} className="btn p-0" />
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Advanced Search</ModalHeader>
        <ModalBody>
          <form>
            <TextField
              type="url"
              label="Telegram Url"
              fullWidth
              variant="outlined"
              name="telegram_url"
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <TelegramIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              type="url"
              label="LinkedIn Url"
              fullWidth
              variant="outlined"
              className="mt-2"
              name="linkedin_url"
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <LinkedInIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Button variant="outlined" className="mt-2 float-right">
              Update
            </Button>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default SocialLinks;
