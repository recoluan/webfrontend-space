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
    }

    //=>CATCH
    catch(rejectedCallBack) {
        return this.then(null, rejectedCallBack);
    }
}

module.exports = Promise;


/*let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(100);
    }, 1000);
});
let p2 = p1.then(result => {
    return result + 100;
});
let p3 = p2.then(null,reason=>{
    console.log(reason);
});
p3.then(result => {
    console.log(result,'p3');
});*/

/*let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        // Math.random() < 0.5 ? resolve(100) : reject(-100);
        resolve(100);
    }, 1000);
});

let p2 = p1.then(result => {
    throw new Error('ERROR');
    return result + 100;
});

let p3 = p2.then(null);

p3.then(result => {
    console.log(result);
}, reason => {
    console.log(1, reason);
}).catch(reason => {
    console.log(2, reason);
});

console.log(3);*/