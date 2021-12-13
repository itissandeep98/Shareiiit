import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { Icon, Image } from "semantic-ui-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import ImageUploader from "../../Utils/ImageUploader";
import { showAlert } from "../../Utils/showAlert";
import { useDispatch } from "react-redux";
import { updateUser } from "../../Store/ActionCreators/user";

function ProfileUpload(props) {
	const { photo, osadetails } = props;
	const [image, setImage] = useState(
		photo ?? process.env.PUBLIC_URL + "/assets/images/user.png"
	);
	const dispatch = useDispatch();
	const [modal, setModal] = useState(false);
	const toggle = () => {
		setModal(!modal);
	};
	const updateImage = (val) => {
		setImage(val);
		const data = {
			photo: val,
		};
		dispatch(updateUser(data)).then(() => {
			showAlert("Image updated", "success");
		});
	};

	return (
		<>
			<Modal isOpen={modal} toggle={toggle}>
				<ModalHeader toggle={toggle}>Profile Upload</ModalHeader>
				<ModalBody>
					<ImageUploader image={image} setImage={updateImage} />
				</ModalBody>
			</Modal>
			<div className="d-flex flex-column justify-content-between  ">
				<Icon.Group size="huge">
					<Image src={image} avatar />
					<Icon name="camera" corner onClick={toggle} className="btn p-0" />
				</Icon.Group>
				<NavLink to={`/${osadetails?.username}`} className=" mt-4">
					<h3>{osadetails?.username}</h3>
				</NavLink>
			</div>
		</>
	);
}

export default ProfileUpload;
