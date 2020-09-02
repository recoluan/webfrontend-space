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

    //=>THEN
    then(fulfilledCallBack, rejectedCallBack) {
        //=>处理不传递的状况
        typeof fulfilledCallBack !== 'function' ? fulfilledCallBack = result => result : null;
        typeof rejectedCallBack !== 'function' ? rejectedCallBack = reason => {
            throw new Error(reason instanceof Error ? reason.message : reason);
        } : null;

        return new Promise((resolve, reject) => {
            this.fulfilledAry.push(() => {
                try {
                    let x = fulfilledCallBack(this.value);
                    x instanceof Promise ? x.then(resolve, reject) : resolve(x);
                } catch (err) {
                    reject(err);
                }
            });
            this.rejectedAry.push(() => {
                try {
                    let x = rejectedCallBack(this.value);
                    x instanceof Promise ? x.then(resolve, reject) : resolve(x);
                } catch (err) {
                    reject(err);
                }
            });
        });
    }

    //=>CATCH
    catch(rejectedCallBack) {
        return this.then(null, rejectedCallBack);
    }

    //=>STATIC ALL
    static all(promiseAry = []) {//=>Promise.all()
        return new Promise((resolve, reject) => {
            let index = 0,//=>记录成功的次数
                resultAry = [];//=>存储成功的结果
            for (let i = 0; i < promiseAry.length; i++) {
                //=>promiseAry[i]需要处理的每一个Promise实例
                promiseAry[i].then(val => {
                    index++;
                    resultAry[i] = val;//=>不能使用push
                    if (index === promiseAry.length) {
                        resolve(resultAry);
                    }
                }, reject);
            }
        });
    }
}

module.exports = Promise;

/*
let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(100);
    }, 50);
});

let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(200);
    }, 10);
});

let p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(300);
    }, 80);
});

Promise.all([p1, p2, p3]).then(result => {
    //=>所有的PROMISE都成功执行,RESULT中分别存储每一个实例返回的结果，而且和数组中的顺序是一样的
    console.log(result);
}).catch(reason => {
    //=>只要有有一个失败，就执行这个方法，失败后不再执行后面的操作
    console.log(reason);
});*/
