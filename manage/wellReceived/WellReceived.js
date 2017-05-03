import React from "react";
import {Row,Col,Card,Button,notification,Modal} from "antd";
import {ajax} from "../../tool/tools";
import store from "../../tool/store";
import {connect} from "react-redux";
const confirm = Modal.confirm;

import AddHotFilm from "./AddHotFilm";
import TableHotFilm from "./TableHotFilm";

class WellReceived extends React.Component{
	constructor(props){
		super(props);
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
				store.dispatch({
					type:"SHOW_ALL_WELLRECEIVE",
					data:data
				});
			}.bind(this)
		});
	}
	deleteData(){
		console.log("11111111",this.props.wellReceiveReducer.deleteData.length)
		if(this.props.wellReceiveReducer.deleteData.length > 0){
			confirm({
				title: '删除提示',
				content: "请确认是否要删除当前选中数据？",
				onOk:function(){
					for(let i = 0;i < this.props.wellReceiveReducer.deleteData.length;i++){
						ajax({
							type:"post",
							url:"/hotFilmData/del",
							data:{_id:this.props.wellReceiveReducer.deleteData[i]._id},
							success:function(){
								notification['success']({
									message: '删除提醒',
									description: '删除已成功',
								});
								this.show();

							}.bind(this)
						})
					}
				}.bind(this)
			})
		}else{
			confirm({
				title: '提醒',
				content: "请先选择需要删除的数据！",
				onOk:function() {
					console.log("ok")
				}.bind(this),
				onCancel:function() {
					console.log("cancel")
				}.bind(this)
			})
		}
	}
	render(){
		return (<div>
			<Card title="热映电影管理">
			<Row>
			<Col span={2}>
			<AddHotFilm show={this.show.bind(this)}></AddHotFilm>
			</Col>
			<Col span={2}>
			<Button onClick={this.deleteData.bind(this)} type="danger">批量删除</Button>
			</Col>
			</Row>
			<TableHotFilm show={this.show.bind(this)}></TableHotFilm>
			</Card>
			</div>
			)
	}
}
const mapStateToProps = function(store){
	return {
		wellReceiveReducer:store.wellReceiveReducer
	}
}
export default connect(mapStateToProps)(WellReceived);
