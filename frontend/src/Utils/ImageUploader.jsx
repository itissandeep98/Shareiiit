import { useDropzone } from 'react-dropzone';
import { Image } from 'semantic-ui-react';

function ImageUploader(props) {
	const { setImage } = props;
	let image = props.image;
	try {
		image = URL.createObjectURL(image);
	} catch {
		// console.log(typeof image);
	}
	const { getRootProps, getInputProps } = useDropzone({
		accept: 'image/*',
		maxFiles: 1,
		maxSize: 5242880,
		onDrop: acceptedFile => {
			if (acceptedFile.length > 0) {
				const file = acceptedFile[0];
				if (file) {
					setImage(file);
				}
			}
		},
	});

	return (
		<div className="mt-2">
			<div
				{...getRootProps()}
				className="border py-4 text-muted bg-light text-center"
				style={{ cursor: 'copy' }}
			>
				<input {...getInputProps()} />
				<p>Drag & Drop Image here, or Click to Select</p>
			</div>
			<small className="text-muted text-center">
				File Size should be less than 5MB
			</small>
			<Image src={image} size="small" />
		</div>
	);
}

export default ImageUploader;
