import React, { Component } from "react";
import { connect } from 'react-redux';
import { Modal, Form, Input, message } from 'antd';
import { addRole } from '@/api';
class AddRole extends Component {
    formRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false
        }
    }
    handleCancel = () => {
        this.props.onConfirm(false)
    }
    onFinish = () => {
        this.formRef.current
            .validateFields()
            .then(async (event) => {
                const { user_id, username } = this.props.users;
                // const data = Object.assign(event, userObject);
                const data = { ...event, create_user_id: user_id, create_user_name: username };
                const result = await addRole(data)
                if (result.status === 0) {
                    message.success('添加成功')
                    this.props.onConfirm(true)
                } else {
                    message.error(result.msg)
                    this.props.onConfirm(false)
                }
            }).catch(err => { })
    }
    render() {
        const { isModalVisible } = this.props;
        const layout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
        }
        return (
            <Modal
                title="增加角色"
                visible={isModalVisible}
                onOk={this.onFinish}
                onCancel={() => this.props.onConfirm(false)}
                destroyOnClose
            >
                <Form {...layout} ref={this.formRef}>
                    <Form.Item name="role_name" label="角色名" rules={[{ required: true, message: "角色名不能为空" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="remark" label="备注：">
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default connect(
    (state) => ({ users: state.users }),
    {}
)(AddRole)