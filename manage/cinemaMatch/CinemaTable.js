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
        this.props.showFilm();
      }.bind(this)
    });
  }
  showChipArrangement(text){
    store.dispatch({
      type:"SHOW_ADDCHIPARRANGEMENT_MODAL",
      addChipArrangementVisible:true
    });
    let textArr = [];
    textArr.push(text);
    store.dispatch({
      type:"SHOW_CINEMAMATCH",
      cinema:textArr
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
            <Popconfirm title="若删除当前影片，该影片所有排片也将会被删除且无法恢复，请确认是否继续删除数据？" onConfirm={() => this.delFilm(text._id)}>
               <Button type="primary">删除</Button>
            </Popconfirm>
           <Button onClick={()=>this.showChipArrangement(text)}>增加排片</Button>
        </span>
      ),
    }];
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        store.dispatch({
          type:"DELETECONTENTS_ONLINE",
          selectData:selectedRows
        });
        store.dispatch({
          type:"SHOW_CINEMAMATCH",
          cinema:selectedRows
        })
        console.log("table cinema" ,this.props.cinemaMatchReducer.cinema);
        console.log("table selectData" ,this.props.cinemaMatchReducer.selectData);
      },
      onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',    // Column configuration not to be checked
      }),
    };

    return <div>
				<Table scroll={{ y: 300 }} rowSelection={rowSelection} columns={columns} dataSource={this.props.cinemaMatchReducer.data} bordered/>
			</div>
  }
}

const mapStateToProps = function(store){
  return {
    cinemaMatchReducer:store.cinemaMatchReducer
  }
}
export default connect(mapStateToProps)(CinemaTable);
