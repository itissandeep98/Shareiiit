import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const config = {
	position: 'top-right',
	autoClose: 3000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
};

export const showAlert = (message, type) => {
	toast.configure();
	if (type === 'error') {
		toast.error(message, config);
	} else if (type === 'warning') {
		toast.warning(message, config);
	} else if (type === 'success') {
		toast.success(message, config);
	} else if (type === 'info') {
		toast.info(message, config);
	} else {
		toast(message, config);
	}
};
