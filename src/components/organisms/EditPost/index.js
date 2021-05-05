import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { database, storage } from "../../../config";
import { Spinner } from "../../../components";

function EditPost() {
  const { slug } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [previewImageUrl, setPreviewImageUrl] = useState(null);
  const [buttonStatus, setButtonStatus] = useState("enable");
  const [post, setPost] = useState({});

  useEffect(() => {
    database.ref("posts/" + slug).on("value", response => {
      const data = response.val();

      setPost(data);

      setTitle(data.title);
      setContent(data.content);
      setPreviewImageUrl(data.imageUrl);
    });
  }, [slug]);

  const handleImage = e => {
    if (e !== undefined) {
      // save new image to state
      setImage(e);
      setPreviewImageUrl(URL.createObjectURL(e));
    } else {
      // use default image when use not choose the image
      setImage(null);
      setPreviewImageUrl(post.imageUrl);
    }
  };

  const handleSubmit = () => {
    setButtonStatus("loading");

    // filter the data
    if (title.length <= 0) {
      alert("Judul Postingan Terlalu Pendek");
      setButtonStatus("enable");
      return;
    } else if (content.length <= 0) {
      alert("Konten Postingan Terlalu Pendek");
      setButtonStatus("enable");
      return;
    }

    if (image === null) {
      // update data, except image
      database
        .ref("posts/" + post.slug)
        .update({
          title: title,
          slug: post.slug,
          content: content,
          imageUrl: post.imageUrl,
          updated: new Date().toLocaleString(),
        })
        .then(() => {
          setButtonStatus("enable");
          alert("Postingan berhasil diupdate");
        })
        .catch(err => alert(err));
    } else {
      // update data with image
      const uploadTask = storage.ref(`/images/${image.name}`).put(image);
      uploadTask.on("state_changed", console.log, console.error, () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(imageUrl => {
            // store to google firebase
            database
              .ref("posts/" + post.slug)
              .update({
                title: title,
                slug: post.slug,
                imageUrl: imageUrl,
                content: content,
                updated: new Date().toLocaleString(),
              })
              .then(() => {
                setButtonStatus("enable");
                alert("Postingan berhasil diupdate");
              })
              .catch(err => alert(err));
          });
      });
    }
  };

  return (
    <div>
      <h2 className="text-center">Edit Post</h2>
      <hr />

      <label htmlFor="title">
        <span className="fs-2">Title</span>
      </label>
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
        <label>
          <span className="fs-2">Image</span>
        </label>
        <br />
        <label htmlFor="image" className="form-label" style={{ width: "100%" }}>
          {previewImageUrl && (
            <div className="card mb-3" style={{ width: "100%" }}>
              <div className="row ">
                <div className="col-md-6">
                  <img
                    src={previewImageUrl}
                    className="img-thumbnail"
                    alt="..."
                  />
                </div>
                <div className="col-md-6">
                  <div
                    className="card-body d-flex justify-content-center align-items-center"
                    style={{ height: "100%" }}
                  >
                    <div className="fs-4">Choose Image</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </label>
        <input
          className="form-control"
          type="file"
          id="image"
          onChange={e => handleImage(e.target.files[0])}
          style={{ display: "none" }}
        />
      </div>

      <label htmlFor="content">
        <span className="fs-2">Content</span>
      </label>
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
            Update
          </button>
        )}
        {buttonStatus === "disable" && (
          <button
            type="button"
            className="btn btn-primary disabled"
            onClick={handleSubmit}
            style={{ minWidth: "100px" }}
          >
            Update
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
