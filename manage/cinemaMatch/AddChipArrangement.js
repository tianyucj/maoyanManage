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
        let chipList = this.props.cinemaMatchReducer.addChip.chipArrangement || [];
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
            data:{_id:this.props.cinemaMatchReducer.addChip._id,chipArrangement:JSON.stringify(chipList)},
            success:function(data){
              notification.open({
                message: '排片提示',
                description: "排片成功，您还可以继续添加排片信息，否则请点击取消按钮退出！",
              });
              // 利用对表格的刷新，解决如果一个电影无排片信息，第一次增加完排片的时候马上查看排片信息不会显示出来的问题
              this.props.showFilm();
              // 重置form表单
              this.props.form.resetFields();
            }.bind(this)
          });
        }else{
            chipList.push(values);
            console.log(chipList);
            ajax({
              type:"post",
              url:"/onlineFilmData/update",
              data:{_id:this.props.cinemaMatchReducer.addChip._id,chipArrangement:JSON.stringify(chipList)},
              success:function(data){
                console.log("没有排片请排片后的数据",this.props.cinemaMatchReducer.addChip);
                notification.open({
                  message: '排片提示',
                  description: "排片成功，您还可以继续添加排片信息，否则请点击取消按钮退出！",
                });
                // 利用对表格的刷新，解决如果一个电影无排片信息，第一次增加完排片的时候马上查看排片信息不会显示出来的问题
                this.props.showFilm();

                this.props.form.resetFields();
                console.log("循环外修改在线影片信息的返回信息：",data);
              }.bind(this)
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
    this.props.form.resetFields();
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
    console.log("影院名",value);
    ajax({
      type:"post",
      url:"/theChainData/find",
      data:{chainName:value,findType:"exact"},
      success:function(data){
        console.log("查询出来的影院名",data);
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
          }else{
            this.setState({
              voidHall:[]
            });
          }
        }
        if(this.state.voidHall.length < 0 ){
          this.setState({
            newKey:this.state.newKey++
          })
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
      <Modal visible={this.props.operateReducer.addChipArrangementVisible} title="增加影片排片" okText="确认添加" onCancel={this.handleCancel.bind(this)}
        onOk={this.handleCreate.bind(this)}>
        <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="影院" labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }} hasFeedback>
          {getFieldDecorator('theChainName', {
            rules: [{ required: true ,message:"请选择影院！"}],
          })(
            <Select onChange={this.voidHallList.bind(this)} style={{ width: 90 }}>
              {cinemaOptions}
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="影厅" labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }} hasFeedback>
          {getFieldDecorator('voidHall', {
            rules: [{ required: true ,message:"请选择影厅！"}],
          })(
            <Select style={{ width: 90 }}>
              {voidHallOptions}
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="放映时间：" labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }} hasFeedback>
          {getFieldDecorator('showTime', {
            rules: [{ required: true ,message:"请输入放映时间！"},{pattern: /^[0-9]{1,2}:[0-9]{1,2}$/, message: '格式不正确，请输入格式为xx:xx的时间!'}],
          })(
            <Input placeholder="请输入放映时间" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="票价" labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }} hasFeedback>
          {getFieldDecorator('ticketPrice', {
            rules: [{ required: true ,message:"请输入票价！"},{pattern: /^\d{1,}$/, message: '请输入数字！'}],
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
