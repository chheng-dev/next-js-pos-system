import React, { Component } from "react";
import { Tabs, Tab, Button } from "@nextui-org/react";
import { PlusCircleIcon } from "lucide-react";
import { toast } from "react-hot-toast";
import HeaderDrawer from "../HeaderDrawer";
import TextField from "../form/TextField";
import TextareaField from "../form/TextareaField";
import slugify from "react-slugify";

import dynamic from 'next/dynamic';

const Drawer = dynamic(() => import('react-modern-drawer'), { ssr: false });

class SpecialMenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      loading: false,
      tabItems: [],
      form: {
        title: "",
        description: ""
      }
    };
  }

  componentDidMount() {
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
      this.setState({ tabItems: result });
    } catch (error) {
      toast.error('An error occurred while making the request');
      console.error(error);
    } finally {
      this.setState({ loading: false });
    }
  }

  onClose = () => {
    this.setState({ isOpen: false });
  }

  handleModalClick = () => {
    this.setState({ isOpen: true });
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      form: {
        ...prevState.form,
        [name]: value
      }
    }));
  }

  handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const { title, description } = this.state.form;
    const trimmedTitle = title.trim();
  
    if (!trimmedTitle) {
      toast.error('Title is required');
      return;
    }
  
    const slug = slugify(trimmedTitle);
    const data = {
      title: trimmedTitle,
      description: description.trim(),
      slug
    };
  
    try {
      this.setState({ loading: true });
      const response = await fetch("http://localhost:3000/api/menus", {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (response.ok) {
        toast.success('New menu created successfully!');
        this.setState({
          form: {
            title: "",
            description: ""
          }
        });
        this.onClose();
        this.fetchMenus();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to create menu');
      }
    } catch (error) {
      toast.error('An error occurred while making the request');
      console.error('Error:', error);
    } finally {
      this.setState({ loading: false });
    }
  };
  

  render() {
    const { isOpen, loading, tabItems, form } = this.state;

    return (
      <div className="lg:mt-16 mt-4">
        <div className="flex items-center justify-between">
          <h4>Special menu all items</h4>
          <PlusCircleIcon className="w-6 h-6 text-customPrink-400 lg:hidden block cursor-pointer" onClick={this.handleModalClick} />
        </div>
        <div className="mt-4 flex items-center justify-between w-full overflow-auto">
          <Tabs variant="light" aria-label="Tabs variants" color="primary">
            {
              tabItems.map((item, index) => (
                <Tab key={index} title={item.title} />
              ))
            }
          </Tabs>
          <Button className="bg-customPrink-400 lg:block hidden cursor-pointer" size="sm" onClick={this.handleModalClick}>
            Add Menu Item
          </Button>
        </div>

        <Drawer
          open={isOpen}
          onClose={this.onClose}
          direction='right'
          size="400px"
          className='max-w-full'
        >
          <HeaderDrawer title="Add New Menu" onClick={this.onClose} />
          <form className="mt-3" onSubmit={this.handleFormSubmit}>
            <div className="mb-3">
              <TextField
                type="text"
                label="Title"
                placeholder="Enter Menu title"
                name="title"
                value={form.title}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="mb-3">
              <TextareaField
                label="Description"
                placeholder="Enter your description"
                name="description"
                value={form.description}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="fixed bottom-0 mb-4 right-4">
              <Button color="foreground" variant="light" onPress={this.onClose}>
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
        </Drawer>
      </div>
    );
  }
}

export default SpecialMenuItem;
