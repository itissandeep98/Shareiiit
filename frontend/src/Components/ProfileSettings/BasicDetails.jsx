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
import SocialLinks from "./SocialLinks";

function BasicDetails(props) {
  const { details, onChange, updateDetails } = props;
  const [modal, setModal] = useState(false);
  const [image, setImage] = useState(
    process.env.PUBLIC_URL + "/assets/images/user.png"
  );
  return (
    <Row className="shadow my-3 py-4 rounded_lg bg-white align-items-center">
      <ProfileUpload
        open={modal}
        toggle={() => setModal(!modal)}
        setImage={setImage}
        image={image}
      />
      <Col xs={12} md={2} className="d-none d-md-block text-center">
        <div>
          <Icon.Group size="huge">
            <Image src={image} avatar />
            <Icon
              name="camera"
              corner
              onClick={() => setModal(!modal)}
              className="btn p-0"
            />
          </Icon.Group>
          <br />
          <br />
          <br />
          <SocialLinks details={details.profile} />
        </div>
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
            required
            defaultValue={details?.username}
            name="username"
            onChange={onChange}
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
              required
              defaultValue={details?.first_name}
              name="first_name"
              onChange={onChange}
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
              required
              name="last_name"
              defaultValue={details?.last_name}
              onChange={onChange}
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
            required
            defaultValue={details?.profile.bio}
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
                value={details?.profile.role}
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
              defaultValue={details?.profile.phone_number}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
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
