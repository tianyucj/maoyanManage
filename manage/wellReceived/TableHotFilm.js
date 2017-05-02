import React from "react";
import {Button,Table,Modal} from "antd";
import {ajax} from "../../tool/tools";

export default class TableHotFilm extends React.Component{
  constructor(props){
    super(props);
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
    }];
    const data = this.props.data;
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
    return <div >
    <Table bordered columns={columns} pagination={pagination} dataSource={this.props.data.rows} />
    </div>
  }
}