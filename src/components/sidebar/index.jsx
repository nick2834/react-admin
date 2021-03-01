import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import './index.less';
import logo from '@/assets/images/logo.png';
import MenuList from '@/config/menuConfig'
const { SubMenu } = Menu;
export default class Sidebar extends Component {
    getMenuNodes = (MenuList) => {
        const path = window.location.pathname;
        return MenuList.reduce((pre, item) => {
            if (!item.children) {
                pre.push(
                    <Menu.Item key={item.key} icon={item.icon}><Link to={item.key}>{item.title}</Link></Menu.Item>
                )
            } else {
                pre.push((
                    <SubMenu key={item.key} icon={item.icon} title={item.title}>
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                ))
            }
            return pre
        }, [])
    }
    render() {
        const path = window.location.pathname;
        return (
            <div className="side_bar">
                <div className="logo" >
                    <img src={logo} alt="" />
                </div>
                <Menu
                    defaultSelectedKeys={[path]}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                >
                    {
                        this.getMenuNodes(MenuList)
                    }
                </Menu>
            </div>
        )
    }
}