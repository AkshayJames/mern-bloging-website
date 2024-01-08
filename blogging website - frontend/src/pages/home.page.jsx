import { useEffect, useState } from "react";
import AnimationWrapper from "../common/page-animation"
import InPageNavigation, { activeTabLineRef, activeTabRef } from "../components/inpage-navigation.component";
import axios from "axios"
import Loader from "../components/loader.component";
import BlogPostCard from "../components/blog-post.component";
import MinimalBlogPost from "../components/nobanner-blog-post.component";
import NoDataMessage from "../components/nodata.component";
import { filterPaginationData } from "../common/filter-pagination-data";
import LoadMoreDataBtn from "../components/load-more.component";

const HomePage = () => {


    let [ blogs, setBlog ] =useState(null);
    let [ trendingBlogs, setTrendingBlog ] =useState(null);
    let [pageState , setPageState ] = useState("home");

    let categories = ["food" ,"technology", "health", "sports", "finance","travel", "Gameing" ,"Medical" ,"Business"]


    const   fetchLatestBlogs = ( page = 1 ) => {

        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/latest-blogs", { page } )
        .then( async( { data } ) => {

            console.log( data.blogs );
            
            let formatedData = await filterPaginationData( {

                state: blogs,
                data: data.blogs,
                page,
                countRoute: "/all-latest-blogs-count"

            } )

            console.log( formatedData);

            setBlog(formatedData);

        })
        .catch( (err) => {
            console.error(err);
        })
    }

    const 
    
    fetchBlogByCategory = ({ page = 1 }) => {

        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs" , { tag : pageState, page })
        .then( async ( { data } ) => {

            let formatedData = await filterPaginationData({

                state: blogs,
                data: data.blogs,
                page,
                countRoute: "/search-blogs-count",
                data_to_send: { tag : pageState }

            } )


            setBlog(formatedData);

        })
        .catch( (err) => {
            console.error(err);
        })

    }

    const fetchTrendingBlogs = () => {

        axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/trending-blogs" )
        .then( ( { data } ) => {

            setTrendingBlog(data.blogs);

        })
        .catch( (err) => {
            console.error(err);
        })
    }


    const loadBlogByCategory = (e) => {

        let category = e.target.innerText.toLowerCase();

        setBlog(null);

        if(pageState == category) {
            setPageState("home");
            return;
        }

        setPageState(category);

    }

    useEffect( () => {

        activeTabRef.current.click();

        if(pageState == "home") {

            fetchLatestBlogs( { page: 1 } );

        }else {
            fetchBlogByCategory( { page: 1 } )
        }

        if(!trendingBlogs){

            fetchTrendingBlogs();
        }

    },[pageState])


    return(
    <AnimationWrapper>
        <section className="h-cover flex justify-center gap-10">

                {/* latest blog */}

            <div className="w-full">

                <InPageNavigation routes = {[ pageState , "trending blogs"]} defaultHidden={["trending blogs"]}>

                    <>
                        {
                            blogs == null ? (

                               <Loader/>

                            ) : (   

                            blogs.results.length ? 

                            blogs.results.map( (blog , i) => {
                                return (<AnimationWrapper 
                                        
                                        transition={ { duration:1 , delay : i*.1 } } key = {i} >

                                        <BlogPostCard content = {blog} author = {blog.author.personal_info} />

                                 </AnimationWrapper>
                            );

                            }) 
                            
                            : <NoDataMessage message = "no blogs" />
                        )}

                        <LoadMoreDataBtn  state={blogs} fetchDataFun={ ( pageState == "home" ? fetchLatestBlogs : fetchBlogByCategory) }/>
                    
                    </>

                       {

                            trendingBlogs == null ? (
                            <Loader/>
                             ) : ( 

                            trendingBlogs.length ? 

                            trendingBlogs.map( (blog , i) => {
                                return (
                                <AnimationWrapper transition={ { duration:1 , delay : i*.1 } } key = {i} >

                                          <MinimalBlogPost blog= {blog} index= {i} />

                                       </AnimationWrapper>
                                )
                                })                   
                             
                                : <NoDataMessage message = "no trending blogs" />
                             )}   

                </InPageNavigation>

            </div>

                {/* filter and trending blog */}
            <div  className="min-w-[40%] lg:min-w-[400px] max-w-min border-l  border-grey pl-8 pt-3 max-md:hidden">

                 <div className="flex flex-col gap-10">

                        <h1 className="blog-title"> Check out the latest blogs </h1>

                        <div className="flex gap-3 flex-wrap mb-10">
                            {
                                categories.map ((category, i)=>{

                                    return (

                                       <button onClick={loadBlogByCategory} className={"tag " + (pageState == category ? 
                                        "bg-black text-white" : " ")} 
                                       key ={i} >

                                        {category}

                                       </button>
                                    )
                                })

                            }
                        </div>
                 </div>

                 <div>

                    <h1 className="font-medium texl-xl mb-8">Trending <i className="fi fi-rr-chart-line-up ml-1" ></i> </h1>

                    

                 </div>

                 <div>
                         {

                            trendingBlogs == null ? (
                            <Loader/>
                             ) : (

                            trendingBlogs.length ?
                            
                            trendingBlogs.map( (blog , i) => {
                                return ( <AnimationWrapper transition={ { duration:1 , delay : i*.1 } } key = {i} >

                                          <MinimalBlogPost blog= {blog} index= {i} />

                                       </AnimationWrapper>
                                        );
                                })                        
                             
                              : <NoDataMessage message = "no trending blogs" /> 

                        )}     
                   
                 </div>
            </div>


        </section>
    </AnimationWrapper>
    )
}

export default HomePage;