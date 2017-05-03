import React from "react";
import {ajax} from "../tool/tools";
import { Form, Input, Icon,Tooltip, Cascader, Checkbox , Button , Select, Row, Col , Card ,notification} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class Login extends React.Component{

	handleSubmit(e){
    e.preventDefault();
    	this.props.form.validateFields((err, values) => {
	      if (!err) {
	      	delete values.remember;
	      	ajax({
		  		type:"post",
		  		url:"/userLogData/find",
		  		data:{acc:values.username,pwd:values.pwd,findType:"exact",addSession:1},
		  		success:function(data){
		  			if(data.length > 0){
			  			notification['success']({
						    message: '登录提醒',
						    description: '登录已成功',
						});
						this.props.router.replace("/Manage");
		  			}
		  		}.bind(this)
		  	});
	        console.log('Received values of form: ', values);
	      }
	    });
	  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
  	<Row type="flex" justify="center">
      	<Col span={6}>
      		<Card title="用户登录" bordered={false} style={{margin:"50px 0 50px"}}>
	      <Form className="login-form" onSubmit={this.handleSubmit.bind(this)}>
	        <FormItem>
	          {getFieldDecorator('username', {
	            rules: [{ required: true, message: '请输入您的用户名!' }],
	          })(
	            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
	          )}
	        </FormItem>
	        <FormItem>
	          {getFieldDecorator('pwd', {
	            rules: [{ required: true, message: '请输入您的密码!' }],
	          })(
	            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
	          )}
	        </FormItem>
	        <FormItem>
							<Button style={{marginLeft:120}} type="primary" htmlType="submit" className="login-form-button">
	            登录
	          </Button>
	        </FormItem>
	      </Form>
	      </Card>
        </Col>
        </Row>

    );
  }

}

export default Form.create()(Login);
