import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useNavigate } from "react-router-dom";

const BlogDetails = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  let handleDelete = () => {
    fetch("http://localhost:8000/blogs/" + id, { method: "DELETE" }).then(
      () => {
        console.log("Blog Deleted");
        navigate("/");
      }
    );
  };

  let {
    data: blog,
    isPending,
    error,
  } = useFetch(`http://localhost:8000/blogs/${id}`);
  return (
    <div className="blog-details">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}

      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by: {blog.author}</p>
          <div>{blog.body}</div>
          <button onClick={handleDelete}>Delete Blog</button>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
