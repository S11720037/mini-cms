import { useState } from "react";

import { database, storage } from "../../../config";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = () => {
    console.log(image.name);

    // const uploadTask = storage.ref(`/images/${image.name}`).put(image);
    // uploadTask.on("state_changed", console.log, console.error, () => {
    //   storage
    //     .ref("images")
    //     .child(image.name)
    //     .getDownloadURL()
    //     .then(url => {
    //       console.log(url);
    //     });
    // });

    // 'file' comes from the Blob or File API
    storage
      .ref(`/images/${image.name}`)
      .put(image)
      .then(response => {
        console.log(response);
        console.log("Uploaded a blob or file!");
      });
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
        <input
          className="form-control"
          type="file"
          id="image"
          onChange={e => setImage(e.target.files[0])}
        />
      </div>

      <label htmlFor="content">Content</label>
      <div>
        <textarea
          className="form-control"
          placeholder="Leave a comment here"
          id="content"
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
