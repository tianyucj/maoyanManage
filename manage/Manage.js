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
            <Link to="/user">
              <Icon type="user" />
              <span className="nav-text">用户管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="filmManage">
            <Link to="/film">
              <Icon type="video-camera" />
              <span className="nav-text">电影管理</span></Link>
            </Menu.Item>
            <Menu.Item key="cinemaManage">
            <Link to="/cinema">
              <Icon type="video-camera" />
              <span className="nav-text">院线管理</span>
            </Link>
            </Menu.Item>
            <Menu.Item key="cinemaMatch">
            <Link to="/cinemaMatch">
              <Icon type="video-camera" />
              <span className="nav-text">电影院线匹配</span>
            </Link>
            </Menu.Item>
            <Menu.Item key="hitMovie">
            <Link to="/wellReceived">
              <Icon type="video-camera" />
              <span className="nav-text">热映电影管理</span>
            </Link>
            </Menu.Item>
            <Menu.Item key="orderManage">
            <Link to="/orderManage">
              <Icon type="video-camera" />
              <span className="nav-text">订单管理</span>
            </Link>  
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
