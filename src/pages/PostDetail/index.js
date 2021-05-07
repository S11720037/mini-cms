import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { Navbar } from "../../components";
import { database } from "../../config";

export default function PostDetail() {
  const { slug } = useParams();

  const [post, setPost] = useState({});

  useEffect(() => {
    database.ref("posts/" + slug).on("value", res => {
      setPost(res.val());
    });
  }, [slug]);

  useEffect(() => {
    document.title = `Mini CMS | ${post.title}`;
  }, [post]);

  return (
    <div>
      <Navbar />

      <div className="p-1 mt-3 mb-3">
        <div className="container-lg border rounded shadow p-2">
          <h3 className="text-center">{post.title}</h3>
          <hr />
          <div className="text-center">
            <img
              src={post.imageUrl}
              className="img-thumbnail"
              alt="..."
              style={{ maxWidth: "77vw" }}
            />
          </div>
          <div>{post.content}</div>
        </div>
      </div>
    </div>
  );
}
