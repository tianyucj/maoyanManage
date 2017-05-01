import React from "react";
import {ajax} from "../../tool/tools";
import AddElement from "./AddElement";
import TableElement from "./TableElement";
import 'antd/dist/antd.css';
import {Card,Row ,Col,message} from 'antd';
import store from "../../tool/store";
import {connect} from "react-redux";

class CinemaManage extends React.Component{
	constructor(props){
	    super(props);
	}
	show(page,eachpage=3){
	  	ajax({
	  		type:"post",
	  		url:"/theChainData/find",
	  		data:{
	  			page:page,
	  			rows:eachpage
	  		},
	  		success:function(data){
	  			// console.log(data);
	  			store.dispatch({
                    type:"SHOW_ALL_CINEMA",
                    data:data
                });
	  		}.bind(this)
	  	});
	}
    componentWillMount(){
       this.show();
    }
    render(){
        return (
	    	<Card>
	    		<h1 style={{textAlign:"center"}}>院线管理</h1>
	    		<AddElement></AddElement>
	    		<TableElement show={this.show.bind(this)}></TableElement>
	    	</Card>
    	)
  	}
}


const mapStateToProps = function(store){
    return {
        cinemaReducer:store.cinemaReducer
    }
}
export default connect(mapStateToProps)(CinemaManage);