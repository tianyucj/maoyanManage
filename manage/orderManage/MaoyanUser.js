import React from "react";
import {Button,Modal,Table,Icon,notification} from "antd";
import {ajax} from "../../tool/tools";


export default class MaoyanUser extends React.Component{
  constructor(props){
    super(props);
    this.state = { 
      visible: false,
      data:{},
      selectedRows:[]
    }
  }
  componentWillMount(){
    this.showMaoyanUsers()
  }
  showMaoyanUsers(page,pageSize){
    ajax({
      type:"get",
      url:"/maoyanUsers/find",
      data:{
        page:page,
        rows:pageSize
      },
      success:function(data){
        this.setState({
          data:data
        })
        console.log("this",this.state.data.curpage)
      }.bind(this)
    })
  }
  showModal(){
    this.setState({
      visible: true,
    });
  }
  handleOk(e){

   this.setState({
    visible: false,
  })
 }
 handleCancel(e){
  console.log(e);
  this.setState({
    visible: false,
  });
}
render(){
 const columns = [{
  title: '用户电话',
  dataIndex: 'userPhone',
  key: 'userPhone',
}, {
  title: '密码',
  dataIndex: 'pwd',
  key: 'pwd',
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
return <div>
<Button type="primary" onClick={this.showModal.bind(this)} ghost>猫眼用户</Button>
<Modal title="猫眼用户" style={{width:"1200px"}} visible={this.state.visible}
onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
>
<Table  pagination={pagination} columns={columns} dataSource={this.state.data.rows} bordered/>
</Modal>
</div>
}
}