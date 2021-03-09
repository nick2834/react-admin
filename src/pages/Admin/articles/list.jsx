import React, { Component } from 'react';
import { Card, Button, Table } from "antd";
import { PlusOutlined } from '@ant-design/icons';

export default class ArticlsList extends Component {
    state = {
        articlesList: [
            {
                key: '1',
                name: 'John Brown',
                age: 32,
                address: 'New York No. 1 Lake Park',
            }
        ],
        selectedRowKeys: []
    }
    handleAddArticle = () => {
        this.props.history.push('/articles/add')
    }
    initColmuns = () => {
        this.colmuns = [
            {
                title: '姓名',
                dataIndex: 'name',
            },
            {
                title: '年龄',
                dataIndex: 'age',
            },
            {
                title: '住址',
                dataIndex: 'address',
            },
        ]
    }
    UNSAFE_componentWillMount() {
        this.initColmuns()
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
                        rowKey='key'
                        rowSelection={rowSelection}
                        columns={this.colmuns}
                        dataSource={articlesList}
                    ></Table>
                </Card>
            </div>
        )
    }
}