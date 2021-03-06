import React, { Component } from 'react';
import { Card, Button } from "antd";
import { PlusOutlined } from '@ant-design/icons';

export default class ArticlsList extends Component {
    handleAddArticle = () => {
        this.props.history.push('/articles/add')
    }

    render() {
        const title = (
            <span className="card_title">
                <Button type="primary" style={{ marginRight: '10px' }} icon={<PlusOutlined />} onClick={this.handleAddArticle}>新增文章</Button>
            </span>
        )
        return (
            <div className="container">
                <Card title={title}></Card>
            </div>
        )
    }
}