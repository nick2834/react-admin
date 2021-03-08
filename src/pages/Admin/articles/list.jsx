import React, { Component } from 'react';
import { Card, Button, Table } from "antd";
import { PlusOutlined } from '@ant-design/icons';

export default class ArticlsList extends Component {
    state = {
        articlesList: []
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
    componentDidMount() {
        this.initColmuns()
    }
    render() {
        const { articlesList } = this.state;
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
                        columns={this.colmuns}
                        dataSource={articlesList}
                    ></Table>
                </Card>
            </div>
        )
    }
}