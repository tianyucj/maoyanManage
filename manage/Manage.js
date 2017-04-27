import React from "react";
import {Layout,Menu,Icon} from "antd";
const {Sider,Content} = Layout;

export default class Manage extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <Layout>
        <Sider style={{margin:"24px 16px 24px"}} breakpoint="lg" collapsedWidth="0"
          onCollapse={(collapsed, type) => { console.log(collapsed, type); }} >
          // <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
            <Menu.Item key="userManage">
              <Icon type="user" />
              <span className="nav-text">用户管理</span>
            </Menu.Item>
            <Menu.Item key="informationManage">
              <Icon type="video-camera" />
              <span className="nav-text">资讯管理</span>
            </Menu.Item>
            <Menu.Item key="filmManage">
              <Icon type="video-camera" />
              <span className="nav-text">电影管理</span>
            </Menu.Item>
            <Menu.Item key="cinemaManage">
              <Icon type="video-camera" />
              <span className="nav-text">院线管理</span>
            </Menu.Item>
            <Menu.Item key="cinemaMatch">
              <Icon type="video-camera" />
              <span className="nav-text">电影院线匹配</span>
            </Menu.Item>
            <Menu.Item key="hitMovie">
              <Icon type="video-camera" />
              <span className="nav-text">热映电影管理</span>
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
