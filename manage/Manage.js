import React from "react";
import {Layout,Menu,Icon} from "antd";
import {Link} from "react-router";
const {Sider,Content} = Layout;

export default class Manage extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <Layout>
        <Sider style={{margin:"24px 16px 24px",backgroundColor:"#fff"}} breakpoint="lg" collapsedWidth="0"
          onCollapse={(collapsed, type) => { console.log(collapsed, type); }} >
          <Menu theme="white" mode="inline" defaultSelectedKeys={['5']}>
            <Menu.Item key="userManage">
              <Icon type="user" />
              <span className="nav-text"><Link to="/user">用户管理</Link></span>
            </Menu.Item>
            <Menu.Item key="filmManage">
              <Icon type="video-camera" />
              <span className="nav-text"><Link to="/film">电影管理</Link></span>
            </Menu.Item>
            <Menu.Item key="cinemaManage">
              <Icon type="video-camera" />
              <span className="nav-text"><Link to="/cinema">院线管理</Link></span>
            </Menu.Item>
            <Menu.Item key="cinemaMatch">
              <Icon type="video-camera" />
              <span className="nav-text"><Link to="/cinemaMatch">电影院线匹配</Link></span>
            </Menu.Item>
            <Menu.Item key="hitMovie">
              <Icon type="video-camera" />
              <span className="nav-text"><Link to="/wellReceived">热映电影管理</Link></span>
            </Menu.Item>
            <Menu.Item key="orderManage">
              <Icon type="video-camera" />
              <span className="nav-text"><Link to="/orderManage">订单管理</Link></span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Content style={{ margin: '24px 16px 24px' }}>
            {this.props.children}
        </Content>
      </Layout>
    )
  }
}
