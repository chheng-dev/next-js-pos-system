"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import TextField from "@/components/form/TextField";
import { Checkbox } from "@nextui-org/checkbox";
import Link from "next/link";
import { Button, user } from "@nextui-org/react";
import { toast } from "react-hot-toast";

export default function Login() {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   const res = await signIn("credentials", {
  //     redirect: false,
  //     username,
  //     password,
  //   });

  //   if (res?.error) {
  //     setError("Login failed. Please check your credentials.");
  //     toast.error("Login failed!");
  //   } else {
  //     toast.success("Login successful!");
  //     router.push('/dashboard');
  //   }
  // };

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        const { token } = data;

        localStorage.setItem('token', token);

        document.cookie = `token=${token}; path=/; max-age=${7 * 24 * 60 * 60};`;

        window.location.href = '/dashboard';
      } else {
        console.error('Login failed:', data.message);
        toast.error("Login failed:", data.message);
      }
    } catch (err) {
      console.error('Error during login:', err);
      toast.error("Error during login!");
    }
  }


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

  return (
    <div className="w-full h-screen">
      <div className="flex items-center justify-center h-full">
        <div className="w-[30%]">
          <h2 className="text-customPink-400 text-2xl text-center">COSYPOS</h2>
          <div className="bg-secondary-400 rounded-md mt-6 p-8">
            <h3 className="font-normal text-center text-xl">Login!</h3>
            <p className="text-center mt-2 text-sm text-slate-400">
              Please enter your credentials below to continue
            </p>

            {error && <p className="text-red-500 text-center my-2">{error}</p>}

            <div className="mt-4">
              <form onSubmit={handleSubmit}>
                <TextField
                  type="text"
                  label="Username"
                  placeholder="Enter your username"
                  name="username"
                  value={username}
                  onChange={handleInputChange}
                  required
                />

                <TextField
                  type={isPasswordVisible ? "text" : "password"}
                  label="Password"
                  placeholder="Enter your password"
                  name="password"
                  value={password}
                  onChange={handleInputChange}
                  required
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
    </div>
  );
}
