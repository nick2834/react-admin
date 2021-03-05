import React, { Component } from 'react';
import { Modal, Form, Input, Button, Select, Space, message } from 'antd'
import { roleList, addUser } from '@/api';

const { Option } = Select;
class AddUser extends Component {
    state = {
        roleList: [],
        statusList: [
            {
                title: "禁用",
                status: 0
            },
            {
                title: "待审核",
                status: 1
            },
            {
                title: "审核不通过",
                status: 2
            },
            {
                title: "审核通过",
                status: 3
            },
            {
                title: "正常",
                status: 4
            },
        ]
    }
    handleConfirm = (status) => {
        this.props.onConfirm(status)
    }
    onFinish = async(values) => {
        const result = await addUser(values);
        console.log(result)
        if(result.status === 0){
            message.success("添加成功")
            this.props.onConfirm(true)
        }else{
            message.error(result.msg)
        }
    };
    getRoleList = async () => {
        const result = await roleList({ pageSize: 9999 })
        if (result.status === "0") {
            const { data } = result.data;
            this.setState({ roleList: data })
        } else {
            message.error(result.msg)
        }
    }
    componentDidMount() {
        this.getRoleList()
    }
    render() {
        const layout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
        }
        const tailLayout = {
            wrapperCol: { offset: 4, span: 16 },
        }
        const { roleList, statusList } = this.state;
        const { isUserModal } = this.props
        return (
            <Modal visible={isUserModal} footer={null} closable={false} destroyOnClose>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                >
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[{ required: true, message: '请输入用户名' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="邮箱" name="email" >
                        <Input />
                    </Form.Item>
                    <Form.Item label="手机号" name="mobile">
                        <Input />
                    </Form.Item>
                    <Form.Item name="role" label="权限" rules={[{ required: true, message: '请配置权限' }]}>
                        <Select placeholder="请分配用户权限" >
                            {
                                roleList.map((item) => {
                                    return (
                                        <Option key={item.role_id} value={item.role_id}>{item.role_name}</Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item name="status" label="状态" rules={[{ required: true, message: '请配置权限' }]}>
                        <Select placeholder="请选择账号状态" >
                            {
                                statusList.map((item) => {
                                    return (
                                        <Option key={item.status} value={item.status}>{item.title}</Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Space size="middle">
                            <Button type="primary" htmlType="submit">增加</Button>
                            <Button onClick={() => this.props.onConfirm(false)}>取消</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default AddUser