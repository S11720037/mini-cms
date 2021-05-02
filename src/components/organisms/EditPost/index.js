import { useState, useEffect } from "react";
import slugify from "slugify";
import { useHistory } from "react-router-dom";

import { database, storage } from "../../../config";
import { Spinner } from "../../../components";

function EditPost() {
  let history = useHistory();

  const slug = window.location.href.split("/");
  console.log(slug);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [buttonStatus, setButtonStatus] = useState("disable");

  // for image
  useEffect(() => {
    const validate = () => {
      if (title.length > 0 && content.length > 0 && image !== null) {
        setButtonStatus("enable");
      } else {
        setButtonStatus("disable");
      }
    };

    validate();
  }, [title, image, content]);

  const handleSubmit = () => {
    setButtonStatus("loading");

    console.log(slugify(title, { lower: true, strict: true }));
    const uploadTask = storage.ref(`/images/${image.name}`).put(image);
    uploadTask.on("state_changed", console.log, console.error, () => {
      storage
        .ref("images")
        .child(image.name)
        .getDownloadURL()
        .then(imageUrl => {
          // store to database
          console.log(imageUrl);
          database
            .ref("posts/" + slugify(title, { lower: true, strict: true }))
            .set({
              title: title,
              slug: slugify(title, { lower: true, strict: true }),
              imageUrl: imageUrl,
              content: content,
              updated: new Date().toLocaleString(),
            })
            .then(() => {
              console.log("data berhasil ditambahkan");

              history.push("/admin");
            })
            .catch(err => console.lor(err));
        });
    });
  };

  return (
    <div>
      <h2 className="text-center">Create Post</h2>
      <hr />

      <label htmlFor="title">Title</label>
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
          Image
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
          placeholder=""
          id="content"
          style={{ height: "200px" }}
          onChange={e => setContent(e.target.value)}
          value={content}
        />
      </div>

      <div className="mt-3 text-center">
        {buttonStatus === "enable" && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSubmit}
            style={{ minWidth: "100px" }}
          >
            Post
          </button>
        )}
        {buttonStatus === "disable" && (
          <button
            type="button"
            className="btn btn-primary disabled"
            onClick={handleSubmit}
            style={{ minWidth: "100px" }}
          >
            Post
          </button>
        )}
        {buttonStatus === "loading" && (
          <button
            type="button"
            className="btn btn-primary disabled"
            onClick={handleSubmit}
            style={{ minWidth: "100px" }}
          >
            <Spinner />
          </button>
        )}
      </div>
    </div>
  );
}

export default EditPost;
