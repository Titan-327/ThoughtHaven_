import { useParams } from "react-router-dom"
import { FullBlogCard } from "../components/FullBlogCard"
import { useBlog } from "../hooks/index.ts"
import { Loader } from "../components/Loader.tsx"
export const Blog=function(){
    const {id}=useParams()
    if(!id) return <div>Invalid id</div>
      const {loading,blog}=useBlog(id) 
      if(loading){
        return <div>
      <Loader></Loader>
        </div>
      }
    return <div className="max-w-screen">
      <FullBlogCard key={blog.id} content={blog.content} title={blog.title} authorName={blog.author.name} createdAt={blog.createdAt} imageLink={blog.imageLink}  /> 
    </div>
}