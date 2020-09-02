class Promise {
    constructor(executorCallBack) {
        this.status = 'pending';
        this.fulfilledAry = [];
        this.rejectedAry = [];
        this.value = null;
        let resolveFn = result => {
            let timer = setTimeout(() => {
                clearTimeout(timer);
                if (this.status !== 'pending') return;
                this.status = 'fulfilled';
                this.value = result;
                this.fulfilledAry.forEach((item) => item(this.value));
            }, 0);
        };
        let rejectFn = reason => {
            let timer = setTimeout(() => {
                clearTimeout(timer);
                if (this.status !== 'pending') return;
                this.status = 'rejected';
                this.value = reason;
                this.fulfilledAry.forEach((item) => item(this.value));
            }, 0);
        };
        try {
            executorCallBack(resolveFn, rejectFn);
        } catch (err) {
            rejectFn(err);
        }
    }

    then(fulfilledCallBack, rejectedCallBack) {
        return new Promise((resolve, reject) => {
            this.fulfilledAry.push(() => {

            });
        });
        /*this.fulfilledAry.push(fulfilledCallBack);
        this.rejectedAry.push(rejectedCallBack);*/
    }

}

module.exports = Promise;





