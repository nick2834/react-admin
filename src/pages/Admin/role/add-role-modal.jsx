import React, { Component } from "react";
import { Modal, Form, Input, Button, message } from 'antd';
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
        this.props.onConfirm(false)
    }
    onFinish = async (event) => {
        const { user_id, username } = memoryUtils.user;
        const userObject = { create_user_id: user_id, create_user_name: username }
        const data = Object.assign(event, userObject);
        const result = await addRole(data)
        if (result.status === 0) {
            message.success('添加成功')
            this.props.onConfirm(true)
        } else {
            message.error(result.msg)
            this.props.onConfirm(false)
        }

    }
    componentWillUnmount(){
        console.log("componentWillUnmount")
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
            <Modal title="增加角色" visible={isModalVisible} footer={null} closable={false} destroyOnClose>
                <Form {...layout} onFinish={this.onFinish}>
                    <Form.Item name="role_name" label="角色名" rules={[{ required: true,message:"角色名不能为空" }]}>
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