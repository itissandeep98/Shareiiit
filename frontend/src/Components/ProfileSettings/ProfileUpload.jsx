import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { Icon, Image } from "semantic-ui-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import ImageUploader from "../../Utils/ImageUploader";
import { showAlert } from "../../Utils/showAlert";
import { useDispatch } from "react-redux";
import { updateUser } from "../../Store/ActionCreators/user";
import ImagePopup from "../../Utils/ImagePopup";

function ProfileUpload(props) {
	const { photo, osadetails } = props;
	const [image, setImage] = useState(
		photo ?? process.env.PUBLIC_URL + "/assets/images/user.png"
	);
	const dispatch = useDispatch();
	const [modal, setModal] = useState(false);
	const [popup, setPopup] = useState(false);
	const toggle = () => {
		setModal(!modal);
	};
	const updateImage = (val) => {
		setImage(val);
		const data = {
			image_url: val,
		};
		dispatch(updateUser(data)).then(() => {
			showAlert("Image updated", "success");
		});
	};

	return (
		<>
			<ImagePopup image={image} open={popup} onClose={() => setPopup(!popup)} />
			<Modal isOpen={modal} toggle={toggle}>
				<ModalHeader toggle={toggle}>Profile Upload</ModalHeader>
				<ModalBody>
					<ImageUploader image={image} setImage={updateImage} />
				</ModalBody>
			</Modal>
			<div className="d-flex flex-column justify-content-between  ">
				<Icon.Group size="huge">
					<Image src={image} avatar onClick={() => setPopup(!popup)} />
					<Icon name="camera" corner onClick={toggle} className="btn p-0" />
				</Icon.Group>
				<NavLink to={`/${osadetails?.username}`} className=" mt-4">
					<h5>
						{osadetails?.first_name ? (
							<>
								{osadetails?.first_name} {osadetails?.last_name}
							</>
						) : (
							osadetails?.username
						)}
					</h5>
				</NavLink>
			</div>
		</>
	);
}

export default ProfileUpload;
