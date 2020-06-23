目录

[TOC]
# 异步 action

# redux 中间件
redux-logger：能够在控制台清晰的展示出，当前redux操作的流程和信息。（原有状态、派发信息、修改后的状态信息）
redux-thunk：处理异步的dispatch派发
redux-promise：在dispatch派发时，支持promise操作，action传递的参数只能是payload。
在store/index.js中：
```javascript
import {createStore, applyMiddleware} from 'redux';
import reduxLogger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import reduxPromise from 'redux-promise';
let store = createStore(reducer, applyMiddleware(reduxLogger, reduxThunk, reduxPromise));
```
使用redux-promise的注意事项：
action-creator中返回的action对象，传递给reducer的action数据（从服务器获取的数据，开始返回的是一个promise）中的属性名必须是`payload（严格区分大小写）`，只有这样，当Promise成功，中间件才会帮我们重新发送一次派发给reducer，然后把获取的数据更新redux容器中的状态（promise必须放到payload属性下才可以）


redux-thunk
redux-promise
redux-saga

# redux 中间件原理