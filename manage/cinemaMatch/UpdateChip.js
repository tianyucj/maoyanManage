import React from "react";
import {Modal,Form,Input,Table,Icon,Button,notification,Select} from "antd";
const Option = Select.Option;
import store from "../../tool/store";
import {connect} from "react-redux";
import {ajax} from "../../tool/tools";
const FormItem = Form.Item;


class UpdateChip extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      cinemaData:[],
      voidHall:[],
      newKey:0
    }
  }
  handleCreate(){
    this.props.form.validateFields((err, values) => {
      if(!err){
        let chipList = [];
        let cinema = this.props.cinemaMatchReducer.cinema;
        let chipArr = this.props.cinemaMatchReducer.cinema.chipArrangement;
        let select = this.props.cinemaMatchReducer.selectData;
        // 修改之前先将选中修改的数据从原数据中删除，然后再传ajax来进行最终修改
        for(let i = 0 ; i < chipArr.length ; i++){
            if(select.showTime == chipArr[i].showTime && select.voidHall == chipArr[i].voidHall && select.theChainName == chipArr[i].theChainName){
              chipArr.splice(i,1);
            }
            if(chipArr[i].showTime == values.showTime && chipArr[i].voidHall == values.voidHall && chipArr[i].theChainName == values.theChainName){
              Modal.confirm({
                title:'提示',
                content:"放映时间重复",
                okText:"确认"
              });
              return false;
            }
          }
          chipArr.push(values);
          ajax({
            type:"post",
            url:"/onlineFilmData/update",
            data:{_id:cinema._id,chipArrangement:JSON.stringify(chipArr)},
            success:function(data){
              notification.open({
                message: '修改提示',
                description: "修改成功！",
              });

              console.log("修改在线影片信息的返回信息：",data);
            }
          });
        }
    });
  }
  handleCancel(){
    store.dispatch({
      type:"SHOW_UPDATECHIPARRANGEMENT_MODAL",
      updateChipArrangementVisible:false
    })
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
    this.setState({
      newKey:this.state.newKey++
    })
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
      <Modal key={this.state.newKey} visible={this.props.operateReducer.updateChipArrangementVisible} title="修改影片排片" okText="确认修改" onCancel={this.handleCancel}
        onOk={this.handleCreate.bind(this)}>
        <Form>
        <FormItem {...formItemLayout} label="影院" labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }} hasFeedback>
          {getFieldDecorator('theChainName', {
            rules: [{ required: true }],
          })(
            <Select defaultValue={this.state.cinemaData[0]} onChange={this.voidHallList.bind(this)} style={{ width: 90 }}>
              {cinemaOptions}
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="影厅" labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }} hasFeedback>
          {getFieldDecorator('voidHall', {
            rules: [{ required: true }],
          })(
            <Select style={{ width: 90 }}>
              {voidHallOptions}
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="放映时间：" labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }} hasFeedback>
          {getFieldDecorator('showTime', {
            rules: [{ required: true }],
          })(
            <Input placeholder="请输入放映时间" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="票价" labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }} hasFeedback>
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
export default connect(mapStateToProps)(Form.create({
  mapPropsToFields(props){
    return {
      theChainName:{value:props.cinemaMatchReducer.selectData.theChainName},
      voidHall:{value:props.cinemaMatchReducer.selectData.voidHall},
      showTime:{value:props.cinemaMatchReducer.selectData.showTime},
      ticketPrice:{value:props.cinemaMatchReducer.selectData.ticketPrice}
    }
  }
})(UpdateChip));
