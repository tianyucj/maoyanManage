import React from "react";
import store from "../../tool/store";
import {connect} from "react-redux";
import {Modal,Table,Button,Popconfirm} from "antd";
import {ajax} from "../../tool/tools";
import UpdateChip from "./UpdateChip";
import AddChipArrangement from "./AddChipArrangement";

class ViewChip extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      selectData:[],
      chipData:[],
      newDataArr:[],//用于在删除成功后再次将该数据传给cinema，修复在该模块进行添加操作时将删除数据又加入的bug,
      newKey:0
    }
  }
  componentWillMount(){
    this.setState({
      newKey:this.state.newKey++
    })
  }

  showChipArrangement(){
    store.dispatch({
      type:"SHOW_ADDCHIPARRANGEMENT_MODAL",
      addChipArrangementVisible:true
    })
    store.dispatch({
      type:"SHOW_ADD_CINEMAMATCH",
      addChip:this.props.cinemaMatchReducer.cinema
    })
  }
  delChip(text){
    // 删除排片
    let cinema = this.props.cinemaMatchReducer.cinema.chipArrangement;
    for(let i = 0 ; i < cinema.length; i++){
      if(cinema[i].theChainName == text.theChainName &&
        cinema[i].voidHall == text.voidHall && cinema[i].showTime == text.showTime){
          cinema.splice(i,1);
          break;
        }
    }
    ajax({
      type:"post",
      url:"/onlineFilmData/update",
      data:{_id:this.props.cinemaMatchReducer.cinema._id,chipArrangement:JSON.stringify(cinema)},
      success:function(data){
        console.log("删除后的cinema：",this.props.cinemaMatchReducer.cinema);
        store.dispatch({
          type:"SHOW_CINEMAMATCH",
          cinema:this.props.cinemaMatchReducer.cinema
        })
      }.bind(this)
    });
  }
  handleCreate(){
    store.dispatch({
      type:"SHOW_CHIPARRANGEMENT_MODAL",
      showChipArrangementVisible:false
    })
  }
  handleCancel(){
    store.dispatch({
      type:"SHOW_CHIPARRANGEMENT_MODAL",
      showChipArrangementVisible:false
    })
  }
  updateChipArrangement(text){
    // 打开修改排片的窗口
    console.log("ttttttt弹出修改框：",text);
    store.dispatch({
      type:"SHOW_UPDATECHIPARRANGEMENT_MODAL",
      updateChipArrangementVisible:true
    })
    store.dispatch({
      type:"DELETECONTENTS_ONLINE",
      selectData:text
    })
  }
  render(){
    const columns = [{
        title: '影院名',
        dataIndex: 'theChainName',
        key: 'theChainName',
      }, {
        title: '影厅名',
        dataIndex: 'voidHall',
        key: 'voidHall',
      }, {
        title: '放映时间',
        dataIndex: 'showTime',
        key: 'showTime',
      }, {
        title: '票价',
        dataIndex: 'ticketPrice',
        key: 'ticketPrice',
      },{
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <Popconfirm title="确认删除?" onConfirm={() => this.delChip(text)}>
               <Button type="primary" >删除</Button>
            </Popconfirm>
             <Button onClick={()=>this.updateChipArrangement(text)}>修改排片</Button>
          </span>
        ),
      }];
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        this.setState({
          selectData:selectedRows
        });
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
    return (
      <Modal width="1000px" visible={this.props.operateReducer.showChipArrangementVisible} title="影片排片情况" onCancel={this.handleCancel}
        onOk={this.handleCreate.bind(this)}>
          <Button onClick={()=>this.showChipArrangement()}>增加排片</Button>
          <Table rowSelection={rowSelection} columns={columns} dataSource={this.props.cinemaMatchReducer.cinema.chipArrangement} bordered/>
          <UpdateChip></UpdateChip>
          <AddChipArrangement showFilm={this.props.showFilm.bind(this)}></AddChipArrangement>
      </Modal>
    )
  }
}
const mapStateToProps = function(store){
  return {
    operateReducer:store.operateReducer,
    cinemaMatchReducer:store.cinemaMatchReducer
  }
}
export default connect(mapStateToProps)(ViewChip);
