import React from "react";
import { Card , Button , Modal , Row , Col} from 'antd';
import {ajax} from "../../tool/tools";
import CinemaTable from "../cinemaMatch/CinemaTable";
import store from "../../tool/store";
import {connect} from "react-redux";
import AddOnlineFilm from "./AddOnlineFilm";
import AddChipArrangement from "./AddChipArrangement";
import ViewChip from "./ViewChip";
import SearchOnlineFilm from "./SearchOnlineFilm";

class CinemaMatch extends React.Component{
  constructor(props){
    super(props);
  }
  showFilm(obj){
    let newObj = {};
    if(obj){
      newObj = obj;
    }
    ajax({
       type:"post",
       url:"/onlineFilmData/find",
       data:newObj,
       success:function(data){
         store.dispatch({
           type:"SHOW_ALL_CINEMAMATCH",
           data:data
         });
       }
    });
  }
  showAddOnlineFilmModal(){
    store.dispatch({
      type:"SHOW_ADDONLINEFILM_MODAL",
      addOnlineFilmVisible:true
    })
  }
  deleteContents(){
    // 批量删除
    Modal.confirm({
      title:'删除提示',
      content:"若删除当前影片，该影片所有排片也将会被删除且无法恢复，请确认是否继续删除数据？",
      okText:"删除",
      cancelText:"取消",
      onOk:function(){
        let selectData = this.props.cinemaMatchReducer.selectData;
        for(let i = 0; i < selectData.length ; i++){
          ajax({
            type:"post",
            url:"/onlineFilmData/del",
            data:{_id:selectData[i]._id},
            success:function(){
              this.showFilm();
            }.bind(this)
          });
        }
      }.bind(this)
    });
  }
  componentWillMount(){
    this.showFilm();
  }
  render(){
    return (<Card title="院线匹配">
      <Row style={{marginTop:20,marginBottom:20}}>
        <Col span={3}><Button onClick={()=>this.showAddOnlineFilmModal()} type="primary" >增加上映影片</Button></Col>
        <Col span={3}><Button onClick={()=>this.deleteContents()} type="danger" >批量删除</Button></Col>
        <Col span={8}><SearchOnlineFilm showFilm={this.showFilm.bind(this)}></SearchOnlineFilm></Col>
      </Row>
      <ViewChip></ViewChip>
      <AddChipArrangement></AddChipArrangement>
      <AddOnlineFilm showFilm={this.showFilm}></AddOnlineFilm>
      <CinemaTable showFilm={this.showFilm}></CinemaTable>
    </Card>

    )
  }
}
const mapStateToProps = function(store){
  return {
    cinemaMatchReducer:store.cinemaMatchReducer
  }
}
export default connect(mapStateToProps)(CinemaMatch);
