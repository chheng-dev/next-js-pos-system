// import React, { useState } from "react";
// import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Divider } from "@nextui-org/react";
// import TextField from "../form/TextField";
// import CustomSelect from "../form/CustomSelect";
// import TextareaField from "../form/TextareaField";
// import ImageInput from "../../components/form/ImageInput";
// import { useForm } from 'react-hook-form';
// import { FaChevronCircleRight } from "react-icons/fa";
// import Drawer from 'react-modern-drawer'
// import { toast } from "react-hot-toast";
// import HeaderDrawer from "../HeaderDrawer";

// export default function AddCategoryModal({ isOpen, onClose }) {
//   const { register, handleSubmit, reset, control } = useForm({
//     defaultValues: {
//       categoryName: '',
//       selectedMenu: '',
//       description: '',
//       itemImage: ''
//     }
//   });

//   const [imageUrl, setImageUrl] = useState('');
//   const [loading, setLoading] = useState(false);

//   const items = [
//     { key: "cat", label: "Cat" },
//     { key: "dog", label: "Dog" },
//     { key: "elephant", label: "Elephant" },
//     { key: "lion", label: "Lion" },
//     { key: "tiger", label: "Tiger" },
//     { key: "giraffe", label: "Giraffe" },
//     { key: "dolphin", label: "Dolphin" },
//     { key: "penguin", label: "Penguin" },
//     { key: "zebra", label: "Zebra" },
//     { key: "shark", label: "Shark" },
//     { key: "whale", label: "Whale" },
//     { key: "otter", label: "Otter" },
//     { key: "crocodile", label: "Crocodile" }
//   ];

//   const handleFormSubmit = async (data) => {
//     try {
//       setLoading(true)
//       data.icon = imageUrl;
//       const response = await fetch("http://localhost:3000/api/categories",{
//         method: 'POST',
//         headers: {
//           "Content-Type": 'application/json'
//         },
//         body: JSON.stringify(data)
//       });

//       if(response.ok) {
//         toast.success('New category created successfully! :');
//         reset();
//         setImageUrl("");
//         onClose();
//       } else {
//         toast.error('Something went wrong')
//       }
//     }
//     catch(error){
//       toast.error('An error occurred while making the request');
//       console.error(err);
//     }
//     finally{
//       setLoading(false)
//     }
//   }

//   return (
//     <Drawer
//         open={isOpen}
//         onClose={onClose}
//         direction='right'
//         className='bla bla bla'
//         size="400px"
//     >
//         <div className="container">
//           <HeaderDrawer title="Add New Category" onClick={onClose}/>

//           <div className="mt-5">
//             <form action="" onSubmit={handleSubmit(handleFormSubmit)}>
//               <TextField
//                 type="text"
//                 label="Category Name"
//                 placeholder="Enter Category name"
//                 name="title"
//                 // register={register}
//                 required={true}
//                 className="mb-3"
//               />

//               <div className="mb-3">
//                 <CustomSelect
//                   label="Select Menu"
//                   placeholder="Select Menu"
//                   items={items}
//                   // control={control}
//                   // register={register}
//                   name="selectedMenu"
//                 />
//               </div>

//               <TextareaField
//                 label="Description"
//                 placeholder="Enter your description"
//                 name="description"
//                 // register={register}
//                 className="mb-3"
//               />

//               <ImageInput
//                 label="Item Image"
//                 imageUrl={imageUrl}
//                 setImageUrl={setImageUrl}x
//                 endpoint="imageUploader"
//               />

//               <div className="fixed bottom-0 mb-4 right-4">
//                 <Button color="foreground" variant="light" onPress={onClose}>
//                   Cancel
//                 </Button>
//                 <Button
//                   className="bg-customPrink-400 shadow-lg"
//                   type="submit"
//                   disabled={loading}
//                 >
//                   Save
//                 </Button>
//               </div>
//             </form>
//           </div>
//         </div>
//     </Drawer>

//   );
// }
import React, { Component } from "react";
import { Modal, Button, Divider, menu, selectedMenu } from "@nextui-org/react";
import TextField from "../form/TextField";
import CustomSelect from "../form/CustomSelect";
import TextareaField from "../form/TextareaField";
import ImageInput from "../../components/form/ImageInput";
import { toast } from "react-hot-toast";
import HeaderDrawer from "../HeaderDrawer";
import Drawer from 'react-modern-drawer';

class AddCategoryModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: '',
      loading: false,
      categoryName: '',
      description: '',
      menuOption: [],
      selectedMenu: ""
    };
  }

  componentDidMount(){
    this.fetchMenus();
  }

  fetchMenus = async () => {
    try {
      this.setState({ loading: true });
      const response = await fetch("http://localhost:3000/api/menus", {
        method: 'GET',
        headers: {
          "Content-Type": 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch menus');
      }

      const result = await response.json();

      const items = result.map(item => ({
        value: item.slug,
        id: item.id,
        label: item.title
      }));

      this.setState({menuOption: items})
    } catch (error) {
      toast.error('An error occurred while making the request');
      console.error(error);
    } finally {
      this.setState({ loading: false });
    }
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSelectChange(field, value){
    this.setState({ [field]: value });
  };

  handleFormSubmit = async (e) => {
    e.preventDefault();
    const { categoryName, selectedMenu, description, imageUrl } = this.state;
    let selectedMenuId = selectedMenu?.id; // Ensure selectedMenu is valid

    if (!selectedMenuId) {
      toast.error('Please select a valid menu.');
      return;
    }

    const data = { categoryName, selectedMenuId, description, icon: imageUrl };

    try {
      this.setState({ loading: true });
      const response = await fetch("http://localhost:3000/api/categories", {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success('New category created successfully!');
        this.setState({
          categoryName: '',
          selectedMenu: null,
          description: '',
          imageUrl: '',
        });
        this.props.onClose();
        if (this.props.handleGetCategoriesList) {
          this.props.handleGetCategoriesList();
        }
      } else {
        const errorText = await response.text();
        toast.error(`Something went wrong: ${errorText}`);
      }
    } catch (error) {
      toast.error('An error occurred while making the request');
      console.error('Error details:', error);
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { isOpen, onClose } = this.props;
    const { menuOption, categoryName, selectedMenu, description, imageUrl, loading } = this.state;

    return (
      <Drawer
        open={isOpen}
        onClose={onClose}
        direction='right'
        className='max-w-full'
        size="400px"
      >
        <div className="container">
          <HeaderDrawer title="Add New Category" onClick={onClose} />

          <div className="mt-5">
            <form onSubmit={this.handleFormSubmit}>
              <TextField
                type="text"
                label="Category Name"
                placeholder="Enter Category name"
                name="categoryName"
                value={categoryName}
                onChange={this.handleInputChange}
                required
              />

              <CustomSelect
                label="Select Menu"
                placeholder="Select Menu"
                value={selectedMenu}
                items={menuOption}
                onChange={value => this.handleSelectChange("selectedMenu", value)}
              />

              <TextareaField
                label="Description"
                placeholder="Enter your description"
                name="description"
                value={description}
                onChange={this.handleInputChange}
              />

              <ImageInput
                label="Item Image"
                imageUrl={imageUrl}
                setImageUrl={url => this.setState({ imageUrl: url })}
                endpoint="imageUploader"
              />

              <div className="fixed bottom-0 mb-4 right-4">
                <Button color="foreground" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  className="bg-customPrink-400 shadow-lg"
                  type="submit"
                  disabled={loading}
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Drawer>
    );
  }
}

export default AddCategoryModal;
