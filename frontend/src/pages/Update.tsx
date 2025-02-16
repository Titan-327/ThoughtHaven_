import { useState, useEffect, useRef } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useParams } from "react-router-dom";
import JoditEditor from "jodit-react";
import { useBlog } from "../hooks";
import React from "react";
import { Loader } from "../components/Loader";
import { toast,  } from "react-toastify";
// TypeScript interface to define the shape of the inputs state


export const Update = function () {
  const { id } = useParams();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [image,setImage]=useState<File|null>(null)
  const editor: any = useRef(null);
  const { loading, blog } = useBlog(id as string);
  const [status,setStatus]=useState<string>("")
   const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
     
      setStatus(function(){
        return e.target.value
      });
    };
  const config = React.useMemo(() => ({
    placeholder: "",
   height:'300'
  }), []);
  useEffect(function(){
    if(blog){
      setTitle(blog.title)
      setContent(blog.content)
    if(blog.published){
      setStatus("public")
    }
    else{
      setStatus("private")
    }
    }
  },[blog])
  // Jodit Editor configuration
  if(loading){
    return <div>
      <Loader/>
    </div>
  }
  
  // Handle publish button click
  return (
    <div className="flex flex-col justify-center items-center py-1 dark:bg-slate-800 min-h-screen max-w-screen">
      <div className="w-2/3 h-2/3 mb-4">
   
      <div className="dark:text-white text-2xl mb-2">Title:</div>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
       <p className="dark:text-white">*Do not upload if want to keep previous image*</p>
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
			value={content}
			config={config}
			tabIndex={1} // tabIndex of textarea
			onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
			onChange={newContent => {if(content!=newContent){setContent(newContent)}}}
		/>
      </div>

      {/* Publish button container */}
      <div className="flex py-4 items-start">
        <button
          type="button"
          className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={async function () {
            const formData=new FormData();
            formData.append("title",title)
            formData.append("content",content)
            formData.append("id",blog.id)
            if(image){
              formData.append("image",image)
            }
            formData.append("status",status)
            const response = await axios.put(
              `${BACKEND_URL}/api/v1/blog/update`, // Adjust the URL as needed
              formData,
              {
                headers: {
                  Authorization:localStorage.getItem("token"), 
                  "Content-Type":"multipart/form-data",
                },
              }
            );
            if (response.data.message === "Invalid Inputs") {
             toast.error("Invalid Inputs")
            } else if (response.data.message === "Invalid") {
              console.log(response.data.error)
              toast.error("Internal server error")
            } 
            else if(response.data.message==="No image uploaded"){
              toast.error("Please upload an image")
            }
            else if(response.data.message==="Blog updated successfully"){
              toast.success("Blog updated successfully", {
                onClose: () => {
                  // This will trigger after the toast is closed
                  window.localStorage.removeItem('recoil-persist');
                  window.location.href = `/blog/${response.data.id}`;
                },
              });
          
            }
            else{
            toast.error(response.data.message)
                
            }
          }}
        >
          Publish
        </button>
      </div>
    </div>
  );
};
