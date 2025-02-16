import { Link, useNavigate } from "react-router-dom";
import { SigninInput } from "@titan_108/medium-common";
import { useState } from "react";
import { BACKEND_URL } from "../config.ts";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { tokenAtom } from "../store/atoms/atoms.ts";
import { toast } from "react-toastify";
export const Auth = function () {
  const setCheck = useSetRecoilState(tokenAtom)
  const navigate=useNavigate()
 const [postInputs,setPostInputs]=useState<SigninInput>({
  email:"",
  password:""
 })
 async function sendInputs(){

  try{
 const response=await axios.post(BACKEND_URL+"/api/v1/user/signin",postInputs);
if(response.data.message==="Invalid inputs"){
  toast.error("Invalid inputs")
}
else if(response.data.message==="Either email or password is incorrect"){
  toast.error("Either email or password is incorrect")
}
else if(response.data.message==="Internal Server error"){
  toast.error("Internal Server error")
}
else{
  localStorage.setItem("token",response.data.token)
  setCheck(true)
  toast.success("Signed in successfully")
   navigate("/blogs")
}
  }catch(e){
alert("Invalid")
  }
 }

  return (
    <div className="h-screen flex justify-center items-center px-4 dark:bg-gray-500 dark:text-white">
      <div className="flex flex-col justify-center w-full max-w-sm">
        <div className="rounded-lg w-full text-center p-4">
          <div className="text-3xl font-bold">
            Sign in
          </div>
          <div>
            Don't have an account? <Link to="/signup" className="underline">Sign up</Link>
          </div>
        </div>

        <div className="mt-2">
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

        <div className="mt-4">
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
        <button className="bg-black border-2 border-gray-300 w-full h-10 p-2 rounded-lg text-white" onClick={sendInputs}>Sign In</button>
        </div>
      </div>
    </div>
  );
};
