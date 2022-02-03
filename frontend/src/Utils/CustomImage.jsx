import React, { useState } from 'react';
import { Image } from 'semantic-ui-react';
import ImagePopup from './ImagePopup';

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

export default CustomImage;
