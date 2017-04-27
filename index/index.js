import React from "react";
import {Layout} from "antd";
const {Header,Footer,Content,Sider}=Layout;

export default class Index extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return <div>
      <Layout>
        <Header style={{background:"linear-gradient(rgb(55, 192, 255), rgb(0, 151, 221)) 0% 0% / 100%"}}>
          <h1 style={{float:"left"}}>猫眼电影后台管理系统</h1><span style={{float:"right",cursor:"pointer"}}>登录</span>
        </Header>
        <Content>{this.props.children}</Content>
        <Footer style={{background:"linear-gradient(rgb(55, 192, 255), rgb(0, 151, 221)) 0% 0% / 100%",textAlign:"center",color:"#fff"}}>
          <h2>项目组成员：方兴 邓伟 李顺 梁超 田钰</h2>
        </Footer>
      </Layout>
    </div>
  }
}
