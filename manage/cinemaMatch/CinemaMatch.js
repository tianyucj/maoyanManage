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
    this.state = {
      keys:0
    }
  }
  showFilm(page,pageSize,type,content){
    let newObj = {
      page:page,
      rows:pageSize,
    };
    if(type){
      newObj[type] = content;
    }
    this.setState({
      searchCondition:type,
      searchContent:content
    })
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
    if(this.props.cinemaMatchReducer.selectData.length > 0){
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
                store.dispatch({
                  type:"DELETECONTENTS_ONLINE",
                  selectData:[]
                });
                store.dispatch({
                  type:"SELECTROWKEYS_ONLINE",
                  selectRowKeys:[]
                })
              }.bind(this)
            });
          }
        }.bind(this)
      });
    }else{
      Modal.confirm({
        title:'提示',
        content:"请先选择需要删除的数据！",
        okText:"确认"
      })
    }

  }
  componentWillMount(){
    this.showFilm(1);
  }
  render(){
    return (<Card title="院线匹配">
      <Row style={{marginBottom:20}}>
        <Col span={3}><Button onClick={()=>this.showAddOnlineFilmModal()} type="primary" >增加上映影片</Button></Col>
        <Col span={2}><Button onClick={()=>this.deleteContents()} type="danger" >批量删除</Button></Col>
        <Col span={8}><SearchOnlineFilm showFilm={this.showFilm.bind(this)}></SearchOnlineFilm></Col>
      </Row>
      <ViewChip showFilm={this.showFilm.bind(this)}></ViewChip>
      <AddChipArrangement showFilm={this.showFilm.bind(this)}></AddChipArrangement>
      <AddOnlineFilm showFilm={this.showFilm.bind(this)}></AddOnlineFilm>
      <CinemaTable keys={this.state.keys} searchCondition={this.state.searchCondition} searchContent={this.state.searchContent} showFilm={this.showFilm.bind(this)}></CinemaTable>
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
