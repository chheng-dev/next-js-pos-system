import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import TextField from "../form/TextField";
import CustomSelect from "../form/CustomSelect";
import TextareaField from "../form/TextareaField";
import FileImage from "../form/FileImage";


export default function AddCategoryModal({isOpen, onClose}){
  const items = [
    {key: "cat", label: "Cat"},
    {key: "dog", label: "Dog"},
    {key: "elephant", label: "Elephant"},
    {key: "lion", label: "Lion"},
    {key: "tiger", label: "Tiger"},
    {key: "giraffe", label: "Giraffe"},
    {key: "dolphin", label: "Dolphin"},
    {key: "penguin", label: "Penguin"},
    {key: "zebra", label: "Zebra"},
    {key: "shark", label: "Shark"},
    {key: "whale", label: "Whale"},
    {key: "otter", label: "Otter"},
    {key: "crocodile", label: "Crocodile"}
  ];

  return(
    <Modal 
      backdrop="opaque" 
      isOpen={isOpen} 
      onOpenChange={onClose}
      radius="lg"
      size="xl"
      classNames={{
        body: "py-6",
        backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
        base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
        header: "border-b-[1px] border-[#292f46]",
        footer: "border-t-[1px] border-[#292f46]",
        closeButton: "hover:bg-white/5 active:bg-white/10",
      }}
      className="right-modal"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Add New Category</ModalHeader>
            <ModalBody>
              <TextField 
                type="text"
                label="Category Name"
                placeholder="Enter Category name"
              />

              <CustomSelect 
                label="Select Menu"
                placeholder="Select Menu"
                items={items}
              />

              <TextareaField 
                label="Description"
                placeholder="Enter your description"
              />

              <FileImage />
              
            </ModalBody>
            <ModalFooter>
              <Button color="foreground" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button className="bg-customPrink-400 shadow-lg" onPress={onClose}>
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}