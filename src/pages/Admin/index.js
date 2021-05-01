import { AdminNavbar } from "../../components";

import { Switch, Route, Link, useRouteMatch } from "react-router-dom";

function Admin() {
  document.title = "Mini CMS | Admin";
  let { path, url } = useRouteMatch();

  return (
    <div>
      <AdminNavbar />

      <div className="container-fluid p-1 m-0 mt-3">
        <div className="container-xl border rounded shadow p-3">
          <div className="row">
            <div className="col-sm-2">
              <div>
                <Link to={`${url}`}>
                  <button
                    type="button"
                    style={{ width: "100%" }}
                    className="m-1 btn btn-outline-primary"
                  >
                    Satu
                  </button>
                </Link>

                <Link to={`${url}/post`}>
                  <button
                    type="button"
                    style={{ width: "100%" }}
                    className="m-1 btn btn-outline-primary"
                  >
                    Dua
                  </button>
                </Link>
              </div>
            </div>
            <div className="col-sm-10">
              <Switch>
                <Route exact path={path}>
                  <h3>Halaman Awal</h3>
                </Route>
                <Route path={`${path}/post`}>
                  <h3>Kumpulan Post</h3>
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
