import React, { Component } from 'react';
import { Modal, Form, Input, Switch, Table, message } from 'antd';
import { categoryList, addCate } from '@/api';
export default class AddModal extends Component {
    formRef = React.createRef();
    constructor(props) {
        super(props)
        this.state = {
            isChecked: true,
            categoryList: [],
            pageSize: 10,
            pageNumber: 1,
        }
    }
    initColumns = () => {
        this.columns = [
            {
                title: 'ID',
                dataIndex: 'id'
            },
            {
                title: '分类名称',
                dataIndex: 'name'
            },
        ]
    }
    getCateList = async () => {
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
        this.getCateList()
        this.initColumns()
    }
    onChange = (checked) => {
        this.setState({ isChecked: checked })
    }
    onSelect = (id) => {
        this.setState({ pid: `${id}` })
        this.formRef.current.setFieldsValue({
            pid: `${id}`
        });
    }
    onFinish = () => {
        this.formRef.current
            .validateFields()
            .then(async (data) => {
                const result = await addCate(data)
                console.log(result)
                if (result.status === "0") {
                    message.success("添加成功")
                    this.props.onSubmit(true)
                } else {
                    message.error(result.msg)
                    this.props.onSubmit(false)
                }
            }).catch((info) => {

            });
    }
    render() {
        const { showModal } = this.props
        const { isChecked, pagination, categoryList } = this.state;
        const rowSelection = {
            onChange: (id) => { this.onSelect(id) },
        };
        return (
            <Modal
                title="添加分类"
                visible={showModal}
                onOk={this.onFinish}
                onCancel={() => this.props.onSubmit(false)}
            >
                <Form ref={this.formRef}>
                    <Form.Item label="分类名" name="name" rules={[{ required: true, message: "分类名称不能为空" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="分类描述" name="description">
                        <Input />
                    </Form.Item>
                    <Form.Item label="是否一级分类">
                        <Switch defaultChecked onChange={this.onChange} />
                    </Form.Item>
                    {!isChecked && <Form.Item
                        label="选择父级"
                        name="pid"
                        rules={[{ required: !isChecked ? true : false, message: "父级分类为必选项" }]}>
                        <Table
                            bordered
                            rowKey="id"
                            size="small"
                            dataSource={categoryList}
                            columns={this.columns}
                            pagination={pagination}
                            rowSelection={{
                                type: "radio",
                                ...rowSelection
                            }}
                        />
                    </Form.Item>}
                </Form>
            </Modal>
        )
    }
}