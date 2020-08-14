class MyPromise {
    callBacks = []
    status = 'pending'
    value = null
    constructor(func) {
        func(
            value => this._resolve(value),
            err => this._reject(err)
        )
    }
    _resolve(value) {
        if (
            value &&
            (typeof value === 'function' || typeof value === 'object')
        ) {
            if (typeof value.then === 'function') {
                value.then(
                    value => this._resolve(value),
                    error => this._reject(error)
                )
                return
            }
        }
        this.status = 'fulfilled'
        this.value = value
        this.callBacks.forEach(f => this._handle(f))
    }
    _reject(error) {
        if (
            error &&
            (typeof error === 'function' || typeof error === 'object')
        ) {
            if (typeof error.then === 'function') {
                error.then(
                    value => this._resolve(value),
                    error => this._reject(error)
                )
                return
            }
        }
        this.status = 'rejected'
        this.value = error
        this.callBacks.forEach(f => this._handle(f))
    }

    then(onfulfilled, onrejected) {
        return new MyPromise((resolve, reject) => {
            this._handle({
                onfulfilled: onfulfilled || null,
                onrejected: onrejected || null,
                resolve: resolve,
                reject: reject,
            })
        })
    }

    catch(onError) {
        return this.then(null, onError)
    }

    _handle(callback) {
        if (this.status === 'pending') {
            this.callBacks.push(callback)
            return
        }

        if (this.status === 'fulfilled') {
            if (!callback.onfulfilled) {
                return callback.resolve(this.value)
            }
            callback.resolve(callback.onfulfilled(this.value))
        }

        if (this.status === 'rejected') {
            if (!callback.onrejected) {
                return callback.reject(this.value)
            }
            callback.reject(callback.onrejected(this.value))
        }
    }

    static resolve(value) {
        console.log('hello world')
    }
    static reject() {}
    static all(promises) {}
    static race(promises) {}
}

// let promise = new MyPromise(resolve => {
//     resolve('hello world')
// })
//     .then(res => {
//         console.log(res)
//         return new MyPromise(resolve => {
//             setTimeout(() => {
//                 resolve('我用双手成就你的梦想')
//             }, 2000)
//         })
//     })
//     .then(res => {
//         console.log(res)
//     })

let promise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        console.log('2s 定时器')
        reject(2000)
    }, 2000)
})
    .then(
        res => {
            console.log(res, 'res1')
            return 'hello '
        }
        // err => {
        //     console.log(err, 'err1')
        //     return new Promise((resolve, reject) => {
        //         reject('success')
        //     })
        // }
    )
    .then(
        res => {
            console.log(res, 'res2')
        }
        // err => {
        //     console.log(err, 'err2')
        // }
    )
    .catch(err => {
        console.log(err, 'catch')
    })

console.log(promise)
