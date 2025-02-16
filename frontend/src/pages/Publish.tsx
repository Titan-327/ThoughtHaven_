import { useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

import JoditEditor from "jodit-react"
import { useRef } from "react";
import React from "react";
import { toast } from "react-toastify";
// TypeScript interface to define the shape of the inputs state
interface Inputs {
  title: string;
  content: string;
}

export const Publish = function () {
  const [inputs, setInputs] = useState<Inputs>({
    title: "",
    content: ""
  });
  const [image,setImage]=useState<File|null>(null)
  const [status,setStatus]=useState<string>("public")
  const editor:any=useRef(null)
  const config = React.useMemo(() => ({
    placeholder: "Write your thoughts here...",
   height:'300'
  }), []); // This ensures the config is only created once.
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
   
    setStatus(function(){
      return e.target.value
    });
  };
  return (
    <div className="flex flex-col justify-center items-center py-1 dark:bg-slate-800 min-h-screen max-w-screen">
      <div className="w-2/3 h-2/3 mb-4">
     <div className="dark:text-white text-2xl mb-2">Title:</div>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Title"
          onChange={function (e) {
            setInputs((prev:Inputs) => {
              return {
                ...prev,
                title: e.target.value, // Set the new title value
              };
            });
          }}
          required
        />
      </div>
      <div className="w-2/3 h-2/3 mb-4">
      <div className="dark:text-white text-2xl mb-2">Image:</div>
        <input
          type="file"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Title"
          onChange={function (e) {
           if(e.target.files && e.target.files.length>0){
            setImage(e.target.files[0])
           }
          }}
          required
        />
        <p className="dark:text-white">*Image size should be between 1kB to 100kB*</p>
      </div>
      <form className="w-2/3 mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          <div className="dark:text-white text-2xl mb-2">Status of Blog:</div>
        </label>
        <select
          value={status}
          onChange={handleStatusChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </form>
      <div className="w-2/3">
      <div className="dark:text-white text-2xl mb-2">Content:</div>
        <JoditEditor
			ref={editor}
			value={inputs.content}
      config={config}
			// tabIndex={1} // tabIndex of textarea
			// onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
      onChange={function (newContent) {
        setInputs((prev: Inputs) => {
          return {
            ...prev,
            content: newContent, // Set the new content value
          };
        });
      }}
		/>
      </div>

      {/* Publish button container */}
      <div className="flex py-4 items-start">
        <button
          type="button"
          className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={async function () {
            const formData=new FormData();
            formData.append("title",inputs.title)
            formData.append("content",inputs.content)
            if(image){
              formData.append("image",image)
            }
            formData.append("status",status)
            const response = await axios.post(
              `${BACKEND_URL}/api/v1/blog`, // Adjust the URL as needed
              formData,
              {
                headers: {
                  Authorization:localStorage.getItem("token"), 
                  "Content-Type":"multipart/form-data",
                },
              }
            );
            if (response.data.message === "Invalid Inputs") {
              toast.error("Invalid Inputs");
            } else if (response.data.message === "Something went wrong") {
              console.log(response.data.error)
              toast.error("Internal server error")
            } 
            else if(response.data.message==="No image uploaded"){
              toast.error("Please upload an image")
            }
            else if(response.data.message==="Blog added successfully"){
              toast.success("Blog added successfully", {
                              onClose: () => {
                                // This will trigger after the toast is closed
                                window.localStorage.removeItem('recoil-persist');
                                window.location.href = `/blog/${response.data.id}`;
                              },
                            });
            }
           else if(response.data.message==="Cloudinary error"){
            toast.error("Cloudinary error")
           }
           else{
            toast.error("Uh-Oh!!! here we go agian")
           }
          }}
        >
          Publish
        </button>
      </div>
    </div>
  );

};

// Explicitly define the type for props in the TextArea component


 

