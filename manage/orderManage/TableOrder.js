import React from "react";
import {Button,Table,Modal,notification} from "antd";
import {ajax} from "../../tool/tools";
import store from "../../tool/store";
import {connect} from "react-redux";
const confirm = Modal.confirm;

class TableOrder extends React.Component{
  constructor(props){
    super(props);
  }
  delete(text){
    confirm({
      title: '是否要删除?',
      content: text.filmName,
      onOk:function() {
        console.log('OK');
        ajax({
          type:"post",
          url:"/orderData/del",
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
  showUpdateModal(text){
    store.dispatch({
      type:"SHOW_UPDATE_MODAL",
      updateVisible:true
    })
    store.dispatch({
      type:"SHOW_ORDERMANAGE",
      orderManage:text
    })
  }
  render(){
    const columns = [{
      title: '用户电话',
      dataIndex: 'userPhone',
      key: 'userPhone',
    }, {
      title: '电影名',
      dataIndex: 'filmName',
      key: 'filmName',
    }, {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: '电影院',
      dataIndex: 'chineName',
      key: 'chineName',
    },{
      title: '院线',
      dataIndex: 'hallName',
      key: 'hallName',
    },{
      title: '放映时间',
      dataIndex: 'showTime',
      key: 'showTime',
    },{
      title: '票价',
      dataIndex: 'ticketPrice',
      key: 'ticketPrice',
    },{
      title: '票数',
      dataIndex: 'tickets',
      key: 'tickets',
    },{
      title: '座位',
      dataIndex: 'seat',
      key: 'seat',
    },{
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type="primary" onClick={()=>{this.showUpdateModal(text)}}>修改</Button>
          <Button type="danger" onClick={()=>{this.delete(text)}}>删除</Button>
        </span>
        ),
      }];
      const data = this.props.orderManageReducer.data;
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
      <Table bordered columns={columns} pagination={pagination} dataSource={this.props.orderManageReducer.data.rows} />
      </div>
    }
  }
  const mapStateToProps = function(store){
    return {
      orderManageReducer:store.orderManageReducer,
      operateReducer:store.operateReducer
    }
  }
  export default connect(mapStateToProps)(TableOrder);
