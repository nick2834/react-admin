```
src
│   README.md
│   app.js
└───store
│   │   index.js
└───actions
│   │   actionsA.js
│   │   actionsB.js
└───reducers
    │   reducerA.js
    │   reducerB.js
    │   index.js
```

### app.js

react-redux Provider 根目录 app.js 连接 store <Provider store={store}></Provider>

```
import { Provider } from 'react-redux'
import store from './store'
ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
```

### store

store/index.js

```
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducers from "../reducers";

const store = createStore(
    rootReducers,
    compose(
        applyMiddleware(...[thunk]), //需要使用的中间件数组
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;

```

### reducerA.js

reducers/reducerA.js

```
const counterReducer = (state = { count: 1 }, action) => {
    switch (action.type) {
        case "COUNT_ADD":
            return {
                ...state,
                count: state.count + 1,
            };
        case "COUNT_MINUS":
            return {
                ...state,
                count: state.count - 1,
            };
        default:
            return state;
    }
};

export default counterReducer;
```

### reducers

reducers/index.js

```
import { combineReducers } from "redux";
import counterReducer from "./counter_reducer";

//合并所有reducer
const rootReducers = combineReducers({
    counter: counterReducer,
});

export default rootReducers;
```

### actions

actions/count_actions.js

```
export const countAddAction = {
    type: "COUNT_ADD",
};

export const countReduceAction = {
    type: "COUNT_REDUCE",
};
```

### page 页面调用

```
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

const mapStateToProps = (state, ownProps) => {counter: state.counter}


// 通过connect连接组件和redux数据,传递state数据和dispatch方法
export default connect(mapStateToProps)(Home)
```
