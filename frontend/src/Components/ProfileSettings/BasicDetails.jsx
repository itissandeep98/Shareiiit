import { Button, TextField } from "@material-ui/core";
import { useState } from "react";
import { Col, Row } from "reactstrap";
import { Icon, Image } from "semantic-ui-react";
import ProfileUpload from "./ProfileUpload";

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
          <Icon name="telegram" size="big" />
          <Icon name="linkedin" size="big" />
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
            />
            <TextField
              label="Last Name"
              className="w-50"
              variant="outlined"
              required
              name="last_name"
              defaultValue={details?.last_name}
              onChange={onChange}
            />
          </div>
          <TextField
            label="Bio"
            className="mt-3"
            variant="outlined"
            fullWidth
            required
            defaultValue={details?.profile.bio}
          />
          <div className="mt-3">
            <TextField
              label="Role"
              className="w-50"
              variant="outlined"
              fullWidth
              required
              defaultValue={details?.profile.role}
            />
            <TextField
              type="number"
              label="Phone Number"
              className="w-50"
              variant="outlined"
              fullWidth
              required
              defaultValue={details?.profile.phone_number}
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
