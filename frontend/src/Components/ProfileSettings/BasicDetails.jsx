import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { useState } from "react";
import { Col, Row } from "reactstrap";
import { Icon, Image } from "semantic-ui-react";
import ProfileUpload from "./ProfileUpload";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PhoneIcon from "@material-ui/icons/Phone";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TelegramIcon from "@material-ui/icons/Telegram";
import { apiUrl } from "../../Store/Urls";

function BasicDetails(props) {
  const { details, onChange, updateDetails } = props;
  const [modal, setModal] = useState(false);
  const [image, setImage] = useState(apiUrl + details.photo);
  return (
    <Row className="shadow my-3 py-4 rounded_lg bg-white align-items-center">
      <ProfileUpload
        open={modal}
        toggle={() => setModal(!modal)}
        setImage={setImage}
        image={image}
      />
      <Col xs={12} md={3} lg={2} className="d-none d-md-block text-center">
        <Icon.Group size="huge">
          <Image src={image} avatar />
          <Icon
            name="camera"
            corner
            onClick={() => setModal(!modal)}
            className="btn p-0"
          />
        </Icon.Group>
      </Col>
      <Col>
        <h2>
          Edit Basic Details
          <div className="d-inline ml-2 d-md-none">
            <Icon.Group>
              <Image src={image} avatar />
              <Icon name="camera" corner />
            </Icon.Group>
          </div>
        </h2>
        <hr />
        <form>
          <TextField
            label="Username"
            className=""
            variant="outlined"
            fullWidth
            defaultValue={details?.username}
            disabled
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
          <div className="mt-3">
            <TextField
              label="First Name"
              className=" w-50"
              variant="outlined"
              disabled
              defaultValue={details?.first_name}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Last Name"
              className="w-50"
              variant="outlined"
              disabled
              defaultValue={details?.last_name}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <TextField
            label="Bio"
            className="mt-3"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            required
            defaultValue={details?.bio}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <AssignmentIndIcon />
                </InputAdornment>
              ),
            }}
          />
          <div className="mt-3">
            <FormControl variant="outlined" fullWidth className=" w-50">
              <InputLabel>Role</InputLabel>
              <Select
                label="Tag"
                value={details?.role}
                // onChange={(e) => setData({ ...data, label: e.target.value })}
              >
                <MenuItem value="Student">Student</MenuItem>
                <MenuItem value="Faculty">Faculty</MenuItem>
                <MenuItem value="Staff">Staff</MenuItem>
              </Select>
            </FormControl>
            <TextField
              type="number"
              label="Phone Number"
              className="w-50"
              variant="outlined"
              fullWidth
              required
              defaultValue={details?.phone_number}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="mt-3">
            <TextField
              label="LinkedIn"
              className="w-50"
              variant="outlined"
              fullWidth
              required
              defaultValue={details?.linkedin_url}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <LinkedInIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Telegram"
              className="w-50"
              variant="outlined"
              fullWidth
              required
              defaultValue={details?.telegram_url}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <TelegramIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <Button
            variant="outlined"
            className="mt-3 float-right rounded-pill bg-info text-white"
            onClick={updateDetails}
          >
            Update
          </Button>
        </form>
      </Col>
    </Row>
  );
}

export default BasicDetails;
