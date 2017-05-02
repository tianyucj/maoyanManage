import React from "react";
import { Card , Button , Modal} from 'antd';
import {ajax} from "../../tool/tools";
import CinemaTable from "../cinemaMatch/CinemaTable";
import store from "../../tool/store";
import {connect} from "react-redux";
import AddOnlineFilm from "./AddOnlineFilm";
import AddChipArrangement from "./AddChipArrangement";
import ViewChip from "./ViewChip";

class CinemaMatch extends React.Component{
  constructor(props){
    super(props);
  }
  showFilm(){
    ajax({
       type:"post",
       url:"/onlineFilmData/find",
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
  showChipArrangementModal(){
    store.dispatch({
      type:"SHOW_CHIPARRANGEMENT_MODAL",
      showChipArrangementVisible:true
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
    return (<Card title="院线匹配" extra={<span><Button onClick={()=>this.showAddOnlineFilmModal()} type="primary" >增加上映影片</Button>
      <Button onClick={()=>this.showChipArrangementModal()}>查看排片情况</Button>
      <Button onClick={()=>this.deleteContents()} type="primary" >批量删除</Button></span>} >
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
