import React from "react";
import {Row,Col,Card} from "antd";
import {ajax} from "../../tool/tools";
import store from "../../tool/store";
import {connect} from "react-redux";

import AddUser from "./AddUser";
import TableUser from "./TableUser";
import UpdateUser from "./UpdateUser";
import SearchUser from "./SearchUser";

class UserMessage extends React.Component{
	constructor(props){
		super(props);
        this.state = {
            forPage:{}
        }
	}
    componentWillMount(){
        this.show();
    }
    show(page,pageSize,searchData){
        var obj={
            page:page,
            rows:pageSize
        };
        if(searchData != undefined){
            this.state.forPage = searchData;
           if(searchData.name != undefined){
                obj={
                    page:page,
                    rows:pageSize,
                    name:searchData.name
                }
            }else if(searchData.division != undefined){
                obj={
                    page:page,
                    rows:pageSize,
                    division:searchData.division
                }
            }else if(searchData.phone != undefined){
                obj={
                    page:page,
                    rows:pageSize,
                    phone:searchData.phone
                }
            }
        }
        ajax({
            type:"get",
            url:"/userLogData/find",
            data:obj,
            success:function(data){
                store.dispatch({
                    type:"SHOW_ALL_USER",
                    data:data
                });
            }.bind(this)
        });
    }
	render(){
		return (<div>
			<Card title="电影管理">
			<Row>
			<Col span={2}>
			<AddUser show={this.show.bind(this)}></AddUser>
			</Col>
            <Col span={16}>
            <SearchUser show={this.show.bind(this)}></SearchUser>
            </Col>
			</Row>
            <TableUser forPage={this.state.forPage} show={this.show.bind(this)}></TableUser>
            <UpdateUser show={this.show.bind(this)}></UpdateUser>
			</Card>
			</div>
			)
	}
}
const mapStateToProps = function(store){
    return {
        userReducer:store.userReducer
    }
}
export default connect(mapStateToProps)(UserMessage);