import React from "react";
import {ajax} from "../../tool/tools";
import AddElement from "./AddElement";
import Search from "./Search";
import TableElement from "./TableElement";
import UpdataElement from "./UpdataElement";
import 'antd/dist/antd.css';
import {Card,Row ,Col,message,Button,Modal} from 'antd';
import store from "../../tool/store";
import {connect} from "react-redux";

const confirm = Modal.confirm;
class CinemaManage extends React.Component{
	constructor(props){
	    super(props);
	    this.state = {
            forPage:{}
        }
	}
	show(page,pageSize,searchData){
		var obj={
            page:page,
            rows:pageSize
        };
        if(searchData != undefined){
            this.setState({
				forPage:searchData
            })
            	
            if(searchData.chainName != undefined){
                obj={
                    page:page,
                    rows:pageSize,
                    chainName:searchData.chainName
                }
            }
            if(searchData.address != undefined){
                obj={
                    page:page,
                    rows:pageSize,
                    address:searchData.address
                }
            }
        }else{
        	obj={
	            page:page,
	            rows:pageSize
	        }
        }
	  	ajax({
	  		type:"post",
	  		url:"/theChainData/find",
	  		data:obj,
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
    batchDel(){
    	let delData = this.props.cinemaReducer.batchDel;
		console.log(delData);
	    if(delData.length>0){
	    	confirm({
		        title: '确认删除？',
		        content: '是否批量删除所选数据？',
		        onOk:function(){
			    	for(let i=0;i<delData.length;i++){
			    		ajax({
			    			type:"post",
			    			url:"/theChainData/del",
			    			data:{
			    				_id:delData[i]._id
			    			},
			    			success:function(){
			    				this.show();
			    			}.bind(this)
			    		})
			    	}
		     	}.bind(this)  
		    });
	    }else{
	    	confirm({
		        title: '提示',
		        content: '没有选择数据', 
		    });
	    }
    }
    render(){
        return (
	    	<Card title="院线管理">
	    		<Row style={{marginBottom:"20px"}}>
	    		<Col span={2}>
	    		<AddElement show={this.show.bind(this)}></AddElement>
	    		</Col>
				<Col span={3}>
	    		<Button type="danger" onClick={this.batchDel.bind(this)}>批量删除</Button>
	    		</Col>
	    		<Col span={8}>
	    		<Search show={this.show.bind(this)}></Search>
	    		</Col>

	    		</Row>
	    		<UpdataElement show={this.show.bind(this)}></UpdataElement>
	    		<TableElement forPage={this.state.forPage} show={this.show.bind(this)}></TableElement>
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