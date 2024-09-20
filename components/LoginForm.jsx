"use client"
import React, { useState } from "react";
import TextField from "@/components/form/TextField";
import { Checkbox } from "@nextui-org/checkbox";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { toast } from "react-hot-toast";
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (res.error) {
        toast.error('Invalid Credentials');
      } else {
        router.replace('/dashboard');
      }
    } catch (err) {
      console.log(err);
      setError('Something went wrong');
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-[30%]">
        <h2 className="text-customPrink-400 text-2xl text-center">COSYPOS</h2>
        <div className="bg-secondary-400 rounded-md mt-6 p-8">
          <h3 className="font-normal text-center text-xl">Login!</h3>
          <p className="text-center mt-2 text-sm text-slate-400">
            Please enter your credentials below to continue
          </p>

          <div className="mt-4">
            <form onSubmit={handleSubmit}>
              <TextField
                type="text"
                label="Username"
                placeholder="Enter your username"
                name="username"
                value={username}
                onChange={handleInputChange}
                required={true}
              />

              <TextField
                type={isPasswordVisible ? "text" : "password"}
                label="Password"
                placeholder="Enter your password"
                name="password"
                value={password}
                onChange={handleInputChange}
                required={true}
                isVisible={isPasswordVisible}
                toggleVisibility={togglePasswordVisibility}
              />

              <div className="flex items-center justify-between mt-3">
                <Checkbox defaultSelected className="text-customPrink-400" size="sm">
                  Remember me
                </Checkbox>
                <Link href="/forgot-password" className="text-customPrink-400 underline text-sm">
                  Forgot Password?
                </Link>
              </div>

              <div className="mt-6 flex items-center justify-center">
                <Button type="submit" className="bg-customPrink-400" size="sm">
                  Login
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
