class Promise {
    constructor(executorCallback) {
        this.status = 'pending';
        this.value = null;
        this.fulfilledAry = [];
        this.rejectedAry = [];
        let resolveFn = result => {
            let timer = setTimeout(() => {
                clearTimeout(timer);
                if (this.status !== 'pending') return;
                this.status='fulfilled';
                this.value = result;
                this.fulfilledAry.forEach(item => item(this.value));
            }, 0);
        };
        let rejectFn = reason => {
            let timer = setTimeout(() => {
                clearTimeout(timer);
                if (this.status !== 'pending') return;
                this.status='rejected';
                this.value = reason;
                this.rejectedAry.forEach(item => item(this.value));
            }, 0);
        };
        try {
            executorCallback(resolveFn, rejectFn);
        } catch (err) {
            rejectFn(err);
        }
    }

    then(fulfilledCallback, rejectedCallback) {
        typeof fulfilledCallback !== 'function' ? fulfilledCallback = result => result : null;
        typeof rejectedCallback !== 'function' ? rejectedCallback = reason => {
            throw new Error(reason instanceof Error ? reason.message : reason);
        } : null;

        return new Promise((resolve, reject) => {
            this.fulfilledAry.push(() => {
                try {
                    let x = fulfilledCallback(this.value);
                    x instanceof Promise ? x.then(resolve, reject) : resolve(x);
                } catch (err) {
                    reject(err);
                }
            });
            this.rejectedAry.push(() => {
                try {
                    let x = rejectedCallback(this.value);
                    x instanceof Promise ? x.then(resolve, reject) : resolve(x);
                } catch (err) {
                    reject(err);
                }
            });
        });

    }

    catch(rejectedCallBack) {
        return this.then(null, rejectedCallBack);
    }

    static all(promiseAry = []) {
        return new Promise((resolve, reject) => {
            let index = 0,
                resultAry = [];
            for (let i = 0; i < promiseAry.length; i++) {
                promiseAry[i].then(val => {
                    index++;
                    resultAry[i] = val;
                    if (index === promiseAry.length) {
                        resolve(resultAry);
                    }
                }, reject);
            }
        });
    }
}