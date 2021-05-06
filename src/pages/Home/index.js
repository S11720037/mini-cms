import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Navbar } from "../../components";
import { database } from "../../config";
import { Spinner } from "../../components";

function Home() {
  document.title = "Mini CMS | Home";

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    database.ref("posts").on("value", res => {
      if (res.val()) {
        const rawData = res.val();
        const productArray = [];
        Object.keys(rawData).map(i => {
          return productArray.push({ id: i, ...rawData[i] });
        });
        setPosts(productArray);
      }
    });
  }, []);

  return (
    <div>
      <Navbar />

      <div className="p-1 pt-3" style={{ minHeight: "92.5vh" }}>
        <div className="container-lg rounded border shadow-sm p-2 bg-white">
          {/* <h2>Latest Post</h2> */}
          {/* <hr /> */}

          {posts.length === 0 && (
            <div className="text-center">
              <Spinner />
            </div>
          )}
          {posts.length > 0 && (
            <div>
              {posts.map((post, index) => (
                <div
                  className="card mb-3 shadow-sm animate__animated animate__fadeIn"
                  key={index}
                >
                  <div className="row p-1">
                    <div className="col-lg-4">
                      <img
                        className="border"
                        src={post.imageUrl}
                        alt={post.title}
                        style={{ width: "100%" }}
                      />
                    </div>
                    <div className="col-lg-8">
                      <div className="card-body">
                        <Link
                          to={post.slug}
                          className="text-decoration-none text-dark"
                        >
                          <h3 className="card-title">{post.title}</h3>
                        </Link>
                        <hr />
                        <p className="card-text">
                          {post.content.substring(0, 80)}...
                        </p>
                        <p className="card-text">
                          <small className="text-muted">
                            Published on {post.updated.split(" ")[0]} by Tendean
                            Arter
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
