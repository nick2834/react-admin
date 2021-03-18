import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Tabs } from 'antd';
import { connect } from 'react-redux';
import routes from '@/config/defaultMenu';
import { addTagViews, delTagViews } from '@/actions/tags_actions'
const { TabPane } = Tabs;

class headerNav extends Component {
    pushMenus = (pathname) => {
        let { tagsViews } = this.props;
        const hasOwnPathIndex = tagsViews.findIndex(item => item.path === pathname)
        // console.log(hasOwnPathIndex)
        if (hasOwnPathIndex === -1) {
            const tagView = this.addTags(routes, pathname)
            this.props.addTagViews(tagView)
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
        //阻止二次运行
        if (pathname !== this.props.location.pathname) {
            this.path = pathname;
            this.pushMenus(pathname)
        }

    }
    onTabClick = (path) => {
        this.props.history.replace(path)
    }
    onEdit = (path) => {
        this.props.delTagViews(path)
            .then(() => {
                const { tagsViews } = this.props;
                this.path = tagsViews[tagsViews.length - 1].path;
                this.props.history.replace(this.path)
            })
    }
    render() {
        let path = this.props.location.pathname;
        const { tagsViews } = this.props;
        return (
            <div className="header_nav">
                <Tabs
                    defaultActiveKey={path}
                    activeKey={this.path}
                    type="editable-card"
                    tabBarGutter={6}
                    size="small"
                    hideAdd
                    onChange={this.onTabClick}
                    onEdit={this.onEdit}
                >
                    {
                        tagsViews.map(item => {
                            return <TabPane tab={item.title} key={item.path} closable={item.path !== '/home'}></TabPane>
                        })
                    }
                </Tabs>
            </div>
        )
    }
}
export default connect(
    (state) => ({ tagsViews: state.tagsViews }),
    { addTagViews, delTagViews }
)(withRouter(headerNav))
