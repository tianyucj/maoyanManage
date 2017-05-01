import React from "react";
import {ajax} from "../../tool/tools";
import 'antd/dist/antd.css';
import {Modal,Button,Input,Form,Icon,message} from 'antd';
const FormItem = Form.Item;

class AddButton extends React.Component{
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
  showModal(){
      this.setState({
        visible: true,
      });
  }
  handleOk(){
    this.props.form.validateFields((err, values) => {
        if (!err) {
            console.log(1);
            this.setState({
                visible: false,
            });
        }
      });
      
    }
  handleCancel(){
      this.setState({ 
        visible: false,
      });
  }
  handleChange(value) {
      console.log(`selected ${value}`);
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
      return (
        <span>
            <Button type="primary" style={{margin:"10px"}} onClick={this.showModal.bind(this)}>增加</Button>
            <Modal title="添加数据" visible={this.state.visible}
              onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
              okText="确定" cancelText="取消"
            >
              <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                <FormItem {...formItemLayout} label="院线名：" hasFeedback>
                      {getFieldDecorator('chainName', {
                        rules: [{ required: true, message: '请输入院线名!' }],
                      })(
                        <Input type="text"  placeholder="院线名" />
                      )}
              </FormItem>
              <FormItem {...formItemLayout} label="地址：" hasFeedback>
                      {getFieldDecorator('address', {
                        rules: [{ required: true, message: '请输入地址!' }],
                      })(
                        <Input type="text"  placeholder="地址" />
                      )}
              </FormItem>
              <FormItem {...formItemLayout} label="规模：" hasFeedback>
                      {getFieldDecorator('size', {
                        rules: [{ required: true, message: '请输入规模大小!' }],
                      })(
                        <Input type="text"  placeholder="规模" />
                      )}
              </FormItem>
              <FormItem {...formItemLayout} label="联系电话：" hasFeedback>
                      {getFieldDecorator('place', {
                        rules: [{ required: true, message: '请输入联系电话!' }],
                      })(
                        <Input type="text"  placeholder="联系电话" />
                      )}
              </FormItem>
            </Form>
          </Modal>
       </span>
      )
    }
}
export default Form.create()(AddButton);