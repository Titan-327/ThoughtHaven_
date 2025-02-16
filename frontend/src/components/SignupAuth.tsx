import { Link } from "react-router-dom";
import { SignupInput } from "@titan_108/medium-common";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { toast } from "react-toastify";
export const Auth = function () {
 const [postInputs,setPostInputs]=useState<SignupInput>({
  email:"",
  name:"",
  password:""
 })
 async function sendInputs(){
  try{
 const response=await axios.post(BACKEND_URL+"/api/v1/user/signup",postInputs);
 toast(response.data.message);
 if(response.data.message=="User created successfully"){
  window.location.href="/signin"
 }
  }catch(e){
toast.error("Invalid")
  }
 }
  return (
    <div className="h-screen flex dark:bg-gray-500 justify-center items-center px-4">
      <div className="flex flex-col justify-center w-full max-w-sm">
        <div className="rounded-lg dark:text-white  w-full text-center p-4">
          <div className="text-3xl font-bold">
            Create an account
          </div>
          <div>
            Already have an account? <Link to="/signin" className="underline">Sign in</Link>
          </div>
        </div>

        <div className="mt-2 dark:text-white">
          <p className="font-semibold">Email</p>
          <input
            type="email"
            className="border-2 border-gray-300 w-full h-10 p-2 rounded-lg dark:text-black"
            placeholder="Enter your email" 
            onChange={function(e){
              setPostInputs({
                ...postInputs,
                email:e.target.value
              })
            }}
          />
        </div>

        <div className="mt-4 dark:text-white">
          <p className="font-semibold">Name</p>
          <input
            type="text"
            className="border-2 border-gray-300 w-full h-10 p-2 rounded-lg dark:text-black"
            placeholder="Enter your name"
            onChange={function(e){
              setPostInputs({
                ...postInputs,
                name:e.target.value
              })
            }}
          />
        </div>

        <div className="mt-4 dark:text-white">
          <p className="font-semibold">Password</p>
          <input
            type="password"
            className="border-2 border-gray-300 w-full h-10 p-2 rounded-lg dark:text-black"
            placeholder="Enter your password"
            onChange={function(e){
              setPostInputs({
                ...postInputs,
                password:e.target.value
              })
            }}
          />
        </div>
        <div className="mt-4">
        <button className="bg-black border-2 border-gray-300 w-full h-10 p-2 rounded-lg text-white" onClick={sendInputs}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};
