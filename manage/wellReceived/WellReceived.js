import React from "react";
import {Row,Col,Card} from "antd";
import {ajax} from "../../tool/tools";

import AddHotFilm from "./AddHotFilm";
import TableHotFilm from "./TableHotFilm";

export default class WellReceived extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			data:{}
		}
	}
	componentWillMount(){
		this.show();
	}
	show(page,pageSize){
		ajax({
			type:"get",
			url:"/hotFilmData/find",
			data:{
				page:page,
			    rows:pageSize
			},
			success:function(data){
				this.setState({
					data:data
				})
			}.bind(this)
		});
	}
	render(){
		return (<div>
			<Card title="热映管理">
			<Row>
			<Col span={2}>
			<AddHotFilm show={this.show.bind(this)}></AddHotFilm>
			</Col>
			</Row>
			<TableHotFilm data={this.state.data}></TableHotFilm>
			</Card>
			</div>
			)
		}
	}