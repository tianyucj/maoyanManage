import React from "react";
import {Row,Col,Card,Button,notification,Modal} from "antd";
import {ajax} from "../../tool/tools";
import store from "../../tool/store";
import {connect} from "react-redux";
const confirm = Modal.confirm;

import AddFilm from "./AddFilm";
import TableFilm from "./TableFilm";
import UpdateFilm from "./UpdateFilm";
import SearchFilm from "./SearchFilm";

class FilmManage extends React.Component{
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
      if(searchData.chName != undefined){
        obj={
          page:page,
          rows:pageSize,
          chName:searchData.chName
        }
      }
      if(searchData.enName != undefined){
        obj={
          page:page,
          rows:pageSize,
          enName:searchData.enName
        }
      } 
      if(searchData.place != undefined){
        obj={
          page:page,
          rows:pageSize,
          place:searchData.place
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
      url:"/filmData/find",
      data:obj,
      success:function(data){
        store.dispatch({
          type:"SHOW_ALL_FILM",
          data:data
        });
      }.bind(this)
    });
  }
  deleteData(){ 
    if(this.props.filmReducer.deleteData.length > 0){
     confirm({
      title: '是否要删除?',
      content: "是否要进行批量删除？！！",
      onOk:function(){
        for(let i = 0;i < this.props.filmReducer.deleteData.length;i++){
          ajax({
            type:"post",
            url:"/filmData/del",
            data:{_id:this.props.filmReducer.deleteData[i]._id},
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
      content: "您还没有选择需要删除的内容，请选择后再进行此操作！",
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
   <Card title="电影管理">
   <Row>
   <Col span={2}>
   <AddFilm show={this.show.bind(this)}></AddFilm>
   </Col>
   <Col span={2}>
   <Button onClick={this.deleteData.bind(this)} type="danger">批量删除</Button>
   </Col>
   <Col span={8}>
   <SearchFilm show={this.show.bind(this)}></SearchFilm>
   </Col>
   </Row>
   <TableFilm forPage={this.state.forPage} show={this.show.bind(this)}></TableFilm>
   <UpdateFilm show={this.show.bind(this)}></UpdateFilm>
   </Card>
   </div>
   )
 }
}
const mapStateToProps = function(store){
  return {
    filmReducer:store.filmReducer
  }
}
export default connect(mapStateToProps)(FilmManage);