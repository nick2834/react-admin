import React, { Component } from 'react';
import { Card, Button, Table, Breadcrumb, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { categoryList, delCate } from '@/api';
import AddModal from './add-modal'
export default class Category extends Component {
    state = {
        categoryList: [],
        pageSize: 10,
        pageNumber: 1,
        pid: null,
        parentName: '',
        loading: true
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
                width: 250,
                render: (category) => ( // 返回需要显示的界面标签
                    <span>
                        <Button type="link" onClick={() => this.handleEdit(category)}>编辑</Button>
                        {!category.pid ? <Button type="link" onClick={() => this.checkSubCate(category)}>查看子分类</Button> : null}
                        <Button type="link" onClick={() => this.handleDelete(category)}>删除</Button>
                    </span>
                )
            }
        ]
    }
    handleEdit = (category) => {
        console.log(category)
    }
    handleDelete = async (category) => {
        const result = await delCate(category);
        console.log(result)
        if(result.status === "0"){
            message.success('删除成功')
            this.getCategoryList()
        }else{
            message.error(result.msg)
        }
    }
    handleAdd = () => {
        this.setState({ showModal: true })
    }
    checkSubCate = (category) => {
        const { id, name } = category;
        this.setState({ pid: id, parentName: name }, () => {
            this.getCategoryList({ pid: category.id })
        })
    }
    getCategoryList = async (data) => {
        const { pageSize, pageNumber } = this.state;
        const result = await categoryList({ pageSize, pageNumber, data });
        if (result.status === "0") {
            const { count, data, page } = result.data;
            this.setState({
                loading: false,
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
    handleBackCate = () => {
        const { pid } = this.state;
        this.setState({ pid: 0, parentName: "", loading: true }, () => {
            pid && this.getCategoryList()
        })
    }
    componentDidMount() {
        this.initColumns()
        this.getCategoryList()
    }
    onSubmit = (status) => {
        this.setState({ showModal: false }, () => {
            status && this.getCategoryList()
        })
    }
    render() {
        const { loading, categoryList, pid, parentName, showModal } = this.state;
        const title = (
            <Breadcrumb separator=">">
                <Breadcrumb.Item onClick={this.handleBackCate}>一级分类列表</Breadcrumb.Item>
                {pid ? <Breadcrumb.Item>{parentName}</Breadcrumb.Item> : null}
            </Breadcrumb>
        )
        const extra = (
            <Button type='primary' icon={<PlusOutlined />} onClick={this.handleAdd}>添加</Button>
        )
        return (
            <div className="container">
                <Card title={title} extra={extra} style={{ width: '100%' }}>
                    <Table
                        loading={loading}
                        size="small"
                        rowKey="id"
                        bordered
                        columns={this.columns}
                        dataSource={categoryList}
                    />
                </Card>

                {showModal ? <AddModal showModal={showModal} onSubmit={this.onSubmit} /> : null}
            </div >
        )
    }
}