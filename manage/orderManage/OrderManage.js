import React from "react";
import {Row,Col,Card} from "antd";
import {ajax} from "../../tool/tools";
import store from "../../tool/store";
import {connect} from "react-redux";

import MaoyanUser from "./MaoyanUser";
import TableOrder from "./TableOrder";
import SearchOrder from "./SearchOrder";
import UpdateOrder from "./UpdateOrder";

class OrderManage extends React.Component{
	constructor(props){
		super(props);
        this.state = {
            forPage:{}
        }
	}
    componentWillMount(){
        this.show();
    }
    show(page,pageSize,searchData){
        var obj={
            page:page,
            rows:pageSize
        };
        if(searchData != undefined){
            this.state.forPage = searchData;
           if(searchData.filmName != undefined){
                obj={
                    page:page,
                    rows:pageSize,
                    filmName:searchData.filmName
                }
            }else if(searchData.address != undefined){
                obj={
                    page:page,
                    rows:pageSize,
                    address:searchData.address
                }
            }else if(searchData.ticketPrice != undefined){
                obj={
                    page:page,
                    rows:pageSize,
                    ticketPrice:searchData.ticketPrice
                }
            }
        }
        ajax({
            type:"get",
            url:"/orderData/find",
            data:obj,
            success:function(data){
                store.dispatch({
                    type:"SHOW_ALL_ORDERMANAGE",
                    data:data
                });
            }.bind(this)
        });
    }
	render(){
		return (<div>
			<Card title="电影管理">
			<Row>
			<Col span={2}>
			<MaoyanUser></MaoyanUser>
			</Col>
            <Col span={16}>
            <SearchOrder show={this.show.bind(this)}></SearchOrder>
            </Col>
			</Row>
            <TableOrder forPage={this.state.forPage} show={this.show.bind(this)}></TableOrder>
						<UpdateOrder show={this.show.bind(this)}></UpdateOrder>
			</Card>
			</div>
			)
	}
}
const mapStateToProps = function(store){
    return {
        orderManageReducer:store.orderManageReducer
    }
}
export default connect(mapStateToProps)(OrderManage);
