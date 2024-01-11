import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/loader.component";
import AnimationWrapper from "../common/page-animation";
import { getDay } from "../common/date";
import BlogInteraction from "../components/blog-interaction.component";
import BlogContent from "../components/blog-content.component";

export const blogStructure = {
    title: '',
    des: '',
    content: [],
    tags: [],
    author: { personal_info: { } },
    banner: '',
    publishedAt: '',

}

export const BlogContext = createContext({ })

const BlogPage = () => {


    let { blog_id } = useParams()

    const [ blog, setBlog ] = useState(blogStructure);

    const [ loading, setLoading ] = useState(true);

    const [islikeByUser, setLikedByUser ] = useState(false);

    let { title, content, banner, author: { personal_info: { fullname, username: author_username, profile_img } }, publishedAt } = blog;


    const fetchBlog = () => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-blog", { blog_id })
        .then(({ data: { blog } }) => {


            setBlog(blog);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        })
    }

    useEffect(() => {

        fetchBlog();

    }, [])

    return (
       
       <AnimationWrapper>
            {
               loading ? <Loader /> 
                :
                <BlogContext.Provider value = {{blog, setBlog, islikeByUser, setLikedByUser}}>
                     <div className="max-w-[900px] center py-10 max-lg:px-[5vw]">
                    <img src={banner} className="aspect-video" />
                    <div className="mt-12"> 
                        <h2>{title}</h2>                       
                    </div>
                        <div className="flex max-sm:flex-col justify-between my-8">
                            <div className="flex gap-2 item-start">
                               <img src={profile_img} className="w-12 h-12 rounded-full"/>

                               <p className="capitalize" >
                                <span className="dark-text">{fullname}</span>
                                    <br />
                                    <Link to={`/user/${author_username}`} className="underline">{author_username}
                                    </Link>
                               </p> 
                               
                            </div>
                           <p className="text-dark-grey opacity-75 max-sm:mt-6 max-sm:ml-12 max-sm:pl-5">Published on {getDay(publishedAt)}</p>
                        </div>

                                       
                            <div className="my-12 font-gelasio blog-page-content">

                                {
                                    content[0].blocks.map((block, i) =>{
                                        return <div key={1} className="my-4 md:my-8">
                                            <BlogContent block={block} />
                                        </div>
                                    })
                                }

                            </div>


                           <BlogInteraction/>            
                </div>
                </BlogContext.Provider>
            }       

       </AnimationWrapper>      
    )

}


export default BlogPage;