import React, { Component } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { connect } from 'react-redux'
import Header from '@/components/Header';
import Sidebar from '@/components/sidebar';

import Home from './home';
import Category from './category';
import Articles from './articles';
import Role from './role';
import User from './user';

const { Footer, Content, Sider } = Layout;
class Admin extends Component {
    state = {
        collapsed: false
    }
    toggle = (collapsed) => {
        this.setState({ collapsed });
    };
    render() {
        const users = this.props.users;
        const { collapsed } = this.state;
        if (!users || !users.user_id) {
            return <Redirect to='/login' />
        }
        return (
            <Layout style={{ minHeight: '100%' }}>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <Sidebar />
                </Sider>
                <Layout>
                    <Header collapsed={collapsed} changeToggle={(collapsed) => this.toggle(collapsed)} />
                    <Content style={{ margin: 20 }}>
                        <div className="main_container">
                            <Switch>
                                <Route path='/home' component={Home}></Route>
                                <Route path='/articles' component={Articles}></Route>
                                <Route path='/category' component={Category}></Route>
                                <Route path='/role' component={Role}></Route>
                                <Route path='/user' component={User}></Route>
                                <Redirect to="/home"></Redirect>
                            </Switch>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center', color: '#cccccc' }}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default connect(
    state => ({ users: state.users }),
    {}
)(Admin)