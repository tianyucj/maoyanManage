import React from "react";
import {Row,Col,Card} from "antd";
import {ajax} from "../../tool/tools";
import store from "../../tool/store";
import {connect} from "react-redux";

import AddFilm from "./AddFilm";
import TableFilm from "./TableFilm";
import UpdateFilm from "./UpdateFilm";
import SearchFilm from "./SearchFilm";

class FilmManage extends React.Component{
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
           if(searchData.chName != undefined){
                obj={
                    page:page,
                    rows:pageSize,
                    chName:searchData.chName
                }
            }else if(searchData.enName != undefined){
                obj={
                    page:page,
                    rows:pageSize,
                    enName:searchData.enName
                }
            }else if(searchData.place != undefined){
                obj={
                    page:page,
                    rows:pageSize,
                    place:searchData.place
                }
            }
        }
        ajax({
            type:"get",
            url:"/filmData/find",
            data:obj,
            success:function(data){
                store.dispatch({
                    type:"SHOW_ALL_FILM",
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
			<AddFilm show={this.show.bind(this)}></AddFilm>
			</Col>
            <Col span={16}>
            <SearchFilm show={this.show.bind(this)}></SearchFilm>
            </Col>
			</Row>
            <TableFilm forPage={this.state.forPage} show={this.show.bind(this)}></TableFilm>
            <UpdateFilm show={this.show.bind(this)}></UpdateFilm>
			</Card>
			</div>
			)
	}
}
const mapStateToProps = function(store){
    return {
        filmReducer:store.filmReducer
    }
}
export default connect(mapStateToProps)(FilmManage);