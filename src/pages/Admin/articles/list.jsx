import React, { Component } from 'react';
import { Card, Button, Table } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { articleList } from '@/api';
import { formatTime } from '@/utils/utils';
export default class ArticlsList extends Component {
    state = {
        selectedRowKeys: [],
        articlesList: [],
        pageSize: 10,
        pageNumber: 1,
        loading: true
    }
    handleAddArticle = () => {
        this.props.history.push('/articles/add')
    }
    initColumns = () => {
        this.colmuns = [
            {
                title: 'ID',
                dataIndex: 'id',
            },
            {
                title: '标题',
                dataIndex: 'title',
            },
            {
                title: '发布时间',
                dataIndex: 'create_time',
                render: (create_time) => formatTime(create_time, "YYYY-MM-DD HH:mm:ss")
            },
            {
                title: '状态',
                dataIndex: 'status',
            },
            {
                title: '是否置顶',
                dataIndex: 'top',
            },
        ]
    }
    getArticlesList = async (data) => {
        const { pageSize, pageNumber } = this.state;
        const result = await articleList({ pageSize, pageNumber, data });
        if (result.status === "0") {
            const { count, data, page } = result.data;
            this.setState({
                loading: false,
                total: count,
                articlesList: data,
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
        this.getArticlesList()
    }
    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
    render() {
        const { articlesList, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        }
        const title = (
            <span className="card_title">
                <Button type="primary" style={{ marginRight: '10px' }} icon={<PlusOutlined />} onClick={this.handleAddArticle}>新增文章</Button>
            </span>
        )
        return (
            <div className="container">
                <Card title={title}>
                    <Table
                        bordered
                        rowKey='id'
                        rowSelection={rowSelection}
                        columns={this.colmuns}
                        dataSource={articlesList}
                    ></Table>
                </Card>
            </div>
        )
    }
}