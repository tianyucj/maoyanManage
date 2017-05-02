import React from "react";
import { Select,AutoComplete,Input,Button } from 'antd';
import {ajax} from "../../tool/tools";
const InputGroup = Input.Group;
const Option = Select.Option;

export default class SearchOrder extends React.Component{
  constructor(props){
    super(props);
    this.state = {
     key:"filmName",
     searchValue:""
   }
 }
 handleChange(value){
  this.setState({
    key:value
  })
}
handleSearchChange(value){
  this.setState({
    searchValue:value
  })
}
serch(){
  if(this.state.searchValue != ""){
    var obj = {};
    obj = {[this.state.key]:this.state.searchValue};
    this.props.show(1,5,obj)
  }else{
   this.props.show()
 }
 
}
render(){
  return <div style={{marginBottom:"20px"}}>
  <InputGroup compact>
  <Select defaultValue="电影名" onChange={this.handleChange.bind(this)}>
  <Option value="filmName">电影名</Option>
  <Option value="address">地址</Option>
  <Option value="ticketPrice">票价</Option>
  </Select>
  <AutoComplete
  style={{ width: 200 }}
  onChange={this.handleSearchChange.bind(this)}
  placeholder="请输入搜索内容"
  />
  <Button onClick={this.serch.bind(this)}>搜索</Button>
  </InputGroup>
  
  </div>
}
};