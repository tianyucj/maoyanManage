import React from "react";
import {Button,Modal,Form,Input,Upload,Icon,notification} from "antd";
import {ajax} from "../../tool/tools";
const FormItem = Form.Item;

class AddFilm extends React.Component{
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
  handleOk(e){
    var values = this.props.form.getFieldsValue();
    var images = [];
    for(let i = 0;i < values.Images.length;i++){
      images.push(values.homeImg[i].thumbUrl)
    }
    ajax({
      type:"post",
      url:"/filmData/add",
      data:{
        chName:values.chName,
        enName:values.enName,
        style:values.style,
        place:values.place,
        century:values.century,
        duration:values.duration,
        reTime:values.reTime,
        rePlace:values.rePlace,
        boxOffice:values.boxOffice,
        abstract:values.abstract,
        rink:parseInt(values.rink),
        homeImg:values.homeImg[0].thumbUrl,
        images:images
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

   return <div>
   <Button type="primary" onClick={this.showModal.bind(this)} ghost>添加</Button>
   <Modal title="添加" visible={this.state.visible}
   onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
   >
   <Form onSubmit={this.handleSubmit}>
   <FormItem {...formItemLayout} label="电影名">
   {getFieldDecorator('chName', {
     rules: [{ required: true, message: '请输入电影名' }],
   })(
   <Input type="text" placeholder="电影名" />
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
   <Input type="text" placeholder="描述" />
   )}
   </FormItem>
   <FormItem {...formItemLayout} label="排行">
   {getFieldDecorator('rink', {
     rules: [{ required: true, message: '请输入排行' }],
   })(
   <Input type="text" placeholder="排行" />
   )}
   </FormItem>
   <FormItem
   {...formItemLayout}
   label="主页图片"
   extra="主页图片"
   >
   {getFieldDecorator('homeImg', {
    valuePropName: 'fileList',
    getValueFromEvent: this.normFile,
    
    rules: [{ required: true, message: '请添加首页图片' }]

  })(
  <Upload name="logo" action="/upload.do" listType="picture">
  <Button>
  <Icon type="upload" /> 添加
  </Button>
  </Upload>
  )}
  </FormItem>
  <FormItem
  {...formItemLayout}
  label="图集"
  extra="图集"
  >
  {getFieldDecorator('Images', {
    valuePropName: 'fileList',
    getValueFromEvent: this.normFile,
    
    rules: [{ required: true, message: '请添加图集' }]

  })(
  <Upload name="logo" action="/upload.do" listType="picture">
  <Button>
  <Icon type="upload" /> 添加
  </Button>
  </Upload>
  )}
  </FormItem>
  </Form>
  </Modal>
  </div>
}
}
export default Form.create()(AddFilm);