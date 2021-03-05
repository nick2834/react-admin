
/*
用户管理
*/
import React, { Component } from 'react';
import { Card, Table, Button, Space, message, Modal } from 'antd'
import { formatTime } from '@/utils/utils';
import AddUser from './add-user-modal';
import { userList, delUser } from '@/api';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal
export default class User extends Component {
    state = {
        userList: [],
        pageSize: 10,
        pageNumber: 1,
        statusList: [
            {
                title: "禁用",
                status: 0
            },
            {
                title: "待审核",
                status: 1
            },
            {
                title: "审核不通过",
                status: 2
            },
            {
                title: "审核通过",
                status: 3
            },
            {
                title: "正常",
                status: 4
            },
        ]
    }
    initColumns = () => {
        this.columns = [
            { title: "用户名", dataIndex: 'username' },
            { title: "邮箱", dataIndex: 'email' },
            { title: "手机号", dataIndex: 'mobile' },
            {
                title: "创建时间",
                dataIndex: 'create_time',
                render: (create_time) => formatTime(create_time, "YYYY-MM-DD HH:mm:ss")
            },
            {
                title: "操作",
                dataIndex: 'action',
                render: (_, record) => (
                    <Space size="middle">
                        <Button type="primary">权限配置</Button>
                        <Button type="danger" onClick={() => this.handleDeleteUser(record)}>删除</Button>
                    </Space>
                )
            }
        ]
    }
    handleAddUser = () => {
        this.setState({ isUserModal: true })
    }
    handleDeleteUser = (user) => {
        confirm({
            title: '确定要删除该用户吗？',
            icon: <ExclamationCircleOutlined />,
            async onOk() {
                const result = await delUser(user.user_id)
                if (result.status === 0) {
                    message.success("删除成功")
                    this.getUserList()
                } else {
                    message.error(result.msg)
                }
            },
            onCancel() {
                console.log('Cancel');
            },
        });

    }
    handleConfirm = (result) => {
        this.setState({ isUserModal: false }, () => result && this.getUserList())
    }
    componentDidMount() {
        this.initColumns();
        this.getUserList()
    }

    getUserList = async () => {
        const { pageSize, pageNumber } = this.state;
        const result = await userList({ pageSize, pageNumber });
        if (result.status === "0") {
            const { count, data, page } = result.data;
            this.setState({
                total: count,
                userList: data,
                pageNumber: page,
                pagination: {
                    defaultPageSize: pageSize,
                    total: count
                }
            })
        }
    }
    render() {
        const { userList, isUserModal, pagination } = this.state;
        const title = (
            <span className="card_title">
                <Button type="primary" style={{ marginRight: '10px' }} onClick={this.handleAddUser}>新增用户</Button>
            </span>
        )
        return (
            <div className="container">
                <Card title={title}>
                    <Table
                        bordered
                        rowKey='user_id'
                        dataSource={userList}
                        columns={this.columns}
                        pagination={pagination}
                    ></Table>
                </Card>

                <AddUser isUserModal={isUserModal} onConfirm={this.handleConfirm} />
            </div>
        )
    }
}