import React from "react";
import {Modal,Form,Input,Table,Icon,Button,notification,Select} from "antd";
const Option = Select.Option;
import store from "../../tool/store";
import {connect} from "react-redux";
import {ajax} from "../../tool/tools";
const FormItem = Form.Item;


class AddChipArrangement extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      cinemaData:[],
      voidHall:[],
      isTure:[false,false,false,false]
    }
  }
  handleCreate(){
    this.props.form.validateFields((err, values) => {
      if(!err){
        var values = this.props.form.getFieldsValue();
        let chipList = [];
        let cinema = this.props.cinemaMatchReducer.cinema[0];
        let chipArrangement = cinema.chipArrangement;
        if(chipArrangement){
          chipList = chipArrangement;
        }
        console.log("chipList",chipList);
        if(chipList.length > 0){
          for(let i = 0 ; i < chipList.length ; i++){
              if(chipList[i].showTime == values.showTime && chipList[i].voidHall == values.voidHall && chipList[i].theChainName == values.theChainName){
                Modal.confirm({
                  title:'提示',
                  content:"放映时间重复",
                  okText:"确认"
                });
                return false;
              }
            }
          chipList.push(values);

          ajax({
            type:"post",
            url:"/onlineFilmData/update",
            data:{_id:cinema._id,chipArrangement:JSON.stringify(chipList)},
            success:function(data){
              notification.open({
                message: '排片提示',
                description: "排片成功，您还可以继续添加排片信息，否则请点击取消按钮退出！",
              });
              console.log("循环内修改在线影片信息的返回信息：",data);
            }
          });
        }else{
            chipList.push(values);
            console.log(chipList);
            ajax({
              type:"post",
              url:"/onlineFilmData/update",
              data:{_id:cinema._id,chipArrangement:JSON.stringify(chipList)},
              success:function(data){
                notification.open({
                  message: '排片提示',
                  description: "排片成功，您还可以继续添加排片信息，否则请点击取消按钮退出！",
                });
                console.log("循环外修改在线影片信息的返回信息：",data);
              }
            });
        }
      }
    });
  }
  handleCancel(e){
    store.dispatch({
      type:"SHOW_ADDCHIPARRANGEMENT_MODAL",
      addChipArrangementVisible:false
    })
    console.log("eeeeeeeeeeeee",e);
  }
  cinemaList(){
    // 取出所有的影院名
    let chainName = [];
    ajax({
      type:"post",
      url:"/theChainData/find",
      success:function(data){
        data.map(function(chain){
          chainName.push(chain.chainName);
          this.setState({
            cinemaData:chainName
          })
        }.bind(this));
      }.bind(this)
    });
  }
  voidHallList(value, option){
    // 根据影院名的变化取出对应的影厅
    ajax({
      type:"post",
      url:"/theChainData/find",
      data:{chainName:value,findType:"exact"},
      success:function(data){
        let parseData = JSON.parse(data);
        let hallName = [];
        for(let i = 0; i < parseData.length; i++){
          if(parseData[i].voidHall){
            for(let j = 0 ; j < parseData[i].voidHall.length ; j++){
                hallName.push(parseData[i].voidHall[j].hallName);
            }
            this.setState({
              voidHall:hallName
            });
          }
        }
      }.bind(this)
    });
  }

  componentWillMount(){
    this.cinemaList();
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const cinemaOptions = this.state.cinemaData.map(cinema => <Option key={cinema} value={cinema}>{cinema}</Option>);
    const voidHallOptions = this.state.voidHall.map(voidHall => <Option key={voidHall} value={voidHall}>{voidHall}</Option>);
    const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 14 },
        },
      };
    return (
      <Modal visible={this.props.operateReducer.addChipArrangementVisible} title="增加影片排片" okText="确认添加" onCancel={this.handleCancel}
        onOk={this.handleCreate.bind(this)}>
        <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="影院" labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}>
          {getFieldDecorator('theChainName', {
            rules: [{ required: true }],
          })(
            <Select defaultValue={this.state.cinemaData[0]} onChange={this.voidHallList.bind(this)} style={{ width: 90 }}>
              {cinemaOptions}
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="影厅" labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}>
          {getFieldDecorator('voidHall', {
            rules: [{ required: true }],
          })(
            <Select style={{ width: 90 }}>
              {voidHallOptions}
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="放映时间：" labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}>
          {getFieldDecorator('showTime', {
            rules: [{ required: true }],
          })(
            <Input placeholder="请输入放映时间" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="票价" labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}>
          {getFieldDecorator('ticketPrice', {
            rules: [{ required: true }],
          })(<Input placeholder="请输入票价" />
          )}
        </FormItem>
      </Form>
      </Modal>
    )
  }
}
const mapStateToProps = function(store){
  return {
    operateReducer:store.operateReducer,
    cinemaMatchReducer:store.cinemaMatchReducer
  }
}
export default connect(mapStateToProps)(Form.create()(AddChipArrangement));
