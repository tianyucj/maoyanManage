import React from "react";
import {Button,Table,Modal,notification} from "antd";
import {ajax} from "../../tool/tools";
import store from "../../tool/store";
import {connect} from "react-redux";
const confirm = Modal.confirm;

class TableUser extends React.Component{
  constructor(props){
    super(props);

  }
  delete(text){
    confirm({
      title: '是否要删除?',
      content: text.name,
      onOk:function() {
        console.log('OK');
        ajax({
          type:"post",
          url:"/userLogData/del",
          data:{
            _id:text._id
          },
          success:function(){
            this.props.show();

            notification['success']({
              message: '删除提醒',
              description: '删除已成功',
            });
            this.props.router.replace("/Manage");

          }.bind(this)
        })
      }.bind(this),
      onCancel() {
        console.log('Cancel');
      },
    });

  }
  update(id){
    ajax({
      type:"get",
      url:"/userLogData/find",
      data:{
        _id:id
      },
      success:function(data){
        store.dispatch({
          type:"SHOW_UPDATE_MODAL",
          updateVisible:true
        });
        store.dispatch({
          type:"SHOW_USER",
          user:data
        });
      }.bind(this)
    })
  }
  render(){
    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '帐号',
      dataIndex: 'acc',
      key: 'acc',
    }, {
      title: '部门',
      dataIndex: 'division',
      key: 'division',
    }, {
      title: '职位',
      dataIndex: 'position',
      key: 'position',
    },{
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
    },{
      title: '密码',
      dataIndex: 'pwd',
      key: 'pwd',
    },{
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
        <Button type="primary" onClick={()=>{this.update(text._id)}}>修改</Button>
        <Button type="danger" onClick={()=>{this.delete(text)}}>删除</Button>

        </span>
        ),
      }];
      const data = this.props.userReducer.data;
      const pagination = {
        current:data.curpage,
        pageSize:data.eachpage,
        total:data.total,
        showSizeChanger:true,
        pageSizeOptions:['5','10','15'],
        onChange:function(page,pageSize){
          this.props.show(page,pageSize,this.props.forPage);
        }.bind(this),
        onShowSizeChange:function(page,pageSize){
          this.props.show(page,pageSize,this.props.forPage);
        }.bind(this)
      }
      return <div >
      <Table bordered columns={columns} pagination={pagination} dataSource={this.props.userReducer.data.rows} />

      </div>
    }
  }
  const mapStateToProps = function(store){
    return {
      wigetReducer:store.wigetReducer,
      userReducer:store.userReducer
    }
  }
  export default connect(mapStateToProps)(TableUser);
