import React from "react";
import {Modal,Form,Input,Table,Icon,Button,notification} from "antd";
import {ajax} from "../../tool/tools";
import store from "../../tool/store";
import {connect} from "react-redux";
const Search = Input.Search;

class AddOnlineFilm extends React.Component{
  constructor(props){
    super(props);
    this.state={
      filmData:[],
      filterDropdownVisible: false,
      filtered: false,
      selectData:[],
      newKey:0
    }
  }
  handleCancel(){
    store.dispatch({
      type:"SHOW_ADDONLINEFILM_MODAL",
      addOnlineFilmVisible:false
    })
  }
  handleCreate(){
    var selectData = this.state.selectData;
    // 循环遍历的将选中的数据加入到在线影片集合中，在此先判断是否存在以及加入过的数据，如果有则不再次增加
    for(let i = 0;i < selectData.length; i++){
      delete selectData[i]._id;
      ajax({
        type:"post",
        url:"/onlineFilmData/find",
        data:{chName:selectData[i].chName,findType:"exact"},
        success:function(data){
          if(data.length == 0){
            ajax({
              type:"post",
              url:"/onlineFilmData/add",
              data:selectData[i],
              success:function(data){
                this.props.showFilm(1);
                this.handleCancel();
              }.bind(this)
            })
          }else{
            notification.open({
              message: '增加提示',
              description: selectData[i].chName+"添加失败，请不要重复添加数据！",
            });
          }
        }.bind(this)
      });
    }
  }
  showFilmData(page,pageSize,content){
    let newObj = {
      page:page,
      rows:pageSize
    }
    let type = "chName";
    if(content){
      newObj[type] = content;
    }
    ajax({
      type:"post",
      url:"/filmData/find",
      data:newObj,
      success:function(data){
        console.log("二级查询出来的数据",data);
        this.setState({
          filmData:data
        });
      }.bind(this)
    });
  }

  searchFilmData(value){
    this.setState({
      searchContent:value
    })
    this.showFilmData(1,5,value);
  }
  componentWillMount(){
    this.showFilmData();
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
      }];
      const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          this.setState({
            selectData:selectedRows
          });
        },
        onSelect: (record, selected, selectedRows) => {
          console.log("39471283491734",record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
          console.log("90890890",selected, selectedRows, changeRows);
        },
        getCheckboxProps: record => ({
          disabled: record.name === 'Disabled User',    // Column configuration not to be checked
        }),
      };
      let data = this.state.filmData;
      const pagination = {
        current:data.curpage,
        pageSize:data.eachpage,
        total:data.total,
        showSizeChanger:true,
        pageSizeOptions:['5','10','20'],
        onChange:function(page,pageSize){
          this.showFilmData(page,pageSize,this.state.searchContent);
        }.bind(this),
        onShowSizeChange:function(page,pageSize){
          this.showFilmData(page,pageSize);
        }.bind(this)
      }

    return (
      <Modal key={this.state.newKey} width="1000px" visible={this.props.operateReducer.addOnlineFilmVisible} title="增加上映影片" okText="确认添加" onCancel={this.handleCancel}
        onOk={this.handleCreate.bind(this)}>
          <Search placeholder="请出入要查询的数据" style={{ width: 200 }} onSearch={value => this.searchFilmData(value)}/>
          <Table rowKey="id2" rowSelection={rowSelection} columns={columns} pagination={pagination} dataSource={this.state.filmData.rows} bordered/>
      </Modal>
    )
  }
}
const mapStateToProps = function(store){
  return {
    operateReducer:store.operateReducer
  }
}
export default connect(mapStateToProps)(AddOnlineFilm);
