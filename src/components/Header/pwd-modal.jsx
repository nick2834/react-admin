import React, { Component } from "react";
import { Modal, Form, Input } from 'antd';
import { connect } from 'react-redux'
import { logout } from '@/actions/user_actions'

class PwdModal extends Component {
    formRef = React.createRef();
    constructor(props) {
        super(props)
        this.state = {
            user: null
        }
    }
    confirm = () => {
        const { user } = this.props
        this.formRef.current
            .validateFields()
            .then(async (data) => {
                console.log(user)
                this.props.onSubmit(true)
            }).catch(err => { })
    }
    render() {
        const { isShow } = this.props;
        const layout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
        }
        return (
            <Modal
                title="修改密码"
                visible={isShow}
                onOk={this.confirm}
                onCancel={() => this.props.onSubmit(false)}
            >
                <Form {...layout} ref={this.formRef}>
                    <Form.Item label="原密码" name="password" rules={[{ required: true, message: "请输入原始密码" }]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item label="新密码" name="newPassword" rules={[{ required: true }]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item label="重复密码" name="rePassword" rules={[{ required: true }]}>
                        <Input.Password />
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default connect(
    (state) => ({ users: state.users }),
    { logout }
)(PwdModal)