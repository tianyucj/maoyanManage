import React from "react";
import { Table, Icon , Pagination , Modal , Message ,Button , Popconfirm} from 'antd';
import store from "../../tool/store";
import {connect} from "react-redux";
import {ajax} from "../../tool/tools";

class CinemaTable extends React.Component{
  constructor(props){
    super(props);
  }
  delFilm(id){
    ajax({
      type:"post",
      url:"/onlineFilmData/del",
      data:{_id:id},
      success:function(){
        this.props.showFilm(1);
      }.bind(this)
    });
  }
  showAddChipArrangement(text){
    store.dispatch({
      type:"SHOW_ADDCHIPARRANGEMENT_MODAL",
      addChipArrangementVisible:true
    });
    store.dispatch({
      type:"SHOW_ADD_CINEMAMATCH",
      addChip:text
    })
  }
  showChipArrangementModal(text){
    store.dispatch({
      type:"SHOW_CHIPARRANGEMENT_MODAL",
      showChipArrangementVisible:true
    })
    store.dispatch({
      type:"SHOW_CINEMAMATCH",
      cinema:text
    })
  }
  render(){
    const columns = [{
      title: '中文名',
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
    },{
      title: '地区',
      dataIndex: 'place',
      key: 'place',
    }, {
      title: '年代',
      dataIndex: 'century',
      key: 'century',
    }, {
      title: '时长',
      dataIndex: 'duration',
      key: 'duration',
    },{
      title: '上映时间',
      dataIndex: 'reTime',
      key: 'reTime',
    },{
      title: '票房',
      dataIndex: 'boxOffice',
      key: 'boxOffice',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
           <Button type="primary" onClick={()=>this.showAddChipArrangement(text)}>增加排片</Button>
           <Button onClick={()=>this.showChipArrangementModal(text)}>查看排片</Button>
           <Popconfirm title="若删除当前影片，该影片所有排片也将会被删除且无法恢复，请确认是否继续删除数据？" onConfirm={() => this.delFilm(text._id)}>
              <Button type="danger">删除</Button>
           </Popconfirm>
        </span>
      ),
    }];
    const rowSelection = {
      selectedRowKeys:this.props.operateReducer.selectRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        // 批量删除时获取的数据
        store.dispatch({
          type:"DELETECONTENTS_ONLINE",
          selectData:selectedRows
        });
        store.dispatch({
          type:"SELECTROWKEYS_ONLINE",
          selectRowKeys:selectedRowKeys
        })
      }
    };
    let data = this.props.cinemaMatchReducer.data;
    const pagination = {
      current:data.curpage,
      pageSize:data.eachpage,
      total:data.total,
      showSizeChanger:true,
      pageSizeOptions:['5','10','20'],
      onChange:function(page,pageSize){
        this.props.showFilm(page,pageSize,this.props.searchCondition,this.props.searchContent);
      }.bind(this),
      onShowSizeChange:function(page,pageSize){
        this.props.showFilm(page,pageSize);
      }.bind(this)
    }
    return <div>
				<Table rowKey="id1" rowSelection={rowSelection} columns={columns} pagination={pagination} dataSource={this.props.cinemaMatchReducer.data.rows} bordered/>
			</div>
  }
}

const mapStateToProps = function(store){
  return {
    cinemaMatchReducer:store.cinemaMatchReducer,
    operateReducer:store.operateReducer
  }
}
export default connect(mapStateToProps)(CinemaTable);
