import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Icon } from 'semantic-ui-react';
import { updateUser } from '../../Store/ActionCreators/user';
import CustomImage from '../../Utils/CustomImage';
import ImageUploader from '../../Utils/ImageUploader';
import { showAlert } from '../../Utils/showAlert';

function ProfileUpload(props) {
	const { photo, osadetails } = props;
	const [imgErr, setImgErr] = useState(false);
	const [image, setImage] = useState(
		photo ?? process.env.PUBLIC_URL + '/assets/images/user.png'
	);
	const dispatch = useDispatch();
	const [modal, setModal] = useState(false);
	const toggle = () => {
		setModal(!modal);
	};
	const updateImage = val => {
		setImage(URL.createObjectURL(val));

		let data = new FormData();
		data.append('image', val);
		dispatch(updateUser(data)).then(() => {
			showAlert('Image updated', 'success');
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
					<CustomImage
						avatar
						src={
							!imgErr
								? image ?? process.env.PUBLIC_URL + '/assets/images/user.png'
								: process.env.PUBLIC_URL + '/assets/images/user.png'
						}
						onError={e => setImgErr(true)}
					/>
					<Icon name="camera" corner onClick={toggle} className="btn p-0" />
				</Icon.Group>
				<NavLink to={`/${osadetails?.username}`} className=" mt-4">
					<h5 className="poppins">
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
