import React from "react";
import { Select ,Input ,Button} from 'antd';
const Option = Select.Option;
const InputGroup = Input.Group;

export default class SearchData extends React.Component{
	constructor(props){
    	super(props);
  	}

  	render(){
  		return(
  		<InputGroup compact>
	        <Select defaultValue="chainName">
	            <Option value="chainName">院线名</Option>
	            <Option value="address">地址</Option>
	            <Option value="size">规模</Option>
	            <Option value="place">电话</Option>
	        </Select>
	        <Input style={{ width: '50%' }} placeholder="请输入搜索内容" />
	        <Button>搜索</Button>
        </InputGroup>

  		)
  	}

}