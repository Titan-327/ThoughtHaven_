export const Footer=function(){
    return <footer className="bg-black py-12 px-6">
    <div className="text-center">
      <p className="text-white text-lg mb-4 animate__animated animate__fadeIn animate__delay-2s">
        © 2025 Titan Inc. All rights reserved.
      </p>
      <div className="flex justify-center space-x-6 animate__animated animate__fadeIn animate__delay-3s">
        <a href="https://github.com/Titan-327" className="text-white hover:text-blue-400">
          Github
        </a>
        <a href="https://leetcode.com/u/Titan_108/" className="text-white hover:text-blue-400">
          Leetcode
        </a>
        <a href="https://www.linkedin.com/in/harshit-singh-97b055265/" className="text-white hover:text-blue-400">
          LinkedIn
        </a>
      </div>
    </div>
  </footer>
}