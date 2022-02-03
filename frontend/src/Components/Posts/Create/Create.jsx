import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Tab } from 'semantic-ui-react';
import Form from './Form';

function Create(props) {
	const { modal, setModal, trigger } = props;
	const panes = [
		{
			menuItem: 'Book',
			render: () => (
				<Tab.Pane attached={false} className="p-0 border-0">
					<Form category="book" toggle={() => setModal(!modal)} />
				</Tab.Pane>
			),
		},
		{
			menuItem: 'Group',
			render: () => (
				<Tab.Pane attached={false} className="p-0 border-0">
					<Form category="group" toggle={() => setModal(!modal)} />
				</Tab.Pane>
			),
		},
		{
			menuItem: 'Electronic Item',
			render: () => (
				<Tab.Pane attached={false} className="p-0 border-0">
					<Form category="electronic" toggle={() => setModal(!modal)} />
				</Tab.Pane>
			),
		},
		{
			menuItem: 'Other Item',
			render: () => (
				<Tab.Pane attached={false} className="p-0 border-0">
					<Form category="other" toggle={() => setModal(!modal)} />
				</Tab.Pane>
			),
		},
	];
	return (
		<>
			{trigger}
			<Modal
				isOpen={modal}
				toggle={() => setModal(!modal)}
				size="lg"
				className="poppins">
				<ModalHeader toggle={() => setModal(!modal)}>
					Create New Post
				</ModalHeader>
				<ModalBody>
					<Tab
						menu={{ secondary: true, pointing: true }}
						panes={panes}
						className="top_menu"
					/>
				</ModalBody>
			</Modal>
		</>
	);
}

export default Create;
