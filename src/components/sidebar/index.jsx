import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Menu } from 'antd';
import {
    HomeOutlined,
    UserOutlined,
    MailOutlined,
} from '@ant-design/icons';
import './index.less';
import logo from '@/assets/images/logo.png';
const { SubMenu } = Menu;
export default class Sidebar extends Component {
    render() {
        return (
            <div className="side_bar">
                <div className="logo" >
                    <img src={logo} alt="" />
                </div>
                <Menu
                    defaultSelectedKeys={['/home']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                >
                    <Menu.Item key="/home" icon={<HomeOutlined />}><Link to="/home">首页</Link></Menu.Item>
                    <SubMenu key="sub1" icon={<MailOutlined />} title="文章">
                        <Menu.Item key="/articles"><Link to="/articles">文章管理</Link></Menu.Item>
                        <Menu.Item key="/category"><Link to="/category">文章分类</Link></Menu.Item>
                    </SubMenu>
                    <Menu.Item key="/user" icon={<UserOutlined />}><Link to="/user">用户管理</Link></Menu.Item>
                    <Menu.Item key="/role" icon={<UserOutlined />}><Link to="/role">角色管理</Link></Menu.Item>
                </Menu>
            </div>
        )
    }
}