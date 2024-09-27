import React, { Component } from 'react';
import Drawer from 'react-modern-drawer';
import HeaderDrawer from '../HeaderDrawer';
import TextField from '../form/TextField';
import CustomSelect from '../form/CustomSelect';
import { Button } from '@nextui-org/react';
import { toast } from "react-hot-toast";
import ImageInput from '../form/ImageInput';
import { authService } from '@/services/authService';
import { RoleService } from '@/services/roleService';
import { UserService } from '@/services/userService';

class CreateUserComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      full_name: "",
      username: "",
      email: "",
      selectedRole: '',
      loading: false,
      imageUrl: '',
      loading: false,
      password: '',
      rolesOption: [],
    };
    
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.uniqueId = `EZDrawer__checkbox${Math.random().toString(36).substr(2, 9)}`;
  }

  componentDidMount(){
    this.fetchRoles();
  }

  async fetchRoles() {
    try {
      this.setState({ loading: true });

      const roles = await RoleService.getAllRole();
      const options = roles.map(item =>( {
        id: item.id,
        value: item.name,
        label: item.name
      }))
      this.setState({ rolesOption: options });
      console.log(options)

    } catch (error) {
      console.error("Failed to fetch roles:", error);
    } finally {
      this.setState({ loading: false });
    }
  }

  async handleFormSubmit(e) {
    e.preventDefault();
  
    const { full_name, username, email, selectedRole, password, imageUrl } = this.state;
  
    if (!full_name.trim() || !username.trim() || !email.trim() || !selectedRole) {
      toast.error('Please fill in all the required fields.');
      return;
    }
  
    const data = { 
      full_name, 
      username, 
      email, 
      password, 
      is_active: true, 
      image: imageUrl,
      roleId: selectedRole.id
    };  
  
    try {
      this.setState({ loading: true });
      
      const newUser = await authService.register(data);
      
      toast.success('User created successfully!');
      
      this.setState({
        full_name: '',
        username: '',
        email: '',
        selectedRole: '',
        password: '',
        imageUrl: null
      });
  
      this.props.onClose();
  
      if (this.props.handleGetUserList) {
        this.props.handleGetUserList();
      }
  
    } catch (error) {
      toast.error('An error occurred while making the request');
      console.error('Error details:', error);
    } finally {
      this.setState({ loading: false });
    }
  }
  

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSelectChange = (field, value) => {
    this.setState({ [field]: value });
  };

  render() {
    const { full_name, username, email, selectedRole, password, loading, rolesOption } = this.state;
    const { isOpen, onClose } = this.props;

    return (
      <div>
        <Drawer 
          open={isOpen} 
          onClose={onClose} 
          direction='right' 
          className='max-w-full' 
          size="400px"
          id={this.uniqueId}
        >
          <div className="container">
            <HeaderDrawer title="Add New User" onClick={onClose} />
            <div className="mt-5">
              <form onSubmit={this.handleFormSubmit}>
                <TextField
                  type="text"
                  label="Full Name"
                  placeholder="Enter Full name"
                  name="full_name"
                  value={full_name}
                  onChange={this.handleInputChange}
                  isRequired={true}
                />
                <TextField
                  type="text"
                  label="UserName"
                  placeholder="Enter username"
                  name="username"
                  value={username}
                  onChange={this.handleInputChange}
                  isRequired={true}
                />

                <TextField
                  type="email"
                  label="Email"
                  placeholder="Enter your email"
                  name="email"
                  value={email}
                  onChange={this.handleInputChange}
                  isRequired={true}
                />

                <CustomSelect
                  label="Roles"
                  placeholder="Select Roles"
                  value={selectedRole}
                  items={rolesOption}
                  onChange={value => this.handleSelectChange("selectedRole", value)}
                  isRequired={true}
                />

                <div id='password' style={{position: 'relative', zIndex: 0}}>
                  <TextField
                    type="password"
                    label="Password"
                    placeholder="Enter your password"
                    name="password"
                    value={password}
                    onChange={this.handleInputChange}
                    isRequired={true}
                  />
                </div>

                <ImageInput
                  label="Avatar"
                  imageUrl={this.state.imageUrl}
                  setImageUrl={url => this.setState({ imageUrl: url })}
                  endpoint="imageUploader"
                />

                <div className="fixed bottom-0 mb-4 right-4">
                  <Button color="foreground" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-customPrink-400 shadow-lg" disabled={loading}>
                    {loading ? 'Saving...' : 'Save'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default CreateUserComp;
