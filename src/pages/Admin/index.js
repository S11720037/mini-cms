import React, { useState, useEffect } from "react";
import {
  Switch,
  Route,
  useRouteMatch,
  Link,
  useHistory,
} from "react-router-dom";
import { useCookies } from "react-cookie";

import { AdminNavbar, CreatePost, EditPost } from "../../components";
import { database } from "../../config";
import { Spinner } from "../../components";

function Admin() {
  document.title = "Mini CMS | Admin";

  let { path } = useRouteMatch();
  const history = useHistory();
  const [cookies] = useCookies();

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

  useEffect(() => {
    if (cookies.isAuthenticated) {
    } else {
      history.push("/login");
    }
  }, [cookies, history]);

  return (
    <div>
      <div>
        <AdminNavbar />

        <div className="container-fluid p-1 m-0 pt-3 mb-3">
          <div className="container-lg border rounded shadow p-3 bg-white">
            <Switch>
              <Route exact path={path}>
                <h2 className="text-center">Mini CMS Admin</h2>
                <hr />
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
                          <div className="col-sm-2">
                            <img
                              className="border rounded"
                              src={post.imageUrl}
                              alt={post.title}
                              style={{ maxWidth: "100%" }}
                            />
                          </div>
                          <div className="col-sm-10 d-flex align-items-center justify-content-center">
                            <div className="card-body">
                              <Link
                                to={`${path}/${post.slug}/edit`}
                                className="text-decoration-none text-dark"
                              >
                                <h3 className="card-title text-center fs-4">
                                  {post.title}
                                </h3>
                              </Link>
                              {/* <p className="card-text">
                              {post.content.substring(0, 200)}...
                            </p>
                            <p className="card-text">
                              <small className="text-muted">
                                Published on {post.updated.split(" ")[0]}
                              </small>
                            </p> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Route>

              {/* edit post */}
              <Route path={`${path}/:slug/edit`}>
                <EditPost />
              </Route>

              <Route path={`${path}/post`}>
                <h3>Kumpulan Post</h3>
              </Route>

              <Route path={`${path}/about`}>
                <h3>Halaman About</h3>
              </Route>

              <Route path={`${path}/create-post`}>
                <CreatePost />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
