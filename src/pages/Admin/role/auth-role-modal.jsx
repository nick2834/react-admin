import React, { Component } from 'react';
import { Tree, Modal, message } from 'antd'
import { updateRole } from '@/api';
import { deepClone, formatTime } from '@/utils/utils';
import menuList from '@/config/menuConfig';

export default class AuthForm extends Component {
    constructor(props) {
        super(props)
        // 根据传入角色的menus生成初始状态
        const { menus } = this.props.role;
        this.state = {
            checkedKeys: JSON.parse(menus)
        }
    }
    onCheck = (checkedKeys) => {
        const { role } = this.props;
        const roleData = deepClone(role);
        roleData.menus = JSON.stringify([...checkedKeys]);
        roleData.update_time = formatTime(new Date());
        this.setState({ checkedKeys, roleData })
    }
    handleOk = async () => {
        const { roleData } = this.state;
        const result = await updateRole(roleData)
        if (result.status === 0) {
            message.success("配置成功")
            this.props.onSelect(true)
        } else {
            message.error(result.msg)
            this.props.onSelect(false)
        }

    }
    handleCancel = () => {
        this.props.onSelect(false)
    }
    componentWillUnmount() {
        this.setState({
            checkedKeys: []
        })
    }
    render() {
        const { isAuthModal } = this.props
        const { checkedKeys } = this.state;
        return (
            <Modal title="权限配置" visible={isAuthModal} onOk={this.handleOk} onCancel={this.handleCancel} destroyOnClose>
                <Tree
                    checkable
                    defaultCheckedKeys={checkedKeys}
                    defaultExpandAll={true}
                    onCheck={this.onCheck}
                    treeData={menuList}
                ></Tree>
            </Modal>
        )
    }
}