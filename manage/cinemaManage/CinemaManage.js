import React from "react";
import AddElement from "./AddElement";
import 'antd/dist/antd.css';
import {Card,Row ,Col,message} from 'antd';

export default class CinemaManage extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
    	<Card>
    		<h1 style={{textAlign:"center"}}>院线管理</h1>
    		<AddElement></AddElement>

    	</Card>
    )
  }
}
