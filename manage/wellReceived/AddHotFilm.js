import React from "react";
import {Button,Modal,Table,Icon,notification} from "antd";
import {ajax} from "../../tool/tools";


export default class AddHotFilm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      visible: false,
      data:{},
      selectedRows:[]
    }
  }
  componentWillMount(){
    this.showFilm()
  }
  showFilm(page,pageSize){
    ajax({
      type:"get",
      url:"/filmData/find",
      data:{
        page:page,
        rows:pageSize
      },
      success:function(data){
        this.setState({
          data:data
        })
      }.bind(this)
    })
  }
  showModal(){
    this.setState({
      visible: true,
    });
  }
  handleOk(e){
    if(this.state.selectedRows.length > 0){
      ajax({
        type:"post",
        url:"/hotFilmData/del",
        success:function(){
         ajax({
          type:"post",
          url:"/hotFilmData/add",
          data:{
            submitType:"addMore",
            data:JSON.stringify(this.state.selectedRows)
          },
          success:function(){
            notification['success']({
              message: '添加提醒',
              description: '添加已成功',
            });
            this.props.show();
          }.bind(this)
        });
         this.setState({
          visible: false,
        });
       }.bind(this)
     })
    }
  }
  handleCancel(e){
    console.log(e);
    this.setState({
      visible: false,
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
    }];
    const pagination = {
      current:this.state.data.curpage,
      pageSize:this.state.data.eachpage,
      total:this.state.data.total,
      showSizeChanger:true,
      pageSizeOptions:['5','10','15'],
      onChange:function(page,pageSize){
        this.showFilm(page,pageSize);
      }.bind(this),
      onShowSizeChange:function(page,pageSize){
        this.showFilm(page,pageSize);
      }.bind(this)
    }
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.state.selectedRows = selectedRows;
      }
    }
    return <div style={{marginBottom:"20px"}}>
    <Button type="primary" onClick={this.showModal.bind(this)}>增加</Button>
    <Modal title="增加热映电影" width="1000px" visible={this.state.visible}
    onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
    >
    <Table rowSelection={rowSelection} pagination={pagination} columns={columns} dataSource={this.state.data.rows} bordered/>
    </Modal>
    </div>
  }
}
