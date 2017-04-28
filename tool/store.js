import {createStore,combineReducers} from "redux";

const wiget = {
	updateVisible:false
}
const operateReducer = function(state = wiget,action){
	if(action.type == "SHOW_UPDATE_MODAL"){
		var newState = Object.assign({},state,{updateVisible:action.updateVisible});
		return newState
	}
	return state
}

// 用户管理的reducer，user用于点击修改时显示在弹窗上的数据，data用于用户管理界面展示的所有数据
const user = {
	user:{},
	data:{}
}
const userReducer = function(state = user,action){
	if(action.type == "SHOW_USER"){
		var newState = Object.assign({},state,{user:action.user});
		return newState
	}
	if(action.type == "SHOW_ALL_USER"){
		var newState = Object.assign({},state,{data:action.data});
		return newState
	}
	return state
}

// 电影管理的reducer，user用于点击修改时显示在弹窗上的数据，data用于电影管理界面展示的所有数据
const film = {
	film:{},
	data:{}
}
const filmReducer = function(state = film,action){
	if(action.type == "SHOW_FILM"){
		var newState = Object.assign({},state,{film:action.film});
		return newState
	}
	if(action.type == "SHOW_ALL_FILM"){
		var newState = Object.assign({},state,{data:action.data});
		return newState
	}
	return state
}
// 影院管理的reducer，user用于点击修改时显示在弹窗上的数据，data用于用户影院管理展示的所有数据
const cinema = {
	cinema:{},
	data:{}
}
const cinemaReducer = function(state = cinema,action){
	if(action.type == "SHOW_CINEMA"){
		var newState = Object.assign({},state,{cinema:action.cinema});
		return newState
	}
	if(action.type == "SHOW_ALL_CINEMA"){
		var newState = Object.assign({},state,{data:action.data});
		return newState
	}
	return state
}
// 院线匹配的reducer，user用于点击修改时显示在弹窗上的数据，data用于院线匹配界面展示的所有数据
const cinemaMatch = {
	cinema:{},
	data:{}
}
const cinemaMatchReducer = function(state = cinemaMatch,action){
	if(action.type == "SHOW_CINEMAMATCH"){
		var newState = Object.assign({},state,{cinemaMatch:action.cinemaMatch});
		return newState
	}
	if(action.type == "SHOW_ALL_CINEMAMATCH"){
		var newState = Object.assign({},state,{data:action.data});
		return newState
	}
	return state
}
//将所有的reducer进行组合
const reducers = combineReducers({
	operateReducer:operateReducer,
	userReducer:userReducer,
	filmReducer:filmReducer,
	cinemaReducer:cinemaReducer,
	cinemaMatchReducer:cinemaMatchReducer
});

export default createStore(reducers);
