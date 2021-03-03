import React, { Component } from "react";
import { Modal, Form, Input, Button } from 'antd';
import { addRole } from '@/api';
import memoryUtils from '@/utils/memoryUtils';
export default class AddRole extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false
        }
    }
    handleCancel = () => {
        this.props.onClose(false)
    }
    onFinish = async (event) => {
        const { user_id, username } = memoryUtils.user;
        const userObject = { create_user_id: user_id, create_user_name: username }
        const data = Object.assign(event, userObject);
        console.log(data)
        const result = await addRole(data)
        console.log(result)
        this.props.onConfirm(true)
    }
    render() {
        const { isModalVisible } = this.props;
        const layout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
        }
        const tailLayout = {
            wrapperCol: { offset: 8, span: 16 },
        }
        return (
            <Modal title="增加角色" visible={isModalVisible} footer={null} closable={false}>
                <Form {...layout} onFinish={this.onFinish}>
                    <Form.Item name="role_name" label="角色名" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="remark" label="备注：">
                        <Input />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>增加</Button>
                        <Button htmlType="button" onClick={this.handleCancel}>
                            取消
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}