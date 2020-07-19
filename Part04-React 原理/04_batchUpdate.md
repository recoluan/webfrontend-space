目录

[TOC]

# setState 主流程

![setState](https://user-images.githubusercontent.com/22387652/87865144-13aac680-c9a4-11ea-98cd-389dc398d525.png)




# batchUpdate（批量更新）机制
![isBatchingUpdates](https://user-images.githubusercontent.com/22387652/87865175-8caa1e00-c9a4-11ea-82a8-fbc4b3f726d1.png)

## interactiveUpdates$1
```js
function interactiveUpdates$1(fn, a, b) {
  if (isBatchingInteractiveUpdates) {
    return fn(a, b);
  }
 
  if (!isBatchingUpdates && !isRendering && lowestPendingInteractiveExpirationTime !== NoWork) {
    // Synchronously flush pending interactive updates.
    performWork(lowestPendingInteractiveExpirationTime, false, null);
    lowestPendingInteractiveExpirationTime = NoWork;
  }
  var previousIsBatchingInteractiveUpdates = isBatchingInteractiveUpdates;
  var previousIsBatchingUpdates = isBatchingUpdates;
  isBatchingInteractiveUpdates = true;
  isBatchingUpdates = true;  // 把requestWork中的isBatchingUpdates标识改为true
  try {
    return fn(a, b);
  } finally {
    isBatchingInteractiveUpdates = previousIsBatchingInteractiveUpdates;
    isBatchingUpdates = previousIsBatchingUpdates;
    if (!isBatchingUpdates && !isRendering) {
      performSyncWork();
    }
  }
}

```

## requestWork
```js
function requestWork(root, expirationTime) {
  addRootToSchedule(root, expirationTime);

  if (isRendering) {
    // 生命周期函数 将 isRendering 设置为 true，直接 return
    return;
  }

  if (isBatchingUpdates) {
    // 合成事件 在 interactiveUpdates$1 中把 isBatchingUpdates 设为 true
    if (isUnbatchingUpdates) {
      nextFlushedRoot = root;
      nextFlushedExpirationTime = Sync;
      performWorkOnRoot(root, Sync, false);
    }
    return; // return 到 interactiveUpdates$1 的 try 代码块中的 fn(a, b)（从 dispatchEvent 到 requestWork 的一整个调用栈）
  }

  if (expirationTime === Sync) {
    // 原生事件 走 expirationTime === Sync 这个分支，没有被 return，直接更新
    performSyncWork();
  } else {
    scheduleCallbackWithExpiration(expirationTime);
  }
}

```

# transaction 事务机制
在 React 执行合成事件或者生命周期函数时，会使用一个 Transaction 对象将整个执行过程包裹成一个事务。

Transaction 对象结构如下图所示：
```js
<pre>
 *                       wrappers (injected at creation time)
 *                                      +        +
 *                                      |        |
 *                    +-----------------|--------|--------------+
 *                    |                 v        |              |
 *                    |      +---------------+   |              |
 *                    |   +--|    wrapper1   |---|----+         |
 *                    |   |  +---------------+   v    |         |
 *                    |   |          +-------------+  |         |
 *                    |   |     +----|   wrapper2  |--------+   |
 *                    |   |     |    +-------------+  |     |   |
 *                    |   |     |                     |     |   |
 *                    |   v     v                     v     v   | wrapper
 *                    | +---+ +---+   +---------+   +---+ +---+ | invariants
 * perform(anyMethod) | |   | |   |   |         |   |   | |   | | maintained
 * +----------------->|-|---|-|---|-->|anyMethod|---|---|-|---|-|-------->
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | +---+ +---+   +---------+   +---+ +---+ |
 *                    |  initialize                    close    |
 *                    +-----------------------------------------+
 * 
 </pre>
```

在 Transcation 对象中整个执行分为 **初始化（initialize），执行 和 清理（close）**。

![transcation](https://user-images.githubusercontent.com/22387652/87503042-c96cd100-c695-11ea-9adc-3409cf285dad.png)


# 面试高频题目
1. batchUpdate
