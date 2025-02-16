import { Suspense} from 'react'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import {Signup} from "./pages/Signup"
import { Signin } from './pages/Signin'
import {Blog} from "./pages/Blog"
import { Blogs } from './pages/Blogs.tsx'
import { AppBar } from './components/AppBar.tsx'
import {Publish} from "./pages/Publish.tsx"
import { ThemeProvider } from './components/theme-provider.tsx'
import { Profile } from './pages/Profile.tsx'
import { Landing } from './pages/Landing.tsx'
import { Footer } from './components/Footer.tsx'
import { Update } from './pages/Update.tsx'
import { About } from './pages/About.tsx'
import { RecoilRoot } from 'recoil'
import { ToastContainer } from 'react-toastify';
function App() {
 
  return (
    <>
     <RecoilRoot>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <BrowserRouter>
    <ToastContainer/>
 <Suspense fallback="loading..."> <AppBar></AppBar></Suspense>

    <Routes>
      <Route path="/" element={<Landing/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/signin" element={<Signin/>}></Route>
      <Route path="/blog/:id" element={<Blog/>}></Route>
    
  <Route path="/blogs" element={<Blogs/>}></Route>
  
      <Route path="/publish" element={<Publish/>}></Route>
      <Route path="/profile" element={<Profile/>}></Route>
      <Route path="/update/:id" element={<Update/>}></Route>
      <Route path="/about" element={<About/>}></Route>
    </Routes>
  
    <Footer/>
    </BrowserRouter>
    </ThemeProvider>
    </RecoilRoot>
    </>
  )
}

export default App
