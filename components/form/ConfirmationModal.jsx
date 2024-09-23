import React, { Component } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { XCircle } from "lucide-react";

class ConfirmationModal extends Component {
  handleOnClick(currentId){
    console.log(currentId);
    this.props.onConfirmHandleClick(currentId);
  }
  
  render() {
    
    const { isOpen, onClose, onConfirm } = this.props;


    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center justify-center">
                  <XCircle className="text-red-600 w-16 h-16" />
                </div>
                <div className="flex items-center justify-center mt-3">
                  <h3 className="font-normal">Are your sure ?</h3>
                </div>
              </ModalHeader>
              <ModalBody>
                <div className="flex items-center justify-center">
                  <p> 
                  Do you really want to delete these records?
                  </p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose} size="sm">
                  Cancel
                </Button>
                <Button color="danger" onPress={onClose} size="sm" onClick={(currentId)=> this.handleOnClick(currentId)}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    );
  }
}

export default ConfirmationModal;
