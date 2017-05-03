import React from "react";
import {Button,Table,Modal,notification} from "antd";
import {ajax} from "../../tool/tools";
import store from "../../tool/store";
import {connect} from "react-redux";
const confirm = Modal.confirm;

class TableHotFilm extends React.Component{
  constructor(props){
    super(props);
  }
  delete(text){
    confirm({
      title: '是否要删除?',
      content: text.chName,
      onOk:function() {
        console.log('OK');
        ajax({
          type:"post",
          url:"/hotFilmData/del",
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
  render(){
    const columns = [{
      title: '电影名',
      dataIndex: 'chName',
      key: 'chName',
    }, {
      title: '英文名',
      dataIndex: 'enName',
      key: 'enName',
    }, {
      title: '类型',
      dataIndex: 'style',
      key: 'style',
    }, {
      title: '地区',
      dataIndex: 'place',
      key: 'place',
    },{
      title: '年代',
      dataIndex: 'century',
      key: 'century',
    },{
      title: '时长',
      dataIndex: 'duration',
      key: 'duration',
    },{
      title: '上映时间',
      dataIndex: 'reTime',
      key: 'reTime',
    },{
      title: '上映地点',
      dataIndex: 'rePlace',
      key: 'rePlace',
    },{
      title: '票房',
      dataIndex: 'boxOffice',
      key: 'boxOffice',
    },{
      title: '排行',
      dataIndex: 'rink',
      key: 'rink',
    },{
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
        <Button type="danger" onClick={()=>{this.delete(text)}}>删除</Button>
        </span>
        ),
    }];
    const data = this.props.wellReceiveReducer.data;
    const pagination = {
      current:data.curpage,
      pageSize:data.eachpage,
      total:data.total,
      showSizeChanger:true,
      pageSizeOptions:['5','10','15'],
      onChange:function(page,pageSize){
        this.props.show(page,pageSize);
      }.bind(this),
      onShowSizeChange:function(page,pageSize){
        this.props.show(page,pageSize);
      }.bind(this)
    }
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        store.dispatch({
          type:"DELETE_ALL_WELLRECEIVEDATA",
          deleteData:selectedRows
        })
      }
    }
    return <div >
    <Table rowSelection={rowSelection} bordered columns={columns} pagination={pagination} dataSource={this.props.wellReceiveReducer.data.rows} />
    </div>
  }
}
const mapStateToProps = function(store){
  return {
    wellReceiveReducer:store.wellReceiveReducer
  }
}
export default connect(mapStateToProps)(TableHotFilm);