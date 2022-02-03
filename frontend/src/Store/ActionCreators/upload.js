import { storage } from '../../Config/fire';
import { showAlert } from '../../Utils//showAlert';
import * as ActionTypes from '../ActionTypes';

export const uploadFiles = data => {
	showAlert('Uploading File');
	return async dispatch => {
		dispatch({ type: ActionTypes.UPLOAD_REQUEST });
		const uploadTask = storage
			.ref(`/${data.content}/${data.file.name}`)
			.put(data.file);
		uploadTask.on(
			'state_changed',
			snapShot => {},
			err => {
				showAlert('Something went wrong while Uploading', 'error');
				dispatch({ type: ActionTypes.UPLOAD_FAILED, errmess: err });
			},
			() => {
				showAlert('File Uploaded Successfully', 'success');
				dispatch({ type: ActionTypes.UPLOAD_SUCCESS });
			}
		);
		return await uploadTask.then(res =>
			storage.ref(data.content).child(data.file.name).getDownloadURL()
		);
	};
};
