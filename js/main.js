import React from "react";
import ReactDOM from "react-dom";
import Manage from "../manage/Manage";
import Login from "../login/Login";
import UserMessage from "../manage/userMessage/UserMessage";
import FilmManage from "../manage/filmManage/FilmManage";
import CinemaManage from "../manage/cinemaManage/CinemaManage";
import CinemaMatch from "../manage/cinemaMatch/CinemaMatch";
import WellReceived from "../manage/wellReceived/WellReceived";
import OrderManage from "../manage/orderManage/OrderManage";
import {Route,Router,IndexRoute,hashHistory} from "react-router";
import Index from "../index/Index";

import store from "../tool/store";
import {Provider} from "react-redux";

ReactDOM.render(<Provider store={store}><Router history={hashHistory}>
    <Route path="/" component={Index}>
      <IndexRoute component={Login}></IndexRoute>
      <Route path="/login" component={Login}></Route>
      <Route path="/manage" component={Manage}>
        <IndexRoute component={UserMessage}></IndexRoute>
        <Route path="/user" component={UserMessage}></Route>
        <Route path="/film" component={FilmManage}></Route>
        <Route path="/cinema" component={CinemaManage}></Route>
        <Route path="/cinemaMatch" component={CinemaMatch}></Route>
        <Route path="/wellReceived" component={WellReceived}></Route>
        <Route path="/orderManage" component={OrderManage}></Route>
      </Route>
    </Route>
  </Router></Provider>,document.getElementById("manage"));
