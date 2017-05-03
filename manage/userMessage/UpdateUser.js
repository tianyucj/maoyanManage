import React from "react";
import {Modal,Form,Input,notification} from "antd";
import {ajax} from "../../tool/tools";
import {connect} from "react-redux";
import store from "../../tool/store";
const FormItem = Form.Item;

class UpdateUser extends React.Component{
  constructor(props){
    super(props);
    this.state = { visible: false }
  }
  handleOk(){
    var values = this.props.form.getFieldsValue();
    values._id = this.props.userReducer.user._id;
    ajax({
      type:"post",
      url:"/userLogData/update",
      data:values,
      success:function(){
        this.props.show();

        notification['success']({
          message: '删除提醒',
          description: '删除已成功',
        });
        this.props.router.replace("/Manage");

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
   <FormItem {...formItemLayout} label="姓名" hasFeedback>
   {getFieldDecorator('name', {
     rules: [{ required: true, message: '请输入姓名' }],
   })(
   <Input placeholder="姓名" />
   )}
   </FormItem>
   <FormItem {...formItemLayout} label="帐号" hasFeedback>
   {getFieldDecorator('acc', {
     rules: [{ required: true, message: '请输入帐号' }],
   })(
   <Input type="text" placeholder="帐号" />
   )}
   </FormItem>
   <FormItem {...formItemLayout} label="部门" hasFeedback>
   {getFieldDecorator('division', {
     rules: [{ required: true, message: '请输入部门' }],
   })(
   <Input type="text" placeholder="部门" />
   )}
   </FormItem>
   <FormItem {...formItemLayout} label="职位" hasFeedback>
   {getFieldDecorator('position', {
     rules: [{ required: true, message: '请输入职位' }],
   })(
   <Input type="text" placeholder="职位" />
   )}
   </FormItem>
   <FormItem {...formItemLayout} label="电话" hasFeedback>
   {getFieldDecorator('phone', {
     rules: [{ required: true, message: '请输入电话' }],
   })(
   <Input type="text" placeholder="电话" />
   )}
   </FormItem>
   <FormItem {...formItemLayout} label="密码" hasFeedback>
   {getFieldDecorator('pwd', {
     rules: [{ required: true, message: '请输入密码' }],
   })(
   <Input type="text" placeholder="密码" />
   )}
   </FormItem>
   </Form>
   </Modal>
 }
}
const mapStateToProps = function(store){
  return {
    operateReducer:store.operateReducer,
    userReducer:store.userReducer
  }
}
export default connect(mapStateToProps)(Form.create({
  mapPropsToFields(props){
    return {
      name:{value:props.userReducer.user.name},
      acc:{value:props.userReducer.user.acc},
      division:{value:props.userReducer.user.division},
      place:{value:props.userReducer.user.place},
      position:{value:props.userReducer.user.position},
      phone:{value:props.userReducer.user.phone},
      pwd:{value:props.userReducer.user.pwd}
    }
  }
})(UpdateUser));
