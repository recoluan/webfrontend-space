class Promise {
    constructor(executorCallBack) {
        this.status = 'pending';
        this.value = undefined;
        this.fulfilledAry = [];
        this.rejectedAry = [];

        //=>成功和失败执行的方法
        let resolveFn = result => {
            let timer = setTimeout(() => {
                clearTimeout(timer);
                if (this.status !== 'pending') return;
                this.status = 'fulfilled';
                this.value = result;
                this.fulfilledAry.forEach(item => item(this.value));
            }, 0);
        };
        let rejectFn = reason => {
            let timer = setTimeout(() => {
                clearTimeout(timer);
                if (this.status !== 'pending') return;
                this.status = 'rejected';
                this.value = reason;
                this.rejectedAry.forEach(item => item(this.value));
            }, 0);
        };
        //=>捕获异常
        try {
            executorCallBack(resolveFn, rejectFn);
        } catch (err) {
            //=>有异常信息按照REJECTED状态处理
            rejectFn(err);
        }
    }

    //=>THEN：原型上的方法,供实例调取使用
    then(fulfilledCallBack, rejectedCallBack) {
        //=>then链式调用，每一次都返回一个新的Promise实例，因此不能用return this;
        return new Promise((resolve, reject) => {
            //=>问题1：为什么放在匿名函数里
            this.fulfilledAry.push(() => {
                try {
                    let x = fulfilledCallBack(this.value);
                    x instanceof Promise ? x.then(resolve, reject) : resolve(x);//=>问题2：x.then(resolve, reject)
                } catch (e) {
                    reject(e);
                }
            });
            this.rejectedAry.push(() => {
                try {
                    let x = rejectedCallBack(this.value);
                    x instanceof Promise ? x.then(resolve, reject) : resolve(x);
                } catch (e) {
                    reject(e);
                }
            });
        });
        /*this.fulfilledAry.push(fulfilledCallBack);
        this.rejectedAry.push(rejectedCallBack);*/
    }
}

module.exports = Promise;

/*
let p1 = new Promise((resolve, reject) => {
    console.log(1);
    setTimeout(() => {
       Math.random() < 0.5 ? resolve(100) : reject(-100);
        resolve(100);
    }, 1000);
});
let p2 = p1.then((result) => {
    return result + 100;
}, (reason) => {
    console.log('no', reason);
});
let p3 = p2.then((result) => {
    console.log(result);
}, (reason) => {
    console.log('reason');
});
console.log(3);*/
