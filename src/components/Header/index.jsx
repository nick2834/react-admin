import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Menu, Dropdown, Modal } from 'antd';
import { DownOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import memoryUtils from '@/utils/memoryUtils';
import storageUtils from '@/utils/storageUtils';
import './index.less';

const { Header } = Layout
class MHeader extends Component {
    logout = () => {
        Modal.confirm({
            content: '确定退出吗?',
            onOk: () => {
                // 删除保存的user数据
                storageUtils.removeUser()
                memoryUtils.user = {}
                // 跳转到login
                this.props.history.replace('/login')
            }
        })
    }
    toggle = () => {
        const { collapsed } = this.props;
        this.props.changeToggle(collapsed ? false : true)
    }
    render() {
        const menu = (
            <Menu>
                <Menu.Item>修改密码</Menu.Item>
                <Menu.Item onClick={this.logout}>退出</Menu.Item>
            </Menu>
        );
        const username = memoryUtils.user.username;
        const { collapsed } = this.props;
        return (
            <Header className="header">
                {
                    collapsed ?
                        <MenuUnfoldOutlined className="trigger" onClick={this.toggle} /> :
                        <MenuFoldOutlined className="trigger" onClick={this.toggle} />
                }
                <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()} href="javacript:void(0);">
                        欢迎： {username} <DownOutlined />
                    </a>
                </Dropdown>
            </Header>
        )
    }
}

export default withRouter(MHeader)