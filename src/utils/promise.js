class myPromise {
    value = null
    callbacks = []
    constructor(func) {
        this.status = 'pending'
        func(value => this._resolve(value))
    }
    then(onfulfilled) {
        // this.callbacks.push(onfulfilled)

        return new myPromise((resolve, reject) => {
            // 处理状态
            this._handle({
                resolve,
                onfulfilled: onfulfilled || null,
            })
        })
    }
    _resolve(value) {
        // if (value && (typeof value === 'object' || typeof value === 'function')) {
        //     var then = value.then;
        //     if (typeof then === 'function') {
        //         then.call(value, this._resolve.bind(this));
        //         return;
        //     }
        // }
        if (
            value &&
            (typeof value === 'object' || typeof value === 'function')
        ) {
            if (typeof value.then === 'function') {
                value.then(value => this._resolve(value))
                return
            }
        }
        this.status = 'fulfilled'
        this.value = value
        this.callbacks.forEach(f => this._handle(f))
    }

    _handle(callback) {
        if (this.status === 'pending') {
            return this.callbacks.push(callback)
        }
        // if(!callback.onfulfilled){
        // }
        let nextresult = callback.onfulfilled(this.value)
        callback.resolve(nextresult)
    }
}

let promise = new myPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(1000)
    }, 2000)
})
    .then(res => {
        console.log('res1', res)
        return new myPromise(resolve => {
            setTimeout(() => {
                resolve(2000)
            }, 2000)
        })
    })
    .then(res => {
        console.log('res2', res)
    })

