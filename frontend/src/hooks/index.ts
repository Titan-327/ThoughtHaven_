
import { useState,useEffect } from "react";
import { useRecoilValueLoadable, useRecoilState } from "recoil";
import { blogsSelector,blogSelector,tokenSelector,userBlogsSelector, tokenAtom } from "../store/atoms/atoms";
interface Blog{
    content:string,
    title:string,
    id:string,
    createdAt:string,
    imageLink:string,
   author:{
    name:string
   }
}


// Adjust path to where your selector is defined

export const useBlogs = () => {
  const loadable = useRecoilValueLoadable(blogsSelector); // Fetch blogs via selector

  const [blogs, setBlogs] = useState<Blog[]>([]);

  // This effect updates the blogs state once the loadable state is "hasValue"
  useEffect(() => {
    if (loadable.state === "hasValue") {
      setBlogs(loadable.contents);  // Set blogs once data is fetched
    } else if (loadable.state === "hasError") {
      console.error("Error fetching blogs:", loadable.contents);
    }
  }, [loadable,setBlogs]);

  const loading = loadable.state === "loading"; // Determine if data is loading

  return { loading, blogs,setBlogs };
};

export const useBlog = (id:string) => {
  const loadable = useRecoilValueLoadable(blogSelector(id)); // Fetch blog by its id using the selector

  const [blog, setBlog] = useState({
    content: "",
    title: "",
    id: "",
    createdAt: "",
    imageLink: "",
    published: false,
    author: { name: "" },
  });

  useEffect(() => {
    if (loadable.state === "hasValue") {
      setBlog(loadable.contents);  // Set the blog once data is fetched  // Update loading state
    } else if (loadable.state === "hasError") {
      console.error("Error fetching blog:", loadable.contents);  // Stop loading on error
    }
  }, [loadable,setBlog]);
  const loading = loadable.state === "loading";
  return { loading, blog,setBlog };
};

export const useUserBlogs = () => {
  const loadable = useRecoilValueLoadable(userBlogsSelector);  // Fetch user blogs using the selector

  const [blogs, setBlogs] = useState([]);  // State to store blogs // State for loading status

  useEffect(() => {
    if (loadable.state === "hasValue") {
      setBlogs(loadable.contents);  // Set the blogs once data is fetched          // Set loading to false
    } else if (loadable.state === "hasError") {
      console.error("Error fetching user blogs:", loadable.contents);          // Stop loading on error
    }
  }, [loadable,setBlogs]);  // Re-run effect when the loadable state changes
  const loading = loadable.state === "loading";
  return { loading, blogs, setBlogs };  // Return the loading state and the fetched blogs
};

export const useCheck = () => {
  // Get the token status from the Recoil selector
  const loadable = useRecoilValueLoadable(tokenSelector)
  const [check,setCheck] = useRecoilState(tokenAtom);
 
  useEffect(()=>{
     if(loadable.state==="hasValue"){
        setCheck(loadable.contents)
     }else if (loadable.state === "hasError") {
      console.error("Error fetching user blogs:", loadable.contents);          // Stop loading on error
    }
     
  },[loadable,setCheck])

  return { check };
};
