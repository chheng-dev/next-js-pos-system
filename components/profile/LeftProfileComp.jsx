import { Avatar, Badge, Button } from "@nextui-org/react";
import { Edit2 } from "lucide-react";
import React, {Component} from "react";
import TextField from "../form/TextField";

class LeftProfileComp extends Component {
  constructor(props){
    super(props);
    this.state = {
      firstname: '',
      loading: false,
      profile: props.profile
    }
  }

  handleInputChange(){

  }

  onClose(){}

  render(){
    const {username, imageUrl, role, password} = this.state.profile;
    return(
      <div className="px-3">
        <h5>Profilie Infromation</h5>
        <div className="flex gap-4 mt-4">
          <Badge 
            content={<Edit2 />} 
            color="primary" 
            shape="circle" 
            isOneChar
            className="text-gray-800 p-1 cursor-pointer"
            size="lg"
            placement="bottom-right"
          >
            <Avatar isBordered color="primary" src={imageUrl} className="w-20 h-20 text-large" />
          </Badge>
          <div className="flex flex-col capitalize">
            <p className="">{username}</p>
            <span className="text-sm text-primary mt-0.5">{role}</span>
          </div>
        </div>

        {/* Form  */}
        <div className="mt-6">
          <form action="">
            <TextField
              type="text"
              label="First Name"
              placeholder="John Doe"
              name="firstname"
              value={this.state.firstname}
              onChange={this.handleInputChange}
              required
              isRequired={true}
            />

            <TextField
              type="email"
              label="Email"
              placeholder="jonhdoe@gmail.com"
              name="firstname"
              value={this.state.firstname}
              onChange={this.handleInputChange}
              required
              isRequired={true}
            />

            <TextField
              type="text"
              label="Address"
              placeholder="123 Stress 12LA, Phnom Penh"
              name="firstname"
              value={this.state.firstname}
              onChange={this.handleInputChange}
              required
              isRequired={true}
            />

            <div className="flex gap-2">
              <div className="w-1/2">
                <TextField
                  type="password"
                  label="New Password"
                  placeholder="jonhdoe@gmail.com"
                  name="firstname"
                  value={this.state.firstname}
                  onChange={this.handleInputChange}
                  required
                  isRequired={true}
                />
              </div>

              <div className="w-1/2">
                <TextField
                  type="password"
                  label="Current Password"
                  placeholder="jonhdoe@gmail.com"
                  name="firstname"
                  value={password}
                  onChange={this.handleInputChange}
                  required
                  isRequired={true}
                  disabled
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <Button color="foreground" variant="light" onPress={this.onClose}>
                Discard Changes
              </Button>
              <Button type="submit" className="bg-customPrink-400 shadow-lg" disabled={this.state.loading}>
                {this.state.loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>

          </form>
        </div>
      </div>
    )
  }
}


export default LeftProfileComp;