import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { Image } from "semantic-ui-react";
import { updateUser } from "../../Store/ActionCreators/user";
import { apiUrl } from "../../Store/Urls";
import { showAlert } from "../showAlert";

function ProfileUpload(props) {
  const { open, toggle, setImage, image } = props;
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
            setImage(apiUrl + res.photo);
            showAlert("Image updated", "success");
          });
        }
      }
    },
  });
  return (
    <Modal isOpen={open} toggle={toggle}>
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
  );
}

export default ProfileUpload;
