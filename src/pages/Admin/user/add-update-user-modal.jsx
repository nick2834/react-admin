import React, { Component } from 'react';
import { Modal, Form, Input, Select, message } from 'antd'
import { roleList, addUser } from '@/api';

const { Option } = Select;
class AddUser extends Component {
    formRef = React.createRef();
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
    onFinish = () => {
        this.formRef.current
            .validateFields()
            .then(async (data) => {
                const result = await addUser(data);
                if (result.status === 0) {
                    message.success("添加成功")
                    this.props.onConfirm(true)
                } else {
                    message.error(result.msg)
                }
            })
        return

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
        const { roleList } = this.state;
        const { isUserModal, initUser, statusList } = this.props;
        return (
            <Modal
                visible={isUserModal}
                title={initUser ? '用户编辑' : '新增用户'}
                destroyOnClose
                cancelText="取消"
                okText={initUser ? '编辑' : '增加'}
                onOk={this.onFinish}
                onCancel={() => this.props.onConfirm(false)}
            >
                <Form
                    {...layout}
                    name="basic"
                    ref={this.formRef}
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
                    <Form.Item name="status" label="状态" rules={[{ required: true, message: '请配置账号状态' }]} initialValue={initUser ? initUser.status : ""}>
                        <Select placeholder="请选择账号状态" value={initUser ? { key: initUser.status, label: initUser.statusTitle } : null}>
                            {
                                statusList.map((item) => {
                                    return (
                                        <Option key={item.status} value={item.status}>{item.title}</Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default AddUser