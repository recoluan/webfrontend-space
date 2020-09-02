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
        this.fulfilledAry.push(fulfilledCallBack);
        this.rejectedAry.push(rejectedCallBack);
    }
}

module.exports = Promise;

/*
new Promise((resolve, reject) => {
    console.log(1);
    throw new Error('报错了');
    // 1();
}).then((result) => {
    console.log(result, 'result');
}, (reason) => {
    console.log('no',reason, 'reason');
});*/
