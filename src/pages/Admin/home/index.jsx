import React, { Component } from 'react';
import { connect } from "react-redux";
import { countAddAction } from '../../../actions/count_action'
class Home extends Component {
    constructor(props) {
        super(props)
        console.log(this.props)
    }
    componentDidMount() {
        this.props.dispatch(countAddAction)
    }
    render() {
        return (
            <div className="container">
                home
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    // console.log("state",state) 指向reducers文件夹
    return {
        counter: state.counter
    }
}

// 通过connect连接组件和redux数据,传递state数据和dispatch方法
export default connect(mapStateToProps)(Home)