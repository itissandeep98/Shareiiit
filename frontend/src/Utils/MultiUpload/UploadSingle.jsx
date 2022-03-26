import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { Col } from 'reactstrap';
import { uploadFiles } from '../../Store/ActionCreators/upload';
import { showAlert } from '../showAlert';

function UploadSingle(props) {
	const { setLink, extensions, len } = props;
	const dispatch = useDispatch();
	const { getRootProps, getInputProps } = useDropzone({
		accept: extensions,
		maxFiles: 5,
		maxSize: 5242880,
		onDropRejected: files => {
			showAlert(files[0].errors[0].message, 'error');
		},
		onDrop: async acceptedFiles => {
			const links = await Promise.allSettled(
				acceptedFiles.map(file => {
					const data = {
						file: file,
						content: 'Images',
					};
					return dispatch(uploadFiles(data)).then(res => res);
				})
			);
			setLink(links.map(link => link.value));
		},
	});

	return (
		<Col
			{...getRootProps()}
			className="text-muted  text-center bg-light mt-3"
			style={{ cursor: 'copy' }}
		>
			<input {...getInputProps()} />
			<div className="d-flex justify-content-around my-1">
				<span className="fa fa-image fa-lg" />
			</div>
			<small>Drag and Drop Your Files Here</small>
			<hr />
		</Col>
	);
}

export default UploadSingle;
