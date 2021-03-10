import React, { Component } from 'react';
import { Card, Button, Table } from 'antd';
import { PlusOutlined, RightOutlined } from '@ant-design/icons';

import { categoryList } from '@/api'
export default class Category extends Component {
    state = {
        categoryList: [],
        pageSize: 10,
        pageNumber: 1,
        parentId: '0',
        parentName: '',
    }
    initColumns = () => {
        this.columns = [
            {
                title: 'ID',
                dataIndex: 'id', // 显示数据对应的属性名
            },
            {
                title: '分类名称',
                dataIndex: 'name', // 显示数据对应的属性名
            },
            {
                title: '分类描述',
                dataIndex: 'description', // 显示数据对应的属性名
            },
            {
                title: '操作',
                width: 200,
                render: (category) => ( // 返回需要显示的界面标签
                    <span>
                        <Button type="link" onClick={() => this.handleEdit(category)}>编辑</Button>
                    </span>
                )
            }
        ]
    }
    handleEdit = (category) => {
        console.log(category)
    }
    handleClick = () => {

    }
    getCategoryList = async () => {
        const { pageSize, pageNumber } = this.state;
        const result = await categoryList({ pageSize, pageNumber });
        if (result.status === "0") {
            const { count, data, page } = result.data;
            this.setState({
                total: count,
                categoryList: data,
                pageNumber: page,
                pagination: {
                    defaultPageSize: pageSize,
                    total: count
                }
            })
        }
    }
    componentDidMount() {
        this.initColumns()
        this.getCategoryList()
    }
    render() {
        const { categoryList, parentId, parentName } = this.state;
        const title = parentId === '0' ? '一级分类列表' : (
            <span>
                <Button type="link" onClick={this.showCategorys} icon={<RightOutlined />}>一级分类列表</Button>
                <span>{parentName}</span>
            </span>
        )
        // Card的右侧
        const extra = (
            <Button type='primary' icon={<PlusOutlined />}>添加</Button>
        )

        return (
            <div className="container">
                <Card title={title} extra={extra} style={{ width: '100%' }}>
                    <Table
                        size="small"
                        rowKey="id"
                        bordered
                        columns={this.columns}
                        dataSource={categoryList}
                    />
                </Card>
            </div >
        )
    }
}