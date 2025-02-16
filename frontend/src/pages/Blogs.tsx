import { useState, useEffect } from "react";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks/index.ts";
import { Loader } from "../components/Loader.tsx";
import { RecoilRoot } from "recoil";
export const Blogs = function () {
  const { loading, blogs,setBlogs } = useBlogs();
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearchInput, setDebouncedSearchInput] = useState(searchInput);

  // Debounce the search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchInput(searchInput);
    }, 200); // Adjust the debounce delay (500ms here)

    // Cleanup the timer on every re-render
    return () => clearTimeout(timer);
  }, [searchInput]);

  if (loading) {
    return <div>
     <Loader></Loader>
    </div>
  }

  return (
    <div className="flex flex-col items-center dark:bg-gray-500  min-h-screen">
      {/* Search Bar */}
      <div className="max-w-full m-4 w-1/2">
        <input
          type="text"
          placeholder="Search Blog"
          className="border rounded-3xl w-full py-2 px-4 dark:bg-gray-700 dark:text-black"
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      {/* Blog Cards - Wider than Search Bar */}
      <div className="max-w-screen  w-full grid grid-cols-6">
        {blogs
          .filter((blog: {
            content: string;
            title: string;
            id: string;
            createdAt: string;
            imageLink:string;
            author: {
              name: string;
            };
          }) => {
            return blog.title.toLowerCase().includes(debouncedSearchInput.toLowerCase());
          })
          .map((blog) => (
            <div className="col-span-6 md:col-span-3 lg:col-span-2">
              <RecoilRoot>
            <BlogCard
              key={blog.id}
              content={blog.content}
              title={blog.title}
              authorName={blog.author.name}
              createdAt={blog.createdAt}
              imageLink={blog.imageLink}
              id={blog.id}
              published={false}
              isProfile={false}
              blogs={blogs}
              setBlogs={setBlogs}
            />
            </RecoilRoot>
            </div>
          ))}
      </div>
    </div>
  );
};
