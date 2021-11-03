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
import ProfileUpload from "./ProfileUpload";
import PhoneIcon from "@material-ui/icons/Phone";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TelegramIcon from "@material-ui/icons/Telegram";
import { connect, useDispatch } from "react-redux";
import { updateUser } from "../../Store/ActionCreators/user";

function BasicDetails(props) {
  const dispatch = useDispatch();
  const [details, setDetails] = useState(props.user?.details);

  const onChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };
  const updateDetails = () => {
    const { photo, ...data } = details;
    dispatch(updateUser(data));
  };
  const osadetails = props.user?.osadetails;
  return (
    <Row className="shadow my-3 py-4 rounded_lg bg-white align-items-center">
      <Col xs={12} md={3} lg={2} className="d-none d-md-block text-center">
        <ProfileUpload photo={details.photo} osadetails={osadetails} />
      </Col>
      <Col>
        <h2>
          Edit Basic Details
          <div className="d-inline ml-2 d-md-none">
            <ProfileUpload photo={details.photo} osadetails={osadetails} />
          </div>
        </h2>
        <hr />
        <form>
          <TextField
            label="Bio"
            className="mt-3"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            required
            onChange={onChange}
            name="bio"
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
                onChange={(e) =>
                  setDetails({ ...details, role: e.target.value })
                }
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
              onChange={onChange}
              name="phone_number"
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
              onChange={onChange}
              name="linkedin_url"
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
              onChange={onChange}
              name="telegram_url"
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

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(BasicDetails);
