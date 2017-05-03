import React from "react";
import {Modal,Form,Input,notification} from "antd";
import {ajax} from "../../tool/tools";
import {connect} from "react-redux";
import store from "../../tool/store";
const FormItem = Form.Item;

class UpdateOrder extends React.Component{
  constructor(props){
    super(props);
  }
  handleOk(){
    var values = this.props.form.getFieldsValue();
    values._id = this.props.orderManageReducer.orderManage._id;
    ajax({
      type:"post",
      url:"/orderData/update",
      data:values,
      success:function(){
        this.props.show();
        notification['success']({
          message: '修改提醒',
          description: '修改成功',
        });
      }.bind(this)
    });
    store.dispatch({
      type:"SHOW_UPDATE_MODAL",
      updateVisible:false
    });
  }
  handleCancel(){
    store.dispatch({
      type:"SHOW_UPDATE_MODAL",
      updateVisible:false
    });
  }
  render(){
    const { getFieldDecorator } = this.props.form;
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

   return <Modal title="修改" visible={this.props.operateReducer.updateVisible}
   onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
   >
   <Form>
   <FormItem {...formItemLayout} label="用户电话">
   {getFieldDecorator('userPhone')(
   <Input placeholder="中文名" disabled />
   )}
   </FormItem>
   <FormItem {...formItemLayout} label="电影名">
   {getFieldDecorator('filmName')(
   <Input type="text" placeholder="电影名" disabled/>
   )}
   </FormItem>
   <FormItem {...formItemLayout} label="地址">
   {getFieldDecorator('address')(
   <Input type="text" disabled/>
   )}
   </FormItem>
   <FormItem {...formItemLayout} label="电影院">
   {getFieldDecorator('chineName')(
   <Input type="text" disabled/>
   )}
   </FormItem>
   <FormItem {...formItemLayout} label="影厅名">
   {getFieldDecorator('hallName')(
   <Input type="text" disabled/>
   )}
   </FormItem>
   <FormItem {...formItemLayout} label="放映时间">
   {getFieldDecorator('showTime')(
   <Input type="text" disabled/>
   )}
   </FormItem>
   <FormItem {...formItemLayout} label="数量" hasFeedback>
   {getFieldDecorator('tickets', {
     rules: [{ required: true, message: '请输入影票数量' }],
   })(
   <Input type="text" placeholder="请输入影票数量" />
   )}
   </FormItem>
   <FormItem {...formItemLayout} label="票价" hasFeedback>
   {getFieldDecorator('ticketPrice', {
     rules: [{ required: true, message: '请输入票价' }],
   })(
   <Input type="text" placeholder="请出入票价" />
   )}
   </FormItem>
   <FormItem {...formItemLayout} label="座位数" hasFeedback>
   {getFieldDecorator('seat', {
     rules: [{ required: true, message: '请输入座位数' }],
   })(
   <Input type="textarea" placeholder="请输入座位数" />
   )}
   </FormItem>
   </Form>
   </Modal>
 }
}
const mapStateToProps = function(store){
  return {
    operateReducer:store.operateReducer,
    orderManageReducer:store.orderManageReducer
  }
}
export default connect(mapStateToProps)(Form.create({
  mapPropsToFields(props){
    return {
      userPhone:{value:props.orderManageReducer.orderManage.userPhone},
      filmName:{value:props.orderManageReducer.orderManage.filmName},
      address:{value:props.orderManageReducer.orderManage.address},
      chineName:{value:props.orderManageReducer.orderManage.chineName},
      hallName:{value:props.orderManageReducer.orderManage.hallName},
      showTime:{value:props.orderManageReducer.orderManage.showTime},
      tickets:{value:props.orderManageReducer.orderManage.tickets},
      ticketPrice:{value:props.orderManageReducer.orderManage.ticketPrice},
      seat:{value:props.orderManageReducer.orderManage.seat}
    }
  }
})(UpdateOrder));
