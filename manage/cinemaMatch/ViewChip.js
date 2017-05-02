import React from "react";
import store from "../../tool/store";
import {connect} from "react-redux";
import {Modal,Table,Button,Popconfirm} from "antd";
import {ajax} from "../../tool/tools";
import UpdateChip from "./UpdateChip";

class ViewChip extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      selectData:[],
      chipData:[],
      newDataArr:[]//用于在删除成功后再次将该数据传给cinema，修复在该模块进行添加操作时将删除数据又加入的bug
    }
  }
  componentWillReceiveProps(){
    this.getChipData();
  }
  getChipData(){
    let cinema = this.props.cinemaMatchReducer.cinema[0];
    console.log("选中数据的id",cinema);
    if(cinema){
      ajax({
        type:"post",
        url:"/onlineFilmData/find",
        data:{_id:cinema._id,findType:"exact"},
        success:function(data){
          console.log("查询出来的数据：",data);
          this.setState({
            newDataArr:data
          })
          if(data.chipArrangement){
            let chipArr = [];
            for(let i = 0; i < data.chipArrangement.length; i++){
              let chip = {
                chName:data.chName,
                enName:data.enName,
                theChainName:data.chipArrangement[i].theChainName,
                voidHall:data.chipArrangement[i].voidHall,
                showTime:data.chipArrangement[i].showTime,
                ticketPrice:data.chipArrangement[i].ticketPrice,
                chipArrangement : data.chipArrangement,
                _id : cinema._id
              }
              chipArr.push(chip);
            }
            this.setState({
              chipData:chipArr
            })
          }
          console.log("排片信息：",this.state.chipData);
        }.bind(this)
      });
    }
  }
  showChipArrangement(){
    store.dispatch({
      type:"SHOW_ADDCHIPARRANGEMENT_MODAL",
      addChipArrangementVisible:true
    })
  }
  delChip(text){
    // 删除排片
    let chipMsg = this.state.chipData;
    let delId;
    let chipArrangementArr = [];
    for(let i = 0 ; i < chipMsg.length; i++){
      if(chipMsg[i].chName == text.chName && chipMsg[i].theChainName == text.theChainName &&
        chipMsg[i].voidHall == text.voidHall && chipMsg[i].showTime == text.showTime){
          delId = chipMsg[i]._id;
          chipMsg.splice(i,1);
        }else{
          delete chipMsg[i].chName;
          delete chipMsg[i].chipArrangement;
          delete chipMsg[i].enName;
          delete chipMsg[i]._id;
        }
    }
    ajax({
      type:"post",
      url:"/onlineFilmData/update",
      data:{_id:delId,chipArrangement:JSON.stringify(chipMsg)},
      success:function(){
        this.getChipData();
        let dataArr = [];
        dataArr.push(this.state.newDataArr);
        store.dispatch({
          type:"SHOW_CINEMAMATCH",
          cinema:dataArr
        })
        console.log("删除后的cinema：",this.props.cinemaMatchReducer.cinema);
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
    // 在点击修改按钮时就先将该条数据内的排片信息删除，方便在修改后重新将新的数据直接加入到排片信息中，而不用做其它复杂的操作
    let nowChipArrangement = text.chipArrangement;
    for(let i = 0 ; i < nowChipArrangement.length; i++){
      if(nowChipArrangement[i].theChainName == text.theChainName && nowChipArrangement[i].voidHall == text.voidHall && nowChipArrangement[i].showTime == text.showTime ){
        nowChipArrangement.splice(i,1);
        return false
      }
    }
    store.dispatch({
      type:"DELETECONTENTS_ONLINE",
      selectData:text
    })
  }
  render(){
    const columns = [{
        title: '中文名',
        dataIndex: 'chName',
        key: 'chName'
      }, {
        title: '英文名',
        dataIndex: 'enName',
        key: 'enName',
      }, {
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
          <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.chipData} bordered/>
          <UpdateChip></UpdateChip>
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
