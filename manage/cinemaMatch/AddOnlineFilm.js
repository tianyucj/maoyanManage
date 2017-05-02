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
      searchText: '',
      filtered: false,
      selectData:[]
    }
  }
  onInputChange(e){
    this.setState({ searchText: e.target.value });
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
                this.props.showFilm();
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
  showFilmData(){
    ajax({
      type:"post",
      url:"/filmData/find",
      success:function(data){
        console.log(data);
        this.setState({
          filmData:data
        });
      }.bind(this)
    });
  }

  searchFilmData(value){
    console.log(value);
    ajax({
      type:"post",
      url:"/filmData/find",
      data:{chName:value},
      success:function(data){
        console.log(data);
        this.setState({
          filmData:data
        });
      }.bind(this)
    });
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
      <Modal width="1000px" visible={this.props.operateReducer.addOnlineFilmVisible} title="增加上映影片" okText="确认添加" onCancel={this.handleCancel}
        onOk={this.handleCreate.bind(this)}>
          <Search placeholder="请出入要查询的数据" style={{ width: 200 }} onSearch={value => this.searchFilmData(value)}/>
          <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.filmData} bordered/>
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
