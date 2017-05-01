import React from "react";
import { Select,AutoComplete,Input,Button } from 'antd';
import {ajax} from "../../tool/tools";
const InputGroup = Input.Group;
const Option = Select.Option;

export default class SearchFilm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        	key:"chName",
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
         <Select defaultValue="中文名" onChange={this.handleChange.bind(this)}>
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
		
		</div>
	}
};