import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu } from 'antd';
import './index.less';
import logo from '@/assets/images/logo.png';
import MenuList from '@/config/menuConfig'
const { SubMenu } = Menu;
class Sidebar extends Component {
    getMenuNodes = (MenuList) => {
        const path = this.props.location.pathname;
        return MenuList.reduce((pre, item) => {
            if (!item.children) {
                pre.push(
                    <Menu.Item key={item.key} icon={item.icon}><Link to={item.key}>{item.title}</Link></Menu.Item>
                )
            } else {
                const cItem = item.children.find((cItem => cItem.key === path));
                cItem && (this.openKey = item.key) //判断二级菜单打开
                pre.push((
                    <SubMenu key={item.key} icon={item.icon} title={item.title}>
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                ))
            }
            return pre
        }, [])
    }
    UNSAFE_componentWillMount() {
        this.menuNodes = this.getMenuNodes(MenuList)
    }
    render() {
        const path = this.props.location.pathname;
        const openKey = this.openKey;
        return (
            <div className="side_bar">
                <div className="logo" >
                    <img src={logo} alt="" />
                </div>
                <Menu
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
                    mode="inline"
                    theme="dark"
                >
                    {
                        this.menuNodes
                    }
                </Menu>
            </div>
        )
    }
}
//withRouter 非路由组件变路由组件  高阶函数
export default withRouter(Sidebar)