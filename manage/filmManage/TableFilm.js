import React from "react";
import {Button,Table,Modal,notification} from "antd";
import {ajax} from "../../tool/tools";
import store from "../../tool/store";
import {connect} from "react-redux";
const confirm = Modal.confirm;

class TableFilm extends React.Component{
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
          url:"/filmData/del",
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
      url:"/filmData/find",
      data:{
        _id:id
      },
      success:function(data){
        store.dispatch({
          type:"SHOW_UPDATE_MODAL",
          updateVisible:true
        });
        store.dispatch({
          type:"SHOW_FILM",
          film:data
        });
      }.bind(this)
    })
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
        <Button type="primary" onClick={()=>{this.update(text._id)}}>修改</Button>
        <Button type="danger" onClick={()=>{this.delete(text)}}>删除</Button>

        </span>
        ),
      }];
      const data = this.props.filmReducer.data;
      const pagination = {
        current:data.curpage,
        pageSize:data.eachpage,
        total:data.total,
        showSizeChanger:true,
        pageSizeOptions:['5','10','15'],
        onChange:function(page,pageSize){
          if(this.props.forPage != undefined){
            this.props.show(page,pageSize,this.props.forPage);
          }else{
            this.props.show(page,pageSize);
          }
        }.bind(this),
        onShowSizeChange:function(page,pageSize){
          if(this.props.forPage != undefined){
            this.props.show(page,pageSize,this.props.forPage);
          }else{
            this.props.show(page,pageSize);
          }
        }.bind(this)
      };
      const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          store.dispatch({
            type:"DELETE_ALL_FILMDATA",
            deleteData:selectedRows
          })
        }
      }
      return <div >
      <Table bordered rowSelection={rowSelection} columns={columns} pagination={pagination} dataSource={this.props.filmReducer.data.rows} />

      </div>
    }
  }
  const mapStateToProps = function(store){
    return {
      wigetReducer:store.wigetReducer,
      filmReducer:store.filmReducer
    }
  }
  export default connect(mapStateToProps)(TableFilm);
