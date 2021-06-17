import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Button } from "semantic-ui-react";

function DeleteModal(props) {
  const { modal, toggle, action } = props;
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Delete</ModalHeader>
      <ModalBody>Are you sure you want to delete this ?</ModalBody>
      <ModalFooter>
        <Button primary onClick={action}>
          Yes
        </Button>
        <Button secondary onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default DeleteModal;
