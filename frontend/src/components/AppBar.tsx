import { useState } from "react";

import { ModeToggle } from "./mode-toggle";
import { useNavigate } from "react-router-dom";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useCheck } from "../hooks";
import { useSetRecoilState } from "recoil";
import { tokenAtom } from "../store/atoms/atoms";


export const AppBar = () => {
  const setchk = useSetRecoilState(tokenAtom)
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
const {check}=useCheck()
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b-2  dark:border-white w-full z-10 top-0 dark:bg-gray-700 ">
      <div className="max-w-9xl mx-auto px-7 py-3 flex justify-between items-center">
        <div className="text-2xl font-semibold text-gray-800 dark:text-white ">
          <button onClick={function(){
            navigate("/")
          }} className="hover:text-blue-600">ThoughtHaven</button>
        </div>

        <div className="flex items-center  space-x-4 text-black dark:text-white">
          {/* Mobile Menu Button */}
          <div className="sm:hidden flex items-center  ">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            >
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Navbar Links for larger screens */}
          <div className="hidden md:flex space-x-6">
          <button
            onClick={function(){
              navigate("/")
            }}
            className="text-black hover:bg-gray-300 hover:dark:bg-white dark:text-white hover:dark:text-black hover:text-black  block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </button>
          <button
            onClick={function(){
              navigate("/blogs")
            }}
            className="text-black hover:bg-gray-300 hover:dark:bg-white dark:text-white hover:dark:text-black hover:text-black block px-3 py-2 rounded-md text-base font-medium"
          >
           Blogs
          </button>
          {check &&
          <button
          onClick={function(){
            navigate("/publish")
          }}
            className="text-black hover:bg-gray-300 hover:dark:bg-white dark:text-white hover:dark:text-black hover:text-black block px-3 py-2 rounded-md text-base font-medium"
          >
         Add
          </button>
}
 {!check &&
          <button
          onClick={function(){
            navigate("/signin")
          }}
            className="text-black hover:bg-gray-300 hover:dark:bg-white dark:text-white hover:dark:text-black hover:text-black block px-3 py-2 rounded-md text-base font-medium"
          >
           Signin
          </button>
}
{!check &&
          <button
          onClick={function(){
            navigate("/signup")
          }}
            className="text-black hover:bg-gray-300 hover:dark:bg-white dark:text-white hover:dark:text-black hover:text-black block px-3 py-2 rounded-md text-base font-medium"
          >
          Signup
          </button>
}
<button
             onClick={function(){
              navigate("/about")
            }}
            className="text-black hover:bg-gray-300 hover:dark:bg-white dark:text-white hover:text-black hover:dark:text-black block px-3 py-2 rounded-md text-base font-medium"
          >
           About
          </button>
          </div>

          {/* Dropdown Menu */}
          {check &&
          <div >
            <DropdownMenu>
              <DropdownMenuTrigger className="relative cursor-pointer inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-600 rounded-full dark:bg-gray-400">
              <span className="font-medium text-white select-none">
  <img src="https://img.icons8.com/?size=80&id=83190&format=png&color=000000" alt="User Logo" className="w-4 h-4" />
</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")}>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/blogs")}>Blogs</DropdownMenuItem>
                <DropdownMenuItem onClick={() => { localStorage.removeItem("token"); setchk(false) ; window.location.href = '/signin' ; }}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>}

          {/* Mode Toggle */}
          <div className="my-2 mx-4 cursor-pointer inline-flex items-center justify-center w-8 h-8 mt-2 overflow-hidden bg-gray-600 rounded-full dark:bg-gray-600">
            <ModeToggle />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block dark:bg-black' : 'hidden'}`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <button
          onClick={function(){
            navigate("/")
          }}
            className="text-black hover:bg-gray-300 hover:dark:bg-white dark:text-white hover:dark:text-black block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </button>
          <button
             onClick={function(){
              navigate("/blogs")
            }}
            className="text-black hover:bg-gray-300 hover:dark:bg-white dark:text-white hover:dark:text-black block px-3 py-2 rounded-md text-base font-medium"
          >
           Blogs
          </button>
          {check &&
          <button
          onClick={function(){
            navigate("/publish")
          }}
            className="text-black hover:bg-gray-300 hover:dark:bg-white dark:text-white  hover:dark:text-black block px-3 py-2 rounded-md text-base font-medium"
          >
         Add
          </button>
}
 {!check &&
          <button
          onClick={function(){
            navigate("/signin")
          }}
            className="text-black hover:bg-gray-300 hover:dark:bg-white dark:text-white  hover:dark:text-black block px-3 py-2 rounded-md text-base font-medium"
          >
           Signin
          </button>
}
{!check &&
          <button
          onClick={function(){
            navigate("/signup")
          }}
            className="text-black hover:bg-gray-300 hover:dark:bg-white dark:text-white hover:dark:text-black block px-3 py-2 rounded-md text-base font-medium"
          >
            Signup
          </button>
}
<button
             onClick={function(){
              navigate("/about")
            }}
            className="text-black hover:bg-gray-300 hover:dark:bg-white dark:text-white hover:dark:text-black block px-3 py-2 rounded-md text-base font-medium"
          >
           About
          </button>
        </div>
      </div>
    </div>
  );
};
