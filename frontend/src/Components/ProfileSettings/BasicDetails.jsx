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
            required
            defaultValue={details?.username}
            name="username"
            onChange={onChange}
          />
          <TextField
            label="First Name"
            className=" mt-3"
            variant="outlined"
            fullWidth
            required
            defaultValue={details?.first_name}
            name="first_name"
            onChange={onChange}
          />
          <TextField
            label="Last Name"
            fullWidth
            className="mt-3"
            variant="outlined"
            required
            name="last_name"
            defaultValue={details?.last_name}
            onChange={onChange}
          />
          <TextField
            label="Role"
            className="mt-3"
            variant="outlined"
            fullWidth
            required
            defaultValue={details?.role}
          />
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
