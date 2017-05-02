import React from "react";
import {ajax} from "../../tool/tools";
// import 'antd/dist/antd.css';
import Seat from "./Seat";
import {Modal,Button,Input,Form,Icon,message} from 'antd';
const FormItem = Form.Item;

let uuid = 0;
class AddButton extends React.Component{
  constructor(props){
    super(props);
    this.state = { 
          visible: false ,
          seatvisible: false ,
      } 
  }

  showSeats(k){
      let value = this.props.form.getFieldValue(`seats_${k}`);
      this.setState({
          seatvisible:true,
          seats:value
      });
  }
  SeathandleOk(){
      this.setState({ 
        seatvisible: false,
      });  
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
            let data= values;
            let voidHall=[];
            for(let i=1;i<=data.keys.length;i++){
              let _voidHall={};

              _voidHall.hallName=this.props.form.getFieldValue(`names_${i}`);
              _voidHall.seat =this.props.form.getFieldValue(`seats_${i}`);
              voidHall.push(_voidHall);
            }
            console.log(voidHall);
            data.voidHall = JSON.stringify(voidHall);
            console.log(data);

            ajax({
              type:"post",
              url:"/theChainData/add",
              data:{
                  chainName:data.chainName,
                  address:data.address,
                  size:data.size,
                  place:data.place,
                  voidHall:data.voidHall,
              },
              success:function(){
                  message.info('添加成功');
                  this.props.show();
                  this.props.form.resetFields();
                  this.setState({
                      visible: false,
                  });
              }.bind(this)
            })
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
  remove(k){
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

  add(){
      uuid++;
      const { form } = this.props;
      // can use data-binding to get
      const keys = form.getFieldValue('keys');
      const nextKeys = keys.concat(uuid);
      // can use data-binding to set
      // important! notify form to detect changes
      form.setFieldsValue({
        keys: nextKeys,
      });
  }
  checkchainName(rule, value, callback){
      ajax({
        type:"post",
        url:"/theChainData/find",
        data:{
          findType:"exact",
          chainName:value
        },
        success:function(data){
          if(data.length>0){
            callback("该影院已添加");
          }else{
            callback();
          }
        }.bind(this)
      });
    }
  render(){
      const { getFieldDecorator,getFieldValue} = this.props.form;
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
      const formItemLayoutWithOutLabel = {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 },
        },
      };
      getFieldDecorator('keys', { initialValue: [] });
      const keys = getFieldValue('keys');
      const formItems = keys.map((k, index) => {
        return (
          <div>
          <FormItem
            {...formItemLayout}
            label='放映厅名'
            required={false}
            key={k} 
          >
            {getFieldDecorator(`names_${k}`, {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{
                required: true,
                whitespace: true,
                message: "请输入放映厅名.",
              }],
            })(
              <Input type="text" placeholder="放映厅名" style={{ width: '60%', marginRight: 8 }} />
            )}
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              disabled={keys.length === 1}
              onClick={() => this.remove(k)}
            />
          </FormItem>

          <FormItem
            {... formItemLayout}
            label='座位'
            required={false} 
          >
            {getFieldDecorator(`seats_${k}`, {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{
                required: true,
                whitespace: true,
                message: "请输入座位.",
              }],
            })(
              <Input type="textarea"  placeholder="座位" style={{ width: '60%', marginRight: 8 }} />
            )}
            <Icon
              className="dynamic-delete-button"
              type="eye-o"
              disabled={keys.length === 1}
              onClick={() => this.showSeats(k)}
            />
          </FormItem>
          </div>
        );
      });
      return (
        <span>
              <Seat seats={this.state.seats}
                    visible={this.state.seatvisible} 
                    handleOk={this.SeathandleOk.bind(this)} 
                    >
              </Seat>
            <Button type="primary"  onClick={this.showModal.bind(this)}>增加</Button>
            <Modal title="添加数据" visible={this.state.visible}
              onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
              okText="确定" cancelText="取消"
            >
              <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                <FormItem {...formItemLayout} label="院线名：" hasFeedback>
                      {getFieldDecorator('chainName', {
                        rules: [{ required: true, message: '请输入院线名!' },
                                { validator:this.checkchainName.bind(this) }
                        ],
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
                        rules: [{ required: true, message: '请输入联系电话!' },
                                { pattern: /^[0-9]{11}$/, message: '请输入正确的电话号码!'}
                        ],
                      })(
                        <Input type="text"  placeholder="联系电话" />
                      )}
              </FormItem>

              {formItems}
              <FormItem {...formItemLayoutWithOutLabel} >
                <Button type="dashed" onClick={this.add.bind(this)} style={{ width: '60%' }}>
                  <Icon type="plus" /> 添加放映厅
                </Button>
              </FormItem>
            </Form>
          </Modal>
       </span>
      )
    }
}
export default Form.create()(AddButton);