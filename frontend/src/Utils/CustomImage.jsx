import { Box, Modal } from '@mui/material';
import React, { useState } from 'react';
import { Image } from 'semantic-ui-react';

const style = {
	position: 'absolute',
	top: '40%',
	left: '50%',
	maxWidth: '60vh',
	maxHeight: '90vh',
	overflow: 'auto',
	transform: 'translate(-50%, -50%)',
	bgcolor: 'background.paper',
	scrollbarWidth: 'none',
	msOverflowStyle: 'none',
};

function CustomImage(props) {
	const [modal, setModal] = useState(false);
	const { src } = props;
	return (
		<>
			<ImagePopup image={src} open={modal} onClose={() => setModal(!modal)} />
			<Image onClick={() => setModal(!modal)} src={src} {...props} />
		</>
	);
}

function ImagePopup({ image, open, onClose }) {
	return (
		<Modal open={open} onClose={onClose}>
			<Box sx={style}>
				<img src={image} alt="image" className="img-fluid" />
			</Box>
		</Modal>
	);
}

export default CustomImage;
