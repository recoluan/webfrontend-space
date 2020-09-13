目录

[TOC]


# createStore
```js
/**
 * @params ;reducer函数
 * @return
 *   store：{
 *      getState,
 *      dispatch,
 *      subscribe
 *  }
 */
function createStore(reducer) {
    //=>创建一个store：state用来存储管理的状态信息，listenAay用来存储时间池中的方法
    /*
    * state不用设置初始值：因为第一次dispatch执行reducer，state没有值，走的是reducer中赋值的默认值，自己在创建容器时就把dispatch执行一次
    * 只有执行subcribe，listenAry才有方法
    *
    * */
    let state,
        listenAry = [];

    //=>dispatch：基于dispatch实现任务派发
    function dispatch(action) {
        //=>1.执行reducer，修改容器中的状态信息（接收reducer的返回值，把返回的信息替换原有的state），需要注意的是，我们是把返回值全部替换state，所有要求reducer中在修改状态之前，要先把原始状态信息克隆一份，再进行单个的属性修改
        state = reducer(state, action);
        //=>2.容器中状态信息经过修改之后，通知事件池中的方法执行
        for (let i = 0; i < listenAry.length; i++) {
            let item = listenAry[i];
            if (typeof item === 'function') {
                item();
            } else {
                listenAry.splice(i, 1);
                i--;
            }
        }
    }

    //=>getState：获取状态中的信息
    function getState() {
        //=>1.需要保证返回的状态信息不能和容器中的state是同一个堆内存（否则外面获取状态信息后直接就可以修改，这不符合dispatch->reducer修改状态的流程）
        //{...state}浅克隆
        return JSON.parse(JSON.stringify(state));//=>深度克隆
    }

    //=>subscribe：向事件池中追加方法
    function subscribe(fn) {
        //=>1.向事件池中追加方法
        let isExit = listenAry.includes(fn);//=>重复验证
        !isExit ? listenAry.push(fn) : null;
        //=>2.返回一个方法：执行返回的方法，会把当前绑定的方法，从事件池移除
        return function unsubscribe() {
            let index = listenAry.indexOf(fn);
            // listenAry.splice(index, 1);//=>可能会引发数组塌陷
            listenAry[index] = null;
        }

    }

    dispatch({type: '$$INIT_DEFAULT_STATE'});//=>创建容器时，执行一次dispatch，目的是把reducer中的默认状态值赋值给redux容器中的状态

    return {
        getState,
        dispatch,
        subscribe
    };
}

//=>用法
let reducer = (state = {}, action) => {
    //=>state：原有状态信息
    //=>action：派发任务时传递的行为对象
    switch (action.type) {
        //=>根据type执行不同的state修改操作
        case TYPE.XXX:
            state = {...state, n: state.n + 1}
    }
    return state;//=>返回的state会替换原有的state
};
let store = createStore(reducer);//=>create时，把reducer传递进来，但是此时reducer并没有执行，只有dispatch时才执行，通过执行reducer修改容器中的状态
//store.dispatch({type:'xxx'});
```

# combineReducers
```js
/*
* 合并reducer的方法
*   @params：对象，对象中包含了每一个板块对象的reducer => {xxx: function reducer ...}
*   @return：返回的是一个新的reducer函数（把这个值赋值给createStore）
* 特殊处理：合并reducer之后，redux容器中的state也变为以对应对象管理的模式 => {xxx: function reducer ...}
* */
function combineReducers(reducers) {
    //=>reducers：传递进来的reducer对象集合
    /*
     * {
     *    vote:function vote(state={n:0,m:0},action){... return state;},
     *    personal:function personal(state={baseInfo:''},action){... return state;}
     *    ...
     * }
     */
    return function reducer(state = {}, action) {
        //=>dispatch派发执行时，执行的是返回的reducer，这里也要返回一个最终的state对象，替换原有的state，而且这个state中需要包含每个模块的状态信息 =>{vote:...,personal:...}
        //=>reducer合并：其实就是dispatch派发时，把每一个模块的reducer都单独执行一遍，把每一个模块返回的状态最后汇总在一起，替换容器中的状态信息
        let newState = {};
        for (let key in reducers) {
            if (!reducers.hasOwnProperty(key)) break;
            //=>reducers[key]：每个模块对应的reducer
            //=>state[key]：当前模块在redux容器中存储的状态信息
            newState[key] = reducers[key](state[key], action);
        }
        return newState;
    }
}

```

# 常见面试题（无）

