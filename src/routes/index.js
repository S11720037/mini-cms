import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Admin } from "../pages";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/admin">
          <Admin />
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;
