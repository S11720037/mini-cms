import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Admin, Home, PostDetail } from "../pages";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/:slug">
          <PostDetail />
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;
