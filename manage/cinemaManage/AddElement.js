import React from "react";
import 'antd/dist/antd.css';
import {Button} from 'antd';

export default class CinemaManage extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <span>
         <Button>增加</Button>
      </span>
    )
  }
}
