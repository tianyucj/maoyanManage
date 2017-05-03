import React from "react";
import { Select,AutoComplete,Input,Button ,} from 'antd';
import {ajax} from "../../tool/tools";
const InputGroup = Input.Group;
const Option = Select.Option;


export default class SearchOnlineFilm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchCondition:"chName",
      searchContent:""
    }
  }
  handleChange(value){
    // 获取用户选择的筛选条件
    this.setState({
      searchCondition:value
    })
  }
  handleSearchChange(value){
    this.setState({
      searchContent:value
    })
  }
  serch(){
    console.log("this.state.searchCondition",this.state.searchCondition);
    console.log("this.state.searchContent",this.state.searchContent);
    this.props.showFilm(1,5,this.state.searchCondition,this.state.searchContent);
  }
  render(){
    return (
      <InputGroup compact>
      <Select defaultValue="chName" onChange={this.handleChange.bind(this)}>
         <Option value="chName">中文名</Option>
         <Option value="enName">英文名</Option>
         <Option value="place">地区</Option>
       </Select>
       <AutoComplete
         style={{ width: 200 }}
         onChange={this.handleSearchChange.bind(this)}
         placeholder="请输入搜索内容"
       />
       <Button onClick={this.serch.bind(this)}>搜索</Button>
     </InputGroup>
      )
  }
}
