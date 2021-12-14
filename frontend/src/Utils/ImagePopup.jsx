import { Modal, Box } from "@mui/material";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	maxHeight: "100vh",
	overflow: "auto",
	transform: "translate(-50%, -50%)",
	bgcolor: "background.paper",
	scrollbarWidth: "none",
	msOverflowStyle: "none",
};

function ImagePopup({ image, open, onClose }) {
	return (
		<Modal open={open} onClose={onClose}>
			<Box sx={style}>
				<img src={image} alt="image" />
			</Box>
		</Modal>
	);
}

export default ImagePopup;
