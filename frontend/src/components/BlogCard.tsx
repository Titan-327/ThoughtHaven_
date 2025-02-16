
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { toast } from "react-toastify";

import { BACKEND_URL } from "../config";
interface BlogCardProps {
  content: string;
  title: string;
  authorName: string;
  createdAt: string;
  imageLink:string;
  published:boolean;
  id: string;
  isProfile: boolean;
  setBlogs:any,
  blogs:any
}

export const BlogCard = function ({
 
  title,
  authorName,
  createdAt,
  imageLink,
  published,
  id,
  isProfile,
  setBlogs,
 
}: BlogCardProps) {
  // Calculate reading time based on the content length
  // const calculateReadingTime = (text: string) => {
  //   const words = text.split(" ");
  //   const minutes = Math.ceil(words.length / 200); // Average reading speed is 200 words per minute
  //   return `${minutes} min`;
  // };

  const navigate = useNavigate();

  return (

    <CardContainer className="inter-var mx-4">
    <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-slate-700 dark:border-white/[0.2] border-black/[0.1] w-auto  h-auto rounded-xl p-6 border  ">
     {isProfile &&
        <CardItem
          translateZ={20}
          as="button"
          className="px-1 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
        >
       {published && "Public"}
       {!published && "Private"}
        </CardItem>
}
    <CardItem
        translateZ="50"
        className="text-xl font-bold text-neutral-600 dark:text-white rounded-full"
      >
       {authorName}
      </CardItem>
      <CardItem
        translateZ="50"
        className="text-sm font-bold text-neutral-600 dark:text-white rounded-full"
      >
     {createdAt.slice(0, 10)}
      </CardItem>
      <CardItem
        translateZ="50"
        className="text-xl font-bold text-neutral-600 dark:text-white"
      >
       {title.slice(0,25)}...
      </CardItem>
      <CardItem translateZ="100" className="w-full mt-2 flex justify-center items-center">
        <img
        loading={"lazy"}
        src={imageLink}
         // src={https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D}
          className="h-60 w-60 object-cover rounded-xl group-hover/card:shadow-xl"
          alt="Titan Inc."
        />
      </CardItem>
     
      <div className="flex justify-between items-center mt-5">
      <CardItem
          translateZ={20}
          as="button"
          className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          onClick={function(){
        navigate(`/blog/${id}`)
        }}
       >
          Read
        </CardItem>
      {isProfile &&
        <CardItem
          translateZ={20}
          as="button"
          className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          onClick={function(){
             navigate(`/update/${id}`)
              }}
        >
         Update
        </CardItem>
}
       {isProfile &&
        <CardItem
          translateZ={20}
          as="button"
          className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
           onClick={async function () {
          try {
            const response = await axios.delete(
              `${BACKEND_URL}/api/v1/blog/delete`, // Adjust the URL as needed
              {
                headers: {
                  Authorization: localStorage.getItem("token"), // Bearer token for authentication
                },
                params: { id: id }, // Pass the id as a query parameter in the URL
              }
            );
        
            // Check for the response and handle it
            if (response.data.message === "Invalid inputs") {
              toast.error("Invalid Inputs");
            } else if (response.data.message === "Internal Server Error") {
              toast.error("Internal Server Error");
            } else {
              toast.success("Blog successfully deleted");
              setBlogs((prevBlogs:any) => prevBlogs.filter((blog:any) => blog.id !== id))
              window.location.href="/profile"
            }
          } catch (error) {
            console.error("Error deleting blog:", error); // Log any error that occurs
            toast.error("Something went wrong, please try again.");
          }
        }}
        
       >
         Delete
        </CardItem>
}

      </div>
    </CardBody>
  </CardContainer>

  );
};