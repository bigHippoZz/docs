<template>
  <div class="titles">
    <div class="title">
      <img src="https://via.placeholder.com/200x150" />
      <h2>30 Seconds of CSS</h2>
    </div>
    <div class="title">
      <img src="https://via.placeholder.com/200x150" />
      <h2>30 Seconds of CSS</h2>
    </div>
    <div class="title">
      <img src="https://via.placeholder.com/200x150" />
      <h2>30 Seconds of CSS</h2>
    </div>
  </div>
</template>
<script>
import { inject, ref } from "vue";

import "../utils/promise";
export default {
  name: "Images",
  setup() {
    // let imagesRef = ref(false);
    // const InjectObject = inject("provide", {});
    // let handler = InjectObject(imagesRef);
    // console.log(handler,'handler'
    // let isFunction = (target) => typeof target === "function";

    // 判断变量否为function
    const isFunction = (variable) => typeof variable === "function";
    // 定义Promise的三种状态常量
    const PENDING = "PENDING";
    const FULFILLED = "FULFILLED";
    const REJECTED = "REJECTED";

    class MyPromise {
      constructor(handle) {
        if (!isFunction(handle)) {
          throw new Error("MyPromise must accept a function as a parameter");
        }
        // 添加状态
        this._status = PENDING;
        // 添加状态
        this._value = undefined;
        // 添加成功回调函数队列
        this._fulfilledQueues = [];
        // 添加失败回调函数队列
        this._rejectedQueues = [];
        // 执行handle
        try {
          handle(this._resolve.bind(this), this._reject.bind(this));
        } catch (err) {
          this._reject(err);
        }
      }
      // 添加resovle时执行的函数
      _resolve(val) {
        const run = () => {
          if (this._status !== PENDING) return;
          // 依次执行成功队列中的函数，并清空队列

          console.log(this._fulfilledQueues);
          const runFulfilled = (value) => {
            let cb;

            while ((cb = this._fulfilledQueues.shift())) {
              cb(value);
            }
          };
          // 依次执行失败队列中的函数，并清空队列
          const runRejected = (error) => {
            let cb;
            while ((cb = this._rejectedQueues.shift())) {
              cb(error);
            }
          };
          /* 如果resolve的参数为Promise对象，则必须等待该Promise对象状态改变后,
          当前Promsie的状态才会改变，且状态取决于参数Promsie对象的状态
        */
          if (val instanceof MyPromise) {
            val.then(
              (value) => {
                this._value = value;
                this._status = FULFILLED;
                runFulfilled(value);
              },
              (err) => {
                this._value = err;
                this._status = REJECTED;
                runRejected(err);
              }
            );
          } else {
            this._value = val;
            this._status = FULFILLED;
            runFulfilled(val);
          }
        };
        // 为了支持同步的Promise，这里采用异步调用
        setTimeout(run, 0);
      }
      // 添加reject时执行的函数
      _reject(err) {
        if (this._status !== PENDING) return;
        // 依次执行失败队列中的函数，并清空队列
        const run = () => {
          this._status = REJECTED;
          this._value = err;
          let cb;
          while ((cb = this._rejectedQueues.shift())) {
            cb(err);
          }
        };
        // 为了支持同步的Promise，这里采用异步调用
        setTimeout(run, 0);
      }
      // 添加then方法
      then(onFulfilled, onRejected) {
        const { _value, _status } = this;
        // 返回一个新的Promise对象
        return new MyPromise((onFulfilledNext, onRejectedNext) => {
          // 封装一个成功时执行的函数
          let fulfilled = (value) => {
            try {
              if (!isFunction(onFulfilled)) {
                onFulfilledNext(value);
              } else {
                let res = onFulfilled(value);
                if (res instanceof MyPromise) {
                  // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
                  res.then(onFulfilledNext, onRejectedNext);
                } else {
                  //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
                  onFulfilledNext(res);
                }
              }
            } catch (err) {
              // 如果函数执行出错，新的Promise对象的状态为失败
              onRejectedNext(err);
            }
          };
          // 封装一个失败时执行的函数
          let rejected = (error) => {
            try {
              if (!isFunction(onRejected)) {
                onRejectedNext(error);
              } else {
                let res = onRejected(error);
                if (res instanceof MyPromise) {
                  // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
                  res.then(onFulfilledNext, onRejectedNext);
                } else {
                  //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
                  onFulfilledNext(res);
                }
              }
            } catch (err) {
              // 如果函数执行出错，新的Promise对象的状态为失败
              onRejectedNext(err);
            }
          };
          switch (_status) {
            // 当状态为pending时，将then方法回调函数加入执行队列等待执行
            case PENDING:
              this._fulfilledQueues.push(fulfilled);
              this._rejectedQueues.push(rejected);
              break;
            // 当状态已经改变时，立即执行对应的回调函数
            case FULFILLED:
              fulfilled(_value);
              break;
            case REJECTED:
              rejected(_value);
              break;
          }
        });
      }
      // 添加catch方法
      catch(onRejected) {
        return this.then(undefined, onRejected);
      }
      // 添加静态resolve方法
      static resolve(value) {
        // 如果参数是MyPromise实例，直接返回这个实例
        if (value instanceof MyPromise) return value;
        return new MyPromise((resolve) => resolve(value));
      }
      // 添加静态reject方法
      static reject(value) {
        return new MyPromise((resolve, reject) => reject(value));
      }
      // 添加静态all方法
      static all(list) {
        return new MyPromise((resolve, reject) => {
          /**
           * 返回值的集合
           */
          let values = [];
          let count = 0;
          for (let [i, p] of list.entries()) {
            // 数组参数如果不是MyPromise实例，先调用MyPromise.resolve
            this.resolve(p).then(
              (res) => {
                values[i] = res;
                count++;
                // 所有状态都变成fulfilled时返回的MyPromise状态就变成fulfilled
                if (count === list.length) resolve(values);
              },
              (err) => {
                // 有一个被rejected时返回的MyPromise状态就变成rejected
                reject(err);
              }
            );
          }
        });
      }
      // 添加静态race方法
      static race(list) {
        return new MyPromise((resolve, reject) => {
          for (let p of list) {
            // 只要有一个实例率先改变状态，新的MyPromise的状态就跟着改变
            this.resolve(p).then(
              (res) => {
                resolve(res);
              },
              (err) => {
                reject(err);
              }
            );
          }
        });
      }
      finally(cb) {
        return this.then(
          (value) => MyPromise.resolve(cb()).then(() => value),
          (reason) =>
            MyPromise.resolve(cb()).then(() => {
              throw reason;
            })
        );
      }
    }

    // let _promise = new MyPromise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve(1000);
    //   }, 2000);
    // })
    //   .then((res) => {
    //     return new MyPromise((resolve, reject) => {
    //       setTimeout(() => {
    //         resolve(res * 2);
    //       }, 3000);
    //     });
    //   })
    //   .then(console.log);
    return;
    class oneselfPromise {
      // 成功的回调
      resolve(state) {
        let run = () => {
          if (this.status !== "busy") return;
          this.status = "success";
          this.value = state;
          console.log(this.value, "this.value");
          // this.status = "success";
          // console.log(state, "resolve state");
          //  依次执行
          this.onResolveCallback.forEach((fn) => fn());
        };
        setTimeout(run, 0);
      }
      // 失败的回调
      reject(errState) {
        let run = () => {
          if (this.status !== "busy") return;
          this.status = "fail";
          this.value = errState;
          this.onRejectCallback.forEach((fu) => fn());
        };
        // console.log(errState, "errstate");

        setTimeout(run, 0);
      }
      constructor(func) {
        // 判断是不是函数

        if (!isFunction(func)) throw new Error(" this cb is not function  ");
        // 最终的结果
        this.value = "";
        // 当前的状态 successs fail busy
        this.status = "busy";

        // 成功的集合
        this.onResolveCallback = [];
        // 失败的集合
        this.onRejectCallback = [];

        try {
          func(
            (state) => this.resolve(state),
            (errState) => this.reject(errState)
          );
        } catch (error) {
          console.log(error);
          this.reject(error);
        }
      }

      then(successCb, errCb = () => {}) {
        return new oneselfPromise((resolveNext, rejectNext) => {
          if (this.status === "busy") {
            this.onRejectCallback.push(resolveNext);
            this.onRejectCallback.push(rejectNext);
          }
        });
        // if (this.status === "busy") {
        //   this.onResolveCallback.push(successCb);
        //   this.onRejectCallback.push(errCb);
        // }

        // if (this.status === "success") {
        //   successCb(this.value);
        // }

        // if (this.status === "fail") {
        //   errCb(this.value);
        // }
        // if (this.status === "busy") {
        //   this.onResolveCallback.push(() => handler(this.value));
        // }
      }
    }

    let promise = new oneselfPromise((resolve, reject) => {
      resolve("hello world");
    }).then((result) => {
      console.log(result);
    });
  },
};
</script>
<style lang="less" scoped>
.titles {
  font-size: 0;
  width: 600px;
  margin: 0 auto;
  .title {
    display: inline-block;
    width: calc(600px / 3);
    h2 {
      font-size: 20px;
    }
  }
}
</style>
