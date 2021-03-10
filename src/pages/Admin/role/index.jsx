import React, { Component } from 'react';
/*
角色管理
*/
import { Card, Button, Table, Space, message } from 'antd';
import { roleList, delRole } from '@/api';
import AddRole from './add-role-modal'
import AuthForm from './auth-role-modal'
import { formatTime } from '@/utils/utils';
export default class Role extends Component {
    state = {
        pageSize: 10,
        pageNumber: 1,
        roleList: [],
        role: null,
        loading: true,
    }

    initColumns = () => {
        this.columns = [
            { title: "角色名称", dataIndex: 'role_name' },
            { title: "备注", dataIndex: 'remark' },
            { title: "创建人", dataIndex: 'create_user_name' },
            {
                title: "创建时间",
                dataIndex: 'create_time',
                render: (create_time) => formatTime(create_time, "YYYY-MM-DD HH:mm:ss")
            },
            {
                title: "更新时间",
                dataIndex: 'update_time',
                render: (create_time) => formatTime(create_time, "YYYY-MM-DD HH:mm:ss")
            },
            {
                title: "操作",
                dataIndex: 'action',
                render: (_, record) => (
                    <Space size="middle">
                        <Button type="primary" onClick={() => this.handleSelectMenu(record)}>权限配置</Button>
                        <Button type="danger" onClick={() => this.handleDelete(record)}>删除</Button>
                    </Space>
                )
            }
        ]
    }
    handleDelete = (record) => {
        this.deleteRole(record.role_id)
    }
    getRoleList = async () => {
        const { pageSize, pageNumber } = this.state;
        const result = await roleList({ pageSize, pageNumber });
        if (result.status === "0") {
            const { count, data, page } = result.data;
            this.setState({
                total: count,
                roleList: data,
                pageNumber: page,
                loading: false,
                pagination: {
                    defaultPageSize: pageSize,
                    total: count
                }
            })
        }
    }
    deleteRole = async (roleId) => {
        const result = await delRole(roleId)
        if (result.status === 0) {
            message.success('删除成功')
            this.getRoleList()
        } else {
            message.error(result.msg)
        }
    }
    handleTableChange = (pagination) => {
        this.setState({ pageNumber: pagination.current }, () => {
            this.getRoleList()
        })
    }
    componentDidMount() {
        this.initColumns()
        this.getRoleList()
    }
    // 增加权限窗口控制
    handleAddRole = () => {
        this.setState({ isModalVisible: true })
    }
    onConfirm = (result) => {
        this.setState({ isModalVisible: false }, () => result && this.getRoleList())
    }
    //增加权限窗口控制

    //配置权限窗口控制
    handleSelect = (result) => {
        this.setState({ isAuthModal: false }, () => result && this.getRoleList())
    }
    handleSelectMenu = (role) => {
        this.setState({ role, isAuthModal: true })
    }
    //配置权限窗口控制
    render() {
        const { roleList, pagination, role, isModalVisible, isAuthModal,loading } = this.state;
        const title = (
            <span className="card_title">
                <Button type="primary" style={{ marginRight: '10px' }} onClick={this.handleAddRole}>创建角色</Button>
            </span>
        )
        return (
            <div>
                <Card title={title}>
                    <Table
                        bordered
                        loading={loading}
                        rowKey='role_id'
                        dataSource={roleList}
                        columns={this.columns}
                        pagination={pagination}
                        onChange={this.handleTableChange}
                    ></Table>
                </Card >
                {
                    //强制销毁组件
                }
                {
                    isModalVisible ? <AddRole isModalVisible={isModalVisible} onConfirm={this.onConfirm} /> : ""
                }
                {
                    isAuthModal ? <AuthForm isAuthModal={isAuthModal} onSelect={this.handleSelect} role={role} /> : ""
                }
            </div>
        )
    }
}