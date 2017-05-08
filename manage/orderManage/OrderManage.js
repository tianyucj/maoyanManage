import React from "react";
import {Row,Col,Card,Button,notification,Modal} from "antd";
import {ajax} from "../../tool/tools";
import store from "../../tool/store";
import {connect} from "react-redux";
const confirm = Modal.confirm;

import MaoyanUser from "./MaoyanUser";
import TableOrder from "./TableOrder";
import SearchOrder from "./SearchOrder";
import UpdateOrder from "./UpdateOrder";

class OrderManage extends React.Component{
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
      if(searchData.filmName != undefined){
        obj={
          page:page,
          rows:pageSize,
          filmName:searchData.filmName
        }
      }
      if(searchData.address != undefined){
        obj={
          page:page,
          rows:pageSize,
          address:searchData.address
        }
      }
      if(searchData.ticketPrice != undefined){
        obj={
          page:page,
          rows:pageSize,
          ticketPrice:parseInt(searchData.ticketPrice)
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
      url:"/orderData/find",
      data:obj,
      success:function(data){
        store.dispatch({
          type:"SHOW_ALL_ORDERMANAGE",
          data:data
        });
      }.bind(this)
    });
  }
  deleteData(){
    if(this.props.orderManageReducer.deleteData.length > 0){
     confirm({
      title: '删除提示',
      content: "请确认是否要删除当前选中数据？",
      onOk:function(){
        for(let i = 0;i < this.props.orderManageReducer.deleteData.length;i++){
          ajax({
            type:"post",
            url:"/orderData/del",
            data:{_id:this.props.orderManageReducer.deleteData[i]._id},
            success:function(){
              this.show();
							store.dispatch({
								type:"SELECTROWKEYS_ONLINE",
								selectRowKeys:[]
							})
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
   <Card title="订单管理">
   <Row>
   <Col span={2}>
   <MaoyanUser></MaoyanUser>
   </Col>
   <Col span={2}>
   <Button onClick={this.deleteData.bind(this)} type="danger">批量删除</Button>
   </Col>
   <Col span={8}>
   <SearchOrder show={this.show.bind(this)}></SearchOrder>
   </Col>
   </Row>
   <TableOrder forPage={this.state.forPage} show={this.show.bind(this)}></TableOrder>
	 <UpdateOrder show={this.show.bind(this)}></UpdateOrder>
   </Card>
   </div>
   )
}

}
const mapStateToProps = function(store){
  return {
    orderManageReducer:store.orderManageReducer
  }
}
export default connect(mapStateToProps)(OrderManage);
