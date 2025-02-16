"use client";

import { SparklesCore } from "../components/ui/sparkles";

export function About() {
  // const [darkMode, setDarkMode] = useState(false);

  // Check the saved theme on mount
 
  // Update theme in localStorage and body class

  return (

   
    <div
      className={`h-[40rem] bg-white dark:bg-slate-700 relative w-full flex flex-col items-center justify-center overflow-hidden rounded-md transition-all duration-500 `}
 
    >
      
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
         
        />
      </div>
      <h1
        className={`
           dark:text-white text-black
         md:text-7xl text-3xl lg:text-6xl font-bold text-center relative z-20`}
      >
        Titan Inc.
      </h1>
    </div>
  );
}
