import React, { Component } from 'react';
import Drawer from 'react-modern-drawer';
import HeaderDrawer from '../HeaderDrawer';
import TextField from '../form/TextField';
import CustomSelect from '../form/CustomSelect';
import { Avatar, Button, user } from '@nextui-org/react';
import { toast } from "react-hot-toast";
import ImageInput from '../form/ImageInput';
import { authService } from '@/services/authService';
import { UserService } from '@/services/userService';
import Image from 'next/image';

class EditUserComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      full_name: "",
      username: "",
      email: "",
      selectedRole: '',
      loading: false,
      imageUrl: '',
      password: '',
    };
  }

  render() {
    const { isOpen, onClose, user, loading } = this.props;

    if(loading){{
      return ''
    }}

    return (
      <div>
        <Drawer 
          open={isOpen} 
          onClose={onClose} 
          direction='right' 
          className='max-w-full min-h-screen overflow-auto' 
          size="400px"
        >
          <div className="container">
            <HeaderDrawer title="Edit User" onClick={onClose} />
            <div className="mt-5">
              <form onSubmit={this.handleFormSubmit}>
                <TextField
                  type="text"
                  label="Full Name"
                  placeholder="Enter Full name"
                  name="full_name"
                  value={user.full_name}
                  onChange={this.handleInputChange}
                  isRequired={true}
                />
                <TextField
                  type="text"
                  label="Username"
                  placeholder="Enter username"
                  name="username"
                  value={user.username}
                  onChange={this.handleInputChange}
                  isRequired={true}
                />
                <TextField
                  type="email"
                  label="Email"
                  placeholder="Enter your email"
                  name="email"
                  value={user.email}
                  onChange={this.handleInputChange}
                  isRequired={true}
                />
                <CustomSelect
                  label="Roles"
                  placeholder="Select Roles"
                  value={user.selectedRole}
                  items={this.rolesOption}
                  onChange={value => this.handleSelectChange("selectedRole", value)}
                  isRequired={true}
                />
                <div id='password' style={{ position: 'relative', zIndex: 1 }}>
                  <TextField
                    type="password"
                    label="Password"
                    placeholder="Enter your password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    isRequired={true}
                  />
                </div>
               
               <div className='mb-4 w-full h-full block'>
                <ImageInput
                    label="Avatar"
                    imageUrl={this.state.imageUrl}
                    setImageUrl={url => this.setState({ imageUrl: url })}
                    endpoint="imageUploader"
                  />
                  {
                  user.image ? (
                    <div>
                      <Image src={user.image} width={100} height={150} className='rounded-md mt-3' />
                    </div>
                  ) : <Avatar />
                }
               </div>

                <div className="flex items-center justify-end">
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

export default EditUserComp;
