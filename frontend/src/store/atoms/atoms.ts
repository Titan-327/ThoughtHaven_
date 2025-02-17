import { atom, selector,atomFamily,selectorFamily} from "recoil";
import axios from "axios";
import { BACKEND_URL } from "../../config";
// Atom to store blogs
export const blogsAtom = atom({
  key: "blogsAtom",  // Unique key for this atom
  default: []// Default to an empty array
});

// Selector to fetch all blogs from the backend
export const blogsSelector = selector({
  key: "blogsSelector",  // Unique key for the selector
  get: async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`);
      return response.data.posts;
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
      throw error;
    }
  },
});

export const blogAtom = atomFamily({
  key: "blogAtom", // Unique key for this atom
  default: {  // Default empty state for a single blog
    content: "",
    title: "",
    id: "",
    createdAt: "",
    imageLink: "",
    author: { name: "" },
  },
});
export const blogSelector = selectorFamily({
  key: "blogSelector",  // Unique key for the selector
  get: (id) => async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bloggy/${id as string}`);
      return response.data.post;  // Return the blog data
    } catch (error) {
      console.error("Failed to fetch blog:", error);
      throw error; // This will cause the Recoil loadable to be in "hasError" state
    }
  },
});
export const userBlogsAtom = atom({
  key: "userBlogsAtom",  // Unique key for this atom
  default: [],           // Default to an empty array
});
export const userBlogsSelector = selector({
  key: "userBlogsSelector",  // Unique key for the selector
  get: async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/blog/userBlogs`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      
      return response.data.posts;  // Return the user blogs data from the API response
    } catch (error) {
      console.error("Failed to fetch user blogs:", error);
      throw error;  // This will set the Recoil loadable state to "hasError"
    }
  },
});




export const tokenAtom = atom({
  key: "tokenAtom", // Unique key for this atom
  default: false,   // Default to false, meaning the user is not found
});
export const tokenSelector = selector({
  key: "tokenSelector", // Unique key for this selector
  get: async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/blog/check`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      if (response.data.message === "User found") {
        return true;  // If user is found, return true
      } else {
        return false; // If user is not found, return false
      }
    } catch (error) {
      console.error("Error checking token:", error);
      return false; // In case of an error, assume the user is not found
    }
  },
});