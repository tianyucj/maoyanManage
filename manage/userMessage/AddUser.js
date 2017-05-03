import React from "react";
import {Button,Modal,Form,Input,Upload,Icon,notification} from "antd";
import {ajax} from "../../tool/tools";
const FormItem = Form.Item;

class AddUser extends React.Component{
  constructor(props){
    super(props);
    this.state = { visible: false }
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  normFile(e){
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  showModal(){
    this.setState({
      visible: true,
    });
  }
  checkName(rule, value, callback){
    ajax({
        type:"post",
        url:"/userLogData/find",
        data:{
          findType:"exact",
          name:value
        },
        success:function(data){
          if(data.length>0){
            callback("该用户管理已添加");
          }else{
            callback();
          }
        }.bind(this)
      });
  }
  handleOk(e){
    var values = this.props.form.getFieldsValue();
    ajax({
      type:"post",
      url:"/userLogData/add",
      data:{
        name:values.name,
        acc:values.acc,
        division:values.division,
        position:values.position,
        phone:values.phone,
        pwd:values.pwd
      },
      success:function(){
        this.props.show();
        this.props.form.resetFields();

        notification['success']({
          message: '添加提醒',
          description: '添加已成功',
        });
        this.props.router.replace("/Manage");

      }.bind(this)
    });
    this.setState({
      visible: false,
    });
  }
  handleCancel(e){
    console.log(e);
    this.setState({
      visible: false,
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

   return <div >
   <Button type="primary" onClick={this.showModal.bind(this)}>增加</Button>
   <Modal title="增加用户" visible={this.state.visible}
   onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
   >
   <Form onSubmit={this.handleSubmit}>
  <FormItem {...formItemLayout} label="姓名" hasFeedback>
   {getFieldDecorator('name', {
     rules: [{ required: true, message: '请输入姓名' },
     { validator:this.checkName.bind(this) }],
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
  </div>
}
}
export default Form.create()(AddUser);
