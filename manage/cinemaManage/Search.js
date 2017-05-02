import React from "react";
import { Select,AutoComplete,Input,Button } from 'antd';
import {ajax} from "../../tool/tools";
const InputGroup = Input.Group;
const Option = Select.Option;

export default class Searchciname extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        	key:"chainName",
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
      var obj={};
			this.props.show(1,5,obj)
		}
		
	}
	render(){
		return (
         <InputGroup compact>
         <Select defaultValue="院线名" onChange={this.handleChange.bind(this)}>
	      	<Option value="chainName">院线名</Option>
	      	<Option value="address">地址</Option>
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
};