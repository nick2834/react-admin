import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Tabs } from 'antd';
import { connect } from 'react-redux';
import routes from '@/config/defaultMenu'
const { TabPane } = Tabs;

class headerNav extends Component {
    state = {
        navTabs: [
            {
                title: "首页",
                path: "/home"
            }
        ]
    }
    pushMenus = (pathname) => {
        let { navTabs } = this.state;
        const hasOwnPathIndex = navTabs.findIndex(item => item.path === pathname)
        // console.log(hasOwnPathIndex)
        if (hasOwnPathIndex === -1) {
            const tagView = this.addTags(routes, pathname)
            this.setState({
                navTabs: navTabs.concat(...tagView)
            })
        }
    }
    addTags = (routes, pathname) => {
        let tags = [];
        routes.forEach(route => {
            if (route.path === pathname) {
                tags.push({
                    title: route.title,
                    path: route.path
                })
            }
            if (route.children) {
                const tempTags = this.addTags(route.children, pathname)
                if (tempTags.length >= 1) {
                    tags = [...tags, ...tempTags]
                }
            }
        })
        return tags
    }
    componentWillReceiveProps(nextprops) {
        const { location: { pathname } } = nextprops;
        this.path = pathname;
        this.pushMenus(pathname)
    }
    onTabClick = (path) => {
        this.props.history.replace(path)
    }
    onEdit = (path) => {
        const { navTabs } = this.state;
        let tagsFilter = navTabs.filter(tabs => tabs.path !== path)
        this.setState({ navTabs: tagsFilter }, () => {
            let tagsArray = this.state.navTabs
            this.path = tagsArray[tagsArray.length - 1].path;
            console.log(this.path)
            this.props.history.replace(this.path)
        })

    }
    render() {
        let path = this.props.location.pathname;
        const { navTabs } = this.state;
        return (
            <div className="header_nav">
                <Tabs
                    defaultActiveKey={path}
                    activeKey={this.path}
                    type="editable-card"
                    tabBarGutter={8}
                    size="small"
                    hideAdd
                    onChange={this.onTabClick}
                    onEdit={this.onEdit}
                >
                    {
                        navTabs.map(item => {
                            return <TabPane tab={item.title} key={item.path} closable={item.path !== '/home'}></TabPane>
                        })
                    }
                </Tabs>
            </div>
        )
    }
}
export default connect(

)(withRouter(headerNav))
