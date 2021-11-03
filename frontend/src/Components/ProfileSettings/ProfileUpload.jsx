import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { updateUser } from "../../Store/ActionCreators/user";
import { showAlert } from "../showAlert";
import { Icon, Image } from "semantic-ui-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function ProfileUpload(props) {
  const { photo, osadetails } = props;
  const [image, setImage] = useState(
    photo ?? process.env.PUBLIC_URL + "/assets/images/user.png"
  );
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };

  const dispatch = useDispatch();
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    maxFiles: 1,
    maxSize: 5242880,
    onDrop: (acceptedFile) => {
      if (acceptedFile.length > 0) {
        const file = acceptedFile[0];
        if (file) {
          let data = new FormData();
          data.append("photo", file);
          dispatch(updateUser(data)).then((res) => {
            setImage(res.photo);
            showAlert("Image Updated", "success");
          });
        }
      }
    },
  });

  return (
    <>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Profile Upload</ModalHeader>
        <ModalBody>
          <div
            {...getRootProps()}
            className="border py-4 text-muted bg-light text-center"
            style={{ cursor: "copy" }}
          >
            <input {...getInputProps()} />
            <p>Drag & Drop Image here, or Click to Select</p>
          </div>
          <small className="text-muted text-center">
            File Size should be less than 5MB
          </small>
        </ModalBody>
        <ModalBody>
          <Image src={image} size="small" />
        </ModalBody>
      </Modal>
      <div className="d-flex flex-column justify-content-between  ">
        <Icon.Group size="huge">
          <Image src={image} avatar />
          <Icon name="camera" corner onClick={toggle} className="btn p-0" />
        </Icon.Group>
        <NavLink to={`/${osadetails.username}`} className=" mt-4">
          <h3>{osadetails.username}</h3>
        </NavLink>
      </div>
    </>
  );
}

export default ProfileUpload;
