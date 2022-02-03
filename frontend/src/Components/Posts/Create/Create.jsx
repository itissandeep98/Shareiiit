import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Tab } from 'semantic-ui-react';
import Books from './Forms/Books';
import Electronics from './Forms/Electronics';
import Groups from './Forms/Groups';
import Other from './Forms/Other';

function Create(props) {
	const { modal, setModal, trigger } = props;
	const panes = [
		{
			menuItem: 'Book',
			render: () => (
				<Tab.Pane attached={false} className="p-0 border-0">
					<Books toggle={() => setModal(!modal)} />
				</Tab.Pane>
			),
		},
		{
			menuItem: 'Group',
			render: () => (
				<Tab.Pane attached={false} className="p-0 border-0">
					<Groups toggle={() => setModal(!modal)} />
				</Tab.Pane>
			),
		},
		{
			menuItem: 'Electronic Item',
			render: () => (
				<Tab.Pane attached={false} className="p-0 border-0">
					<Electronics toggle={() => setModal(!modal)} />
				</Tab.Pane>
			),
		},
		{
			menuItem: 'Other Item',
			render: () => (
				<Tab.Pane attached={false} className="p-0 border-0">
					<Other toggle={() => setModal(!modal)} />
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
