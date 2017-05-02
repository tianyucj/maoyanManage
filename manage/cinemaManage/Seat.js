import React from "react";
import 'antd/dist/antd.css';
import {Modal,Button,Input,Form} from 'antd';


export default class Seat extends React.Component{
	constructor(props){
    	super(props);
  	}

  	render(){

  		let seatValue = this.props.seats || "[]";
  		seatValue = JSON.parse(seatValue);
  		let trAry = [];
  		for(let i = 0;i < seatValue.length;i++){
            let tdAry = [];
            for(let j = 0;j < seatValue[i].length;j++){
                if(seatValue[i][j] == 1){
                    tdAry.push(<td><i className="seat_optional"></i></td>);
                }else{
                    tdAry.push(<td><i className="seat_null">&nbsp;</i></td>);
                }

            }
            trAry.push(<tr>{tdAry}</tr>);
        }
  		return (

  			<div>
  				<Modal title="座位" visible={this.props.visible}
              		onOk={this.props.handleOk} onCancel={this.props.handleOk}
              		okText="确定" cancelText="取消"
              		style={{textAlign:"center"}}
            	>
            		<table>
            			<tbody>{trAry}</tbody>
            		</table>
            	</Modal>
  			</div>


  			)
  	}
}

