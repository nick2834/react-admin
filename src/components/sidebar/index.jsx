import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu } from 'antd';
import './index.less';
// import logo from '@/assets/images/logo.png';
import MenuList from '@/config/menuConfig';
import memoryUtils from '@/utils/memoryUtils';
const { SubMenu } = Menu;
class Sidebar extends Component {
    /*
  判断当前登陆用户对item是否有权限
   */
    hasAuth = (item) => {
        const { key, isPublic } = item;
        const { username, menus } = memoryUtils.user;
        /*
        1. 如果当前用户是admin
        2. 如果当前item是公开的
        3. 当前用户有此item的权限: key有没有menus中
         */
        if (username === 'admin' || isPublic || menus.indexOf(key) !== -1) {
            return true
        } else if (item.children) {
            // 4. 如果当前用户有此item的某个子item的权限
            return !!item.children.find(child => menus.indexOf(child.key) !== -1)
        }

        return false
    }

    getMenuNodes = (MenuList) => {
        const path = this.props.location.pathname;
        return MenuList.reduce((pre, item) => {
            if (this.hasAuth(item)) {
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
                {/* <div className="logo" >
                    <img src={logo} alt="" />
                </div> */}
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