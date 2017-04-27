import React from "react";
import ReactDOM from "react-dom";
import Manage from "../manage/Manage";
import {Route,Router,IndexRoute,hashHistory} from "react-router";
import Index from "../index/Index";

ReactDOM.render(<Router history={hashHistory}>
    <Route path="/" component={Index}>
      <Route path="/manage" component={Manage}></Route>
    </Route>
  </Router>,document.getElementById("manage"));
