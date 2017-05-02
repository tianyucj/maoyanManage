import React from "react";
import {ajax} from "../../tool/tools";
import 'antd/dist/antd.css';
import store from "../../tool/store";
import {connect} from "react-redux";
import {Modal,Button,Input,Form,Icon,message} from 'antd';
const FormItem = Form.Item;

class Updata extends React.Component{
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
  handleOk(){
    this.props.form.validateFields((err, values) => {
        if (!err) {
            console.log(1);
            store.dispatch({
              type:"SHOW_UPDATE_MODAL",
              updateVisible:false
          });
        }
      });
      
    }
  handleCancel(){
       store.dispatch({
            type:"SHOW_UPDATE_MODAL",
            updateVisible:false
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
            <Modal title="修改数据" visible={this.props.operateReducer.updateVisible}
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

const mapStateToProps = function(store){
    return {
        cinemaReducer:store.cinemaReducer,
        operateReducer:store.operateReducer,
    }
}
export default connect(mapStateToProps)(Form.create({
  mapPropsToFields(props){
    return {
      chainName:{value:props.cinemaReducer.cinema.chainName},
      address:{value:props.cinemaReducer.cinema.address},
      size:{value:props.cinemaReducer.cinema.size},
      place:{value:props.cinemaReducer.cinema.place},
      voidHall:{value:props.cinemaReducer.cinema.voidHall},
    }
  }
})(Updata));