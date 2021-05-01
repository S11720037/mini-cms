import { useState } from "react";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = () => {
    console.log(title, content);
  };

  return (
    <div>
      <h2 className="text-center">Create Post</h2>
      <hr />

      <label htmlFor="title">Enter Post Title</label>
      <div className="mb-3">
        <input
          type="email"
          className="form-control"
          id="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="image" className="form-label">
          Choose Image
        </label>
        <input className="form-control" type="file" id="image" />
      </div>

      <label htmlFor="floatingTextarea2">Content</label>
      <div className="form-floating">
        <textarea
          className="form-control"
          placeholder="Leave a comment here"
          id="floatingTextarea2"
          style={{ height: "200px" }}
          onChange={e => setContent(e.target.value)}
          value={content}
        />
      </div>

      <div className="mt-3">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Post
        </button>
      </div>
    </div>
  );
}

export default CreatePost;
