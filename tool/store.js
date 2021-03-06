import {createStore,combineReducers} from "redux";

const wiget = {
	updateVisible:false,
	addOnlineFilmVisible:false,//院线匹配增加在线影片的弹窗
	addChipArrangementVisible:false,//院线匹配增加排片情况的弹窗
	showChipArrangementVisible:false,//院线匹配查看排片情况的弹窗
	updateChipArrangementVisible:false,//院线匹配修改排片情况的弹窗,
	selectRowKeys:[]
}
const operateReducer = function(state = wiget,action){
	if(action.type == "SHOW_UPDATE_MODAL"){
		var newState = Object.assign({},state,{updateVisible:action.updateVisible});
		return newState
	}
	if(action.type == "SHOW_ADDONLINEFILM_MODAL"){
		var newState = Object.assign({},state,{addOnlineFilmVisible:action.addOnlineFilmVisible});
		return newState
	}
	if(action.type == "SHOW_ADDCHIPARRANGEMENT_MODAL"){
		var newState = Object.assign({},state,{addChipArrangementVisible:action.addChipArrangementVisible});
		return newState
	}
	if(action.type == "SHOW_CHIPARRANGEMENT_MODAL"){
		var newState = Object.assign({},state,{showChipArrangementVisible:action.showChipArrangementVisible});
		return newState
	}
	if(action.type == "SHOW_UPDATECHIPARRANGEMENT_MODAL"){
		var newState = Object.assign({},state,{updateChipArrangementVisible:action.updateChipArrangementVisible});
		return newState
	}
	if(action.type == "SELECTROWKEYS_ONLINE"){
		var newState = Object.assign({},state,{selectRowKeys:action.selectRowKeys});
		return newState
	}
	return state
}

// 用户管理的reducer，user用于点击修改时显示在弹窗上的数据，data用于用户管理界面展示的所有数据
const user = {
	user:{},
	data:{},
	deleteData:[]
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
	if(action.type == "DELETE_ALL_USERDATA"){
		var newState = Object.assign({},state,{deleteData:action.deleteData});
		return newState
	}
	return state
}

// 电影管理的reducer，user用于点击修改时显示在弹窗上的数据，data用于电影管理界面展示的所有数据
const film = {
	film:{},
	data:{},
	deleteData:[]
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
	if(action.type == "DELETE_ALL_FILMDATA"){
		var newState = Object.assign({},state,{deleteData:action.deleteData});
		return newState
	}
	return state
}
// 影院管理的reducer，user用于点击修改时显示在弹窗上的数据，data用于用户影院管理展示的所有数据
const cinema = {
	cinema:{},
	data:{},
	batchDel:[]
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
	if(action.type == "SHOW_BATCHDEL_CINEMA"){
		var newState = Object.assign({},state,{batchDel:action.batchDel});
		return newState
	}
	return state
}
// 院线匹配的reducer，cinema用于点击对应数据的增加排片该条数据，data用于院线匹配界面展示的所有数据
const cinemaMatch = {
	cinema:[],
	data:[],
	selectData:[],
	addChip:[]
}
const cinemaMatchReducer = function(state = cinemaMatch,action){
	if(action.type == "SHOW_CINEMAMATCH"){
		// 查看排片情况时使用
		var newState = Object.assign({},state,{cinema:action.cinema});
		return newState
	}
	if(action.type == "SHOW_ADD_CINEMAMATCH"){
		// 增加排片时使用
		var newState = Object.assign({},state,{addChip:action.addChip});
		return newState
	}
	if(action.type == "SHOW_ALL_CINEMAMATCH"){
		var newState = Object.assign({},state,{data:action.data});
		return newState
	}
	if(action.type == "DELETECONTENTS_ONLINE"){
		var newState = Object.assign({},state,{selectData:action.selectData});
		return newState
	}
	return state
}
//热映电影管理
const wellReceive = {
	data:{},
	deleteData:[]
}
const wellReceiveReducer = function(state = wellReceive,action){
	if(action.type == "SHOW_ALL_WELLRECEIVE"){
		var newState = Object.assign({},state,{data:action.data});
		return newState
	}
	if(action.type == "DELETE_ALL_WELLRECEIVEDATA"){
		var newState = Object.assign({},state,{deleteData:action.deleteData});
		return newState
	}
	return state
}
//订单管理
const orderManage = {
	orderManage:{},
	data:{},
	deleteData:[]
}
const orderManageReducer = function(state = orderManage,action){
	if(action.type == "SHOW_ORDERMANAGE"){
		var newState = Object.assign({},state,{orderManage:action.orderManage});
		return newState
	}
	if(action.type == "SHOW_ALL_ORDERMANAGE"){
		var newState = Object.assign({},state,{data:action.data});
		return newState
	}
	if(action.type == "DELETE_ALL_ORDERDATA"){
		var newState = Object.assign({},state,{deleteData:action.deleteData});
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
	cinemaMatchReducer:cinemaMatchReducer,
	wellReceiveReducer:wellReceiveReducer,
	orderManageReducer:orderManageReducer
});

export default createStore(reducers);
