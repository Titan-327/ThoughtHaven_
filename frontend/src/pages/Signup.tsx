import { Quote } from "../components/Quote"
import { Auth } from "../components/SignupAuth"

export const Signup=function(){
    return <div className=" dark:bg-gray-500">
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