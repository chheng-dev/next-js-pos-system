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
      title: '',
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
    
    const { title, selectedMenu, description, imageUrl } = this.state;
    let menuId = selectedMenu?.id; 

    const tremmedtTitle = title.trim();

    if(!tremmedtTitle) {
      toast.error('Title is required');
      return;
    }

    if (!menuId) {
      toast.error('Please select a valid menu.');
      return;
    }

    const data = { title, menuId, description, icon: imageUrl };

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
          title: '',
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
    const { menuOption, title, selectedMenu, description, imageUrl, loading } = this.state;

    return (
      <Drawer
        open={isOpen}
        onClose={onClose}
        direction='right'
        className='max-w-full'
        size="400px"
        id="add-category"
      >
        <div className="container">
          <HeaderDrawer title="Add New Category" onClick={onClose} />

          <div className="mt-5">
            <form onSubmit={this.handleFormSubmit}>
              <TextField
                type="text"
                label="Category Name"
                placeholder="Enter Category name"
                name="title"
                value={title}
                onChange={this.handleInputChange}
                required
                isRequired={true}
              />

              <CustomSelect
                label="Select Menu"
                placeholder="Select Menu"
                value={selectedMenu}
                items={menuOption}
                onChange={value => this.handleSelectChange("selectedMenu", value)}
                isRequired={true}
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
