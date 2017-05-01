import React from "react";
import 'antd/dist/antd.css';
import {Button} from 'antd';

export default class AddButton extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <span>
         <Button type="primary">增加</Button>
      </span>
    )
  }
}
