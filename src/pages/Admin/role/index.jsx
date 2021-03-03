import React, { Component } from 'react';
/*
角色管理
*/
import { Card, Button, Table } from 'antd';
import { roleList } from '@/api';
import moment from 'moment'
export default class Role extends Component {
    state = {
        pageSize: 10,
        pageNumber: 1,
        roles: [],
        role: []
    }

    initColumns = () => {
        this.columns = [
            {
                title: "角色名称",
                dataIndex: 'role_name'
            },
            {
                title: "备注",
                dataIndex: 'remark'
            },
            {
                title: "创建人",
                dataIndex: 'create_user_id'
            },
            {
                title: "创建时间",
                dataIndex: 'create_time',
                render: (create_time) => moment(create_time).format("YYYY-MM-DD HH:mm:ss")
            }
        ]
    }
    onRow = (role) => {
        return {
            onClick: event => {
                this.setState({ role })
            }
        }
    }
    getRoleList = async () => {
        const { pageSize, pageNumber } = this.state;
        const result = await roleList({ pageSize, pageNumber });
        if (result.status === "0") {
            const { count, data, page } = result.data;
            this.setState({
                total: count,
                roles: data,
                pageNumber: page,
                pagination: {
                    defaultPageSize: pageSize,
                    total: count
                }
            })
        }
    }
    handleTableChange = (pagination) => {
        this.setState({ pageNumber: pagination.current }, () => {
            this.getRoleList()
        })

    }
    UNSAFE_componentWillMount() {
        this.initColumns()
    }
    componentDidMount(){
        this.getRoleList()
    }
    render() {
        const { roles, pagination, role } = this.state;
        const title = (
            <span className="card_title">
                <Button type="primary" style={{ marginRight: '10px' }}>创建角色</Button>
                <Button disabled>设置角色权限</Button>
            </span>
        )
        const rowSelection = {
            type: 'radio',
            selectedRowKeys: [role.role_id],
            onSelect: (role) => { // 选择某个radio时回调
                this.setState({ role })
            }
        }
        return (
            <Card title={title}>
                <Table
                    bordered
                    rowKey='role_id'
                    dataSource={roles}
                    columns={this.columns}
                    rowSelection={rowSelection}
                    onRow={(record) => this.onRow(record)}
                    pagination={pagination}
                    onChange={this.handleTableChange}
                ></Table>
            </Card >
        )
    }
}