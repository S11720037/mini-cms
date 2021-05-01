import { Switch, Route, useRouteMatch } from "react-router-dom";

import { AdminNavbar, CreatePost } from "../../components";

function Admin() {
  document.title = "Mini CMS | Admin";
  let { path } = useRouteMatch();

  return (
    <div>
      <AdminNavbar />

      <div className="container-fluid p-1 m-0 mt-3">
        <div className="container-xl border rounded shadow p-3">
          <Switch>
            <Route exact path={path}>
              <h3>Halaman Awal</h3>
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
  );
}

export default Admin;
