import React from "react";
import {ajax} from "../../tool/tools";
import 'antd/dist/antd.css';
import store from "../../tool/store";
import {connect} from "react-redux";
import Seat from "./Seat";
import {Modal,Button,Input,Form,Icon,message,notification} from 'antd';
const FormItem = Form.Item;

let uuid = 0;
let dynamicData = [];
class Updata extends React.Component{
  constructor(props){
    super(props);
    this.state = {
          visible: false,
          seatvisible: false ,
        }
  }
  componentWillReceiveProps(nextProps){
        // uuid = 0;
        if((!this.props.operateReducer.updateVisible && nextProps.operateReducer.updateVisible)
        ||(this.state.seatvisible && !nextProps.state.seatvisible)){

            let rooms = nextProps.cinemaReducer.cinema.voidHall;
            if(!rooms || rooms.length <= 0){
                return;
            }
            let keys = rooms.map(function(item,index){
                uuid++;
                nextProps.form.getFieldDecorator(`names_${uuid}`, { initialValue: [] });
                nextProps.form.getFieldDecorator(`seats_${uuid}`, { initialValue: [] });
                dynamicData[`names_${uuid}`] = item.hallName;
                dynamicData[`seats_${uuid}`] = item.seat;
                return uuid;
            });
            dynamicData.keys = keys;
            nextProps.form.setFieldsValue(dynamicData);
        }

  }
  showSeats(k){
      let value = this.props.form.getFieldValue(`seats_${k}`);
      try{
        JSON.parse(value);
      }catch(e){
        if(e){
          Modal.confirm({
            title:'警告',
            content:"座位格式不正确，请输入正确的格式!",
            okText:"确认",
            cancelText:"取消"
          })
          return false
        }
      }
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
            data.voidHall = JSON.stringify(voidHall);

            var upData= data;
            upData._id = this.props.cinemaReducer.cinema._id;
            console.log(upData);
            ajax({
              type:"post",
              url:"/theChainData/update",
              data:{
                  _id:upData._id,
                  chainName:upData.chainName,
                  address:upData.address,
                  size:upData.size,
                  place:upData.place,
                  voidHall:upData.voidHall,
              },
              success:function(){
                  uuid = 0;
                  notification.open({
                    message: '修改提示',
                    description: "院线修改成功！",
                  });
                  this.props.show();
                  store.dispatch({
                      type:"SHOW_UPDATE_MODAL",
                      updateVisible:false
                  });
              }.bind(this)
            })

        }
      });

    }
  handleCancel(){
       store.dispatch({
            type:"SHOW_UPDATE_MODAL",
            updateVisible:false
      });
      uuid = 0;
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
      console.log("uuid",uuid);
      // can use data-binding to set
      // important! notify form to detect changes
      form.setFieldsValue({
        keys: nextKeys,
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
            <Modal title="修改数据" visible={this.props.operateReducer.updateVisible}
              onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
              okText="确定" cancelText="取消"
            >
              <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                <FormItem {...formItemLayout} label="院线名：" hasFeedback>
                      {getFieldDecorator('chainName', {
                        rules: [{ required: true, message: '请输入院线名!' }],
                      })(
                        <Input type="text" disabled />
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
    }
  }
})(Updata));
