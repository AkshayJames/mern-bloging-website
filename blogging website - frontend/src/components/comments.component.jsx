import { useContext } from "react";
import { BlogContext } from "../pages/blog.page";

const CommentsContainer  = () => {

    let { commentsWrapper, setCommentsWrapper, blog: { title, author:{personal_info:{fullname,username: author_username, profile_img}}}} = useContext(BlogContext)


    return (
       <div className={"max-sm:w-full fixed " + ( commentsWrapper ? "top-0 sm:right-0" : "top-[100%] sm:right-[-100%]") + " duration-700 max-sm:right-0 sm:top-0 w-[30%] min-w-[350px] h-full z-50 bg-white shadow-2xl p-8 px-16 overflow-y-auto overflow-x-hidden"}>

        <div className="relative">
            <h1 className="text-xl font-medium">Comments</h1>
            <p className="text-lg mt-2 w-[70%] text-dark-grey line-clamp">{ title}</p>
            <p>{fullname} username: {author_username} </p>
            <img src={profile_img}></img>
        </div>

       </div>
    )
}

export default CommentsContainer;