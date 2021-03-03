import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from '@/assets/images/logo.png'
import './login.less';
import { reqLogin } from '@/api';
import memoryUtils from '@/utils/memoryUtils'
import storageUtils from '@/utils/storageUtils'
export default class Login extends Component {
    state = { loadings: false }
    validatorPwd = (rule, value, callback) => {
        if (!value) {
            callback('请输入密码');
        } else if (value.length < 4 || value.length > 12) {
            callback('密码长度需大于4位小于12位');
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            callback('密码必须是英文、数字或下划线组成');
        } else {
            callback();
        }
    }
    onFinish = async (values) => {
        this.setState({ loadings: true })
        const { username, password } = values
        const result = await reqLogin(username, password);
        if (result.status === 0) {
            this.setState({ loadings: false })
            message.success('登陆成功');
            const user = result.data
            memoryUtils.user = user // 保存在内存中
            storageUtils.saveUser(user) // 保存到local中
            this.props.history.replace('/')
        } else { // 登陆失败
            this.setState({ loadings: false })
            // 提示错误信息
            message.error(result.msg)
        }
    }
    render() {
        const { loadings } = this.state;
        const user = memoryUtils.user;
        if (user && user.user_id) {
            return <Redirect to='/' />
        }
        return (
            <div className="login">
                <header className='login-header'>
                    <img src={logo} alt="logo" />
                    <h1>React 项目: 后台管理系统</h1>
                </header>
                <div className="login_content">
                    <h2>用户登录</h2>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                { required: true, message: '用户名不能为空' },
                                { min: 4, max: 12, message: "用户名需在4至12位" },
                                { pattern: /^[a-zA-Z0-9_]+$/, message: "用户名必须是英文、数字或下划线组成" }
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                { validator: this.validatorPwd },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" loading={loadings}>登录</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )

    }
}