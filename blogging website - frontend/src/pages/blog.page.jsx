import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const BlogPage = () => {

    let { blog_id } = useParams()

    const fetchBlog = () => {

        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-blog",{ blog_id })
        .then(({ data: { blog } }) => {

            console.log(blog);

        })
        .catch(err => {

            console.log(err.message);

        })

    }

    useEffect(() => {

        fetchBlog();

    },[])

    return (
       
        <h1>this is blogid : {blog_id}</h1>


    )

}


export default BlogPage;