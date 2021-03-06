import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { Layout, Menu, Dropdown, Modal, Breadcrumb, message } from 'antd';
import { DownOutlined, MenuFoldOutlined, MenuUnfoldOutlined, BgColorsOutlined } from '@ant-design/icons';
import { SketchPicker } from 'react-color';
import { logout } from '@/actions/user_actions'
import './index.less';
import menuList from '@/config/menuConfig';
import PwdModal from "./pwd-modal";
import HeaderNav from './headerNav'
const { Header } = Layout;
class MHeader extends Component {
    state = {
        background: "#108ee9",
        isShow: false
    }
    logout = () => {
        Modal.confirm({
            content: '确定退出吗?',
            onOk: () => {
                this.props.logout()
            }
        })
    }
    toggle = () => {
        const { collapsed } = this.props;
        this.props.changeToggle(collapsed ? false : true)
    }
    getBreadCrumbPath = () => {
        const path = this.props.location.pathname;
        let routePath;
        path !== '/home' && menuList.forEach((item) => {
            if (item.key === path) {
                routePath = item
            } else if (item.children) {
                const cItem = item.children.find(cItem => cItem.key === path)
                if (cItem) {
                    routePath = cItem
                }
            }
        })
        return (
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item href="/">首页</Breadcrumb.Item>
                {
                    routePath && routePath.title ? <Breadcrumb.Item><span>{routePath.title}</span></Breadcrumb.Item> : ''
                }

            </Breadcrumb>
        )
    }
    selectColor = (color) => {
        const { hex } = color;
        window.less.modifyVars({
            '@primary-color': hex
        }).then(() => {
            message.success("修改主题成功")
        })
        this.setState({ background: hex });
    }
    changePwd = () => {
        this.setState({ isShow: true })
    }
    onSubmit = (value) => {
        this.setState({ isShow: false })
    }
    render() {
        const { background, isShow, user } = this.state;
        const { collapsed } = this.props
        const username = this.props.users.username
        const menu = (
            <Menu>
                <Menu.Item onClick={this.changePwd}>修改密码</Menu.Item>
                <Menu.Item onClick={this.logout}>退出</Menu.Item>
            </Menu>
        );
        return (
            <Header className="header">
                <div className="header_body flex">
                    <div className="left flex">
                        <span className="toggle">
                            {
                                collapsed ?
                                    <MenuUnfoldOutlined className="trigger" onClick={this.toggle} /> :
                                    <MenuFoldOutlined className="trigger" onClick={this.toggle} />
                            }
                        </span>
                        {
                            this.getBreadCrumbPath()
                        }
                    </div>
                    <div className="right flex">
                        <span className="toggle color">
                            <BgColorsOutlined className="trigger" />
                            <span className="color_picker">
                                <SketchPicker
                                    color={background}
                                    onChange={this.selectColor}
                                />
                            </span>
                        </span>
                        <Dropdown overlay={menu} trigger={['click']}>
                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()} href="javacript:void(0);">
                                欢迎： {username} <DownOutlined />
                            </a>
                        </Dropdown>
                    </div>
                </div>
                <HeaderNav />
                <PwdModal isShow={isShow} onSubmit={this.onSubmit} user={user} />
            </Header>
        )
    }
}

export default connect(
    state => ({ users: state.users }),
    { logout }
)(withRouter(MHeader))