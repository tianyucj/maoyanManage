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

const student = {
	student:{},
	data:{}
}
const studentReducer = function(state = student,action){
	if(action.type == "SHOW_STUDENT"){
		var newState = Object.assign({},state,{student:action.student});
		return newState
	}
	if(action.type == "SHOW_ALL_STUDENT"){
		var newState = Object.assign({},state,{data:action.data});
		return newState
	}
	return state
}

//将所有的reducer进行组合
const reducers = combineReducers({
	operateReducer:operateReducer,
	studentReducer:studentReducer
});

export default createStore(reducers);
