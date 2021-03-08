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
    onFinish = async (values) => {
        // const { initUser } = this.props;
        const result = await addUser(values);
        if (result.status === 0) {
            message.success("添加成功")
            this.props.onConfirm(true)
        } else {
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
        const { roleList } = this.state;
        const { isUserModal, initUser, statusList } = this.props;
        return (
            <Modal visible={isUserModal} footer={null} closable={false} destroyOnClose>
                <Form
                    {...layout}
                    name="basic"
                    onFinish={this.onFinish}
                >
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[{ required: true, message: '请输入用户名' }]}
                        initialValue={initUser ? initUser.username : ""}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="邮箱" name="email" initialValue={initUser ? initUser.email : ""}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="手机号" name="mobile" initialValue={initUser ? initUser.mobile : ""}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="role" label="权限" rules={[{ required: true, message: '请配置权限' }]} initialValue={initUser ? initUser.role_id : ""}>
                        <Select placeholder="请分配用户权限" value={initUser ? { key: initUser.role_id, label: initUser.role_name } : null}>
                            {
                                roleList.map((item) => {
                                    return (
                                        <Option key={item.role_id} value={item.role_id}>{item.role_name}</Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item name="status" label="状态" rules={[{ required: true, message: '请配置权限' }]} initialValue={initUser ? initUser.status : ""}>
                        <Select placeholder="请选择账号状态" value={initUser ? { key: initUser.status, label: initUser.statusTitle } : ''}>
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
                            <Button type="primary" htmlType="submit">{initUser ? '编辑' : '增加'}</Button>
                            <Button onClick={() => this.props.onConfirm(false)}>取消</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default AddUser