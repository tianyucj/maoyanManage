import React from "react";
import {Layout} from "antd";
import {Link} from "react-router";
import {ajax} from "../tool/tools";
const {Header,Footer,Content,Sider}=Layout;

export default class Index extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isShow:[]
    }
  }
  componentWillMount(){
    this.getSession()
  }
  componentWillReceiveProps(){
    this.getSession()
  }
  getSession(){
    ajax({
      type:"post",
      url:"/getSession",
      success:function(data){
        if(JSON.stringify(data) != "{}"){
          this.setState({
            isShow:[data.name,<span style={{marginLeft:"20px"}} onClick={this.logout.bind(this)}>撤销</span>]
          }) 
        }else{
          this.setState({
            isShow:["",<Link style={{color:'#fff'}} to='/login'>登录</Link>]
          })

        }
        console.log("data",data)
      }.bind(this)
    })
  }
  logout(){
    ajax({
      type:"get",
      url:"/logout",
      success:function(){
        this.props.router.replace("/login");
      }.bind(this)
    })
  }
  render(){
    return <div>
    <Layout>
    <Header style={{background:"linear-gradient(rgb(55, 192, 255), rgb(0, 151, 221)) 0% 0% / 100%"}}>
    <h1 style={{float:"left"}}>猫眼电影后台管理系统</h1>
    <span style={{float:"right",cursor:"pointer"}}>{this.state.isShow}</span>
    </Header>
    <Content  style={{height:590}}>{this.props.children}</Content>
    <Footer style={{background:"linear-gradient(rgb(55, 192, 255), rgb(0, 151, 221)) 0% 0% / 100%",textAlign:"center",color:"#fff"}}>
    <h2>项目组成员：方兴 邓伟 李顺 梁超 田钰</h2>
    </Footer>
    </Layout>
    </div>
  }
}
