/**
 * 总入口
 */
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux'
import App from './App';
import './styles/index.less';

import store from './store'


//App组件标签渲染
ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)