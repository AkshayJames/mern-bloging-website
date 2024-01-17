const BlogContent = ({ block }) => {
   

    let { type, data }= block;

    if(type == "paragraph"){
        return <p dangerouslySetInnerHTML={{__html: data.text}}></p>
    }
    else {
        
        ""
    }
}

export default BlogContent