import {Auth} from "../components/SigninAuth"
import { Quote } from "../components/Quote"

export const Signin=function(){
    return <div>
    <div className="grid grid-cols-2">
         
            <div className="col-span-2 lg:col-span-1">
                <Auth/>
            </div>
            <div className="hidden lg:block">
            <Quote/>
            </div>
        </div>
        </div> 
}