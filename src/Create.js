import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  let [title, setTitle] = useState("");
  let [body, setBody] = useState("");
  let [author, setAuthor] = useState("yoshi");
  let [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);
    console.log(title);
    let blog = { title, body, author };
    console.log("blog:", blog);

    fetch("http://localhost:8000/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    }).then(() => {
      console.log("Blog Added");
      setIsPending(false);
      navigate("/");
    });
  };

  return (
    <div className="create">
      <h2>Add A New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog Title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog Body</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>Blog Author:</label>
        <select value={author} onChange={(e) => setAuthor(e.target.value)}>
          <option value="mario">mario</option>
          <option value="yoshi">yoshi</option>
        </select>
        {isPending && <button>Adding Blog ..</button>}
        {!isPending && <button>Add Blog</button>}
      </form>
    </div>
  );
};

export default Create;
