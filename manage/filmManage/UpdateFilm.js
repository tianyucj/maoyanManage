import React from "react";
import {Modal,Form,Input,notification} from "antd";
import {ajax} from "../../tool/tools";
import {connect} from "react-redux";
import store from "../../tool/store";
const FormItem = Form.Item;

class UpdateFilm extends React.Component{
  constructor(props){
    super(props);
    this.state = { visible: false }
  }
  handleOk(){
    var values = this.props.form.getFieldsValue();
    values._id = this.props.filmReducer.film._id;
    ajax({
      type:"post",
      url:"/filmData/update",
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
   <FormItem {...formItemLayout} label="中文名">
   {getFieldDecorator('chName', {
     rules: [{ required: true, message: '请输入中文名' }],
   })(
   <Input placeholder="中文名" />
   )}
   </FormItem>
   <FormItem {...formItemLayout} label="英文名">
   {getFieldDecorator('enName', {
     rules: [{ required: true, message: '请输入英文名' }],
   })(
   <Input type="text" placeholder="英文名" />
   )}
   </FormItem>
   <FormItem {...formItemLayout} label="类型">
   {getFieldDecorator('style', {
     rules: [{ required: true, message: '请输入类型' }],
   })(
   <Input type="text" placeholder="类型" />
   )}
   </FormItem>
   <FormItem {...formItemLayout} label="地区">
   {getFieldDecorator('place', {
     rules: [{ required: true, message: '请输入地区' }],
   })(
   <Input type="text" placeholder="地区" />
   )}
   </FormItem>
   <FormItem {...formItemLayout} label="年代">
   {getFieldDecorator('century', {
     rules: [{ required: true, message: '请输入年代' }],
   })(
   <Input type="text" placeholder="年代" />
   )}
   </FormItem>
   <FormItem {...formItemLayout} label="时长">
   {getFieldDecorator('duration', {
     rules: [{ required: true, message: '请输入时长' }],
   })(
   <Input type="text" placeholder="时长" />
   )}
   </FormItem>
   <FormItem {...formItemLayout} label="上映时间">
   {getFieldDecorator('reTime', {
     rules: [{ required: true, message: '请输入上映时间' }],
   })(
   <Input type="text" placeholder="上映时间" />
   )}
   </FormItem>
   <FormItem {...formItemLayout} label="上映地点">
   {getFieldDecorator('rePlace', {
     rules: [{ required: true, message: '请输入上映地点' }],
   })(
   <Input type="text" placeholder="上映地点" />
   )}
   </FormItem>
   <FormItem {...formItemLayout} label="票房">
   {getFieldDecorator('boxOffice', {
     rules: [{ required: true, message: '请输入票房' }],
   })(
   <Input type="text" placeholder="票房" />
   )}
   </FormItem>
   <FormItem {...formItemLayout} label="描述">
   {getFieldDecorator('abstract', {
     rules: [{ required: true, message: '请输入描述' }],
   })(
   <Input type="textarea" placeholder="描述" />
   )}
   </FormItem>
   <FormItem {...formItemLayout} label="排行">
   {getFieldDecorator('rink', {
     rules: [{ required: true, message: '请输入排行' }],
   })(
   <Input type="text" placeholder="排行" />
   )}
   </FormItem>
   </Form>
   </Modal>
 }
}
const mapStateToProps = function(store){
  return {
    operateReducer:store.operateReducer,
    filmReducer:store.filmReducer
  }
}
export default connect(mapStateToProps)(Form.create({
  mapPropsToFields(props){
    return {
      chName:{value:props.filmReducer.film.chName},
      enName:{value:props.filmReducer.film.enName},
      style:{value:props.filmReducer.film.style},
      place:{value:props.filmReducer.film.place},
      century:{value:props.filmReducer.film.century},
      duration:{value:props.filmReducer.film.duration},
      reTime:{value:props.filmReducer.film.reTime},
      rePlace:{value:props.filmReducer.film.rePlace},
      boxOffice:{value:props.filmReducer.film.boxOffice},
      abstract:{value:props.filmReducer.film.abstract},
      rink:{value:props.filmReducer.film.rink}
    }
  }
})(UpdateFilm));
