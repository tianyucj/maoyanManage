import React from "react";
import {Row,Col,Card,Button,notification,Modal} from "antd";
import {ajax} from "../../tool/tools";
import store from "../../tool/store";
import {connect} from "react-redux";
const confirm = Modal.confirm;

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
      }
      if(searchData.division != undefined){
        obj={
          page:page,
          rows:pageSize,
          division:searchData.division
        }
      }
      if(searchData.phone != undefined){
        obj={
          page:page,
          rows:pageSize,
          phone:searchData.phone
        }
      }
    }else{
      obj={
        page:page,
        rows:pageSize
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
  deleteData(){
    if(this.props.userReducer.deleteData.length > 0){
     confirm({
      title: '删除提示',
      content: "请确认是否要删除当前选中数据？",
      onOk:function(){
        for(let i = 0;i < this.props.userReducer.deleteData.length;i++){
          ajax({
            type:"post",
            url:"/userLogData/del",
            data:{_id:this.props.userReducer.deleteData[i]._id},
            success:function(){
              notification['success']({
                message: '删除提醒',
                description: '删除已成功',
              });
              this.show();
            }.bind(this)
          })
        }
      }.bind(this)
    })
   }else{
    confirm({
      title: '提醒',
      content: "请先选择需要删除的数据！",
      onOk:function() {
        console.log("ok")
      }.bind(this),
      onCancel:function() {
        console.log("cancel")
      }.bind(this)
    })
  }
}
render(){
  return (<div>
   <Card title="用户管理">
   <Row>
   <Col span={2}>
   <AddUser show={this.show.bind(this)}></AddUser>
   </Col>
   <Col span={2}>
   <Button onClick={this.deleteData.bind(this)} type="danger">批量删除</Button>
   </Col>
   <Col span={8}>
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
