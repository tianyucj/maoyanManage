import React from "react";
import {ajax} from "../../tool/tools";
import 'antd/dist/antd.css';
import { Table, Input, Icon, Button, Popconfirm,message,Modal } from 'antd';
import store from "../../tool/store";
import {connect} from "react-redux";
const confirm = Modal.confirm;
class TableElement extends React.Component{
    constructor(props){
      super(props);
    }
    showUpdataModel(text){
        store.dispatch({
              type:"SHOW_UPDATE_MODAL",
              updateVisible:true
          });
        store.dispatch({
              type:"SHOW_CINEMA",
              cinema:text
          });
    }
    del(id){

    confirm({
        title: '确认删除？',
        content: '是否删除此数据？',
        onOk:function(){
          ajax({
              type:"post",
              url:"/theChainData/del",
              data:{
                _id:id,
              },
              success:function(){
                message.info('删除成功');
                this.props.show();
          }.bind(this)
      });
      }.bind(this)
      
      }); 
  }
  render(){   
    const columns = [{
      title: '院线名',
      dataIndex: 'chainName',
      key: 'chainName',
    }, {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: '规模大小',
      dataIndex: 'size',
      key: 'size',
    },{
      title: '联系电话',
      dataIndex: 'place',
      key: 'place',
    },{
      title: '操作',
      key:"action",
      render:(text,record) => (
         <span>
          <Button type="primary" onClick={()=>this.showUpdataModel(text)}>修改</Button>
            <Button style={{marginLeft:"20px" }} type="danger" onClick={()=>this.del(text._id)}>
                删除
            </Button>
        </span>
      )
    }];
    const data = this.props.cinemaReducer.data;
    var pagination = {
      current:data.curpage,
      total:data.total,
      pageSize:data.eachpage,
      pageSizeOptions:["3","5","10","20"],
      showSizeChanger:true,
      onChange:function(page, curpage){
        if(this.props.forPage != undefined){
            this.props.show(page, curpage,this.props.forPage);
        }else{
            this.props.show(page, curpage);
        }
      }.bind(this),
      onShowSizeChange:function(page, curpage){
        if(this.props.forPage != undefined){
            this.props.show(page, curpage,this.props.forPage);
        }else{
            this.props.show(page, curpage);
        }
      }.bind(this),
    };
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        store.dispatch({
            type:"SHOW_BATCHDEL_CINEMA",
            batchDel:selectedRows
        });
      },
    };
    return (
        <div>
            <Table  rowSelection={rowSelection} 
                    pagination={pagination} 
                    dataSource={this.props.cinemaReducer.data.rows} 
                    columns={columns} bordered />
        </div>
      )
    }
}

const mapStateToProps = function(store){
    return {
        cinemaReducer:store.cinemaReducer,
        operateReducer:store.operateReducer,  
    }
}
export default connect(mapStateToProps)(TableElement);
