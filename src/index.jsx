/**
 * 总入口
 */
import React from 'react';
import ReactDom from 'react-dom';
import storageUtils from './utils/storageUtils'
import memoryUtils from './utils/memoryUtils';
import App from './App';
import './styles/index.less';


// 读取local中保存user, 保存到内存中
const user = storageUtils.getUser()
memoryUtils.user = user


//App组件标签渲染
ReactDom.render(<App />, document.getElementById('root'))