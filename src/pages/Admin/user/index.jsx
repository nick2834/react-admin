
/*
用户管理
*/
import React, { Component } from 'react';
import { Card, Table, Button, Space, message, Modal, Tag } from 'antd'
import { formatTime } from '@/utils/utils';
import AddUpdateUser from './add-update-user-modal';
import { userList, delUser, selectUser } from '@/api';
import {
    CheckCircleOutlined,
    SyncOutlined,
    CloseCircleOutlined,
    ExclamationCircleOutlined,
    ClockCircleOutlined,
} from '@ant-design/icons';
const { confirm } = Modal
export default class User extends Component {
    state = {
        userList: [],
        pageSize: 10,
        pageNumber: 1,
        loading: true,
        statusList: [
            {
                title: "禁用",
                status: 0,
                color: "warning",
                icon: <ExclamationCircleOutlined />
            },
            {
                title: "待审核",
                status: 1,
                color: "processing",
                icon: <SyncOutlined spin />
            },
            {
                title: "审核不通过",
                status: 2,
                color: "error",
                icon: <CloseCircleOutlined />
            },
            {
                title: "审核通过",
                status: 3,
                color: "default",
                icon: <ClockCircleOutlined />
            },
            {
                title: "正常",
                status: 4,
                color: "success",
                icon: <CheckCircleOutlined />
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
                title: "状态",
                dataIndex: 'status',
                render: (status) => this.statusColumns(status)
            },
            {
                title: "操作",
                dataIndex: 'action',
                render: (_, record) => (
                    <Space size="middle">
                        <Button type="primary" onClick={() => this.handleEditUser(record)}>编辑</Button>
                        <Button type="danger" onClick={() => this.handleDeleteUser(record)}>删除</Button>
                    </Space>
                )
            }
        ]
    }
    statusColumns = (status) => {
        const { statusList } = this.state;
        const { title, color, icon } = statusList.find(item => item.status === status)
        return (
            <Tag icon={icon} color={color}>{title}</Tag>
        )
    }
    handleAddUser = () => {
        this.setState({ initUser: null, isUserModal: true })
    }
    handleEditUser = async (user) => {
        const { statusList } = this.state;
        const initUser = await selectUser(user.user_id);
        console.log(initUser)
        if (initUser.status === 0) {
            const users = initUser.data;
            const { title } = statusList.find(item => item.status === users.status)
            users.statusTitle = title;
            this.setState({ isUserModal: true, initUser: users })
        } else {
            message.msg(initUser.msg)
        }
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
                loading: false,
                pagination: {
                    defaultPageSize: pageSize,
                    total: count
                }
            })
        }
    }
    render() {
        const { userList, isUserModal, pagination, initUser, statusList,loading } = this.state;
        const title = (
            <span className="card_title">
                <Button type="primary" style={{ marginRight: '10px' }} onClick={this.handleAddUser}>新增用户</Button>
            </span>
        )
        return (
            <div className="container">
                <Card title={title}>
                    <Table
                        loading={loading}
                        bordered
                        rowKey='user_id'
                        dataSource={userList}
                        columns={this.columns}
                        pagination={pagination}
                    ></Table>
                </Card>

                <AddUpdateUser isUserModal={isUserModal} onConfirm={this.handleConfirm} initUser={initUser} statusList={statusList} />
            </div>
        )
    }
}