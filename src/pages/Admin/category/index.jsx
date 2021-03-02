import React, { Component } from 'react';
import { Card, Button, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
const data = [];
for (let i = 0; i < 5; i++) {
    data.push({
        key: i,
        name: `Edward King ${i}`,
    });
}
export default class Category extends Component {
    initColumns = () => {
        this.columns = [
            {
                title: '分类的名称',
                dataIndex: 'name', // 显示数据对应的属性名
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
    render() {
        this.initColumns()
        return (
            <div className="container">
                <Card title="分类列表" extra={<Button type="primary" onClick={this.handleClick} icon={<PlusOutlined />}>添加分类</Button>} style={{ width: '100%' }}>
                    <Table size="small" bordered columns={this.columns} dataSource={data} />
                </Card>
            </div>
        )
    }
}