import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./Store/rootReducer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { App } from "./App";
import { ValidateEmail } from "./Components/ValidateEmail";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/validate-email" component={ValidateEmail} />
        <Route default component={App} />
      </Switch>
    </Router>
  </Provider>,
  rootElement
);
