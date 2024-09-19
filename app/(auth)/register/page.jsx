"use client"
import React, {Component} from "react"
import TextField from "@/components/form/TextField";
import {Checkbox} from "@nextui-org/checkbox";
import Link from "next/link";
import { Button } from "@nextui-org/react";

export default class page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPasswordVisible: false,
      password: "",
      username: "",
    };

    this.togglePasswordVisibility = this.togglePasswordVisibility.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  togglePasswordVisibility(){
    this.setState((preState) => ({
      isPasswordVisible: !preState.isPasswordVisible
    }))
  }

  handleInputChange(e){
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e){
    e.preventDefault();

    const {username, password} = this.state;
    if(!username.trim()){
      toast.error('Please select a valid menu.');
      return
    }

  }
  
  render(){
    return(
      <div className="h-screen">
        <div className="flex items-center justify-center h-full">
          <div className="w-[30%]">
            <h2 className="text-customPrink-400 text-2xl text-center">COSYPOS</h2>
            <div className="bg-secondary-400 rounded-md mt-6 p-8">
              <h3 className="font-normal text-center text-xl">Register!</h3>    
              <div className="mt-4">
                <form onSubmit={handleSubmit}>
                  <TextField
                    type="email"
                    label="Email"
                    placeholder="Enter your email"
                    name="email"
                    value={this.state.username}
                    onChange={this.handleInputChange}
                    required={true}
                    isVisible={false}
                    toggleVisibility={this.togglePasswordVisibility}
                  />

                  <TextField
                    type="text"
                    label="Username"
                    placeholder="Enter your username"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleInputChange}
                    required={true}
                    isVisible={false}
                    toggleVisibility={this.togglePasswordVisibility}
                  />
    
                  <TextField
                    type={this.state.isPasswordVisible ? 'text' : "password"}
                    label="Password"
                    placeholder="Enter your password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    required={true}
                    isVisible={this.state.isPasswordVisible}
                    toggleVisibility={this.togglePasswordVisibility}
                    endContent={true}
                  />
    
                  <div className="flex items-center justify-between mt-3">
                    <Checkbox defaultSelected className="text-customPrink-400" size="sm">Remember me</Checkbox>
                    <Link href="/forgot-password" className="text-customPrink-400 underline text-sm">Forgot Password?</Link>
                  </div>
    
                  <div className="mt-6 flex items-center justify-center">
                    <Button type="submit" className="bg-customPrink-400" size="sm">Register</Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}