// const target = {}

// const proxy = new Proxy(target, {})

// console.log((target.name = 10))
// console.log(target.name)

// 内部方法	Handler 方法	何时触发
// [[Get]]	get	读取属性
// [[Set]]	set	写入属性
// [[HasProperty]]	has	in 操作符
// [[Delete]]	deleteProperty	delete 操作符
// [[Call]]	apply	函数调用
// [[Construct]]	construct	new 操作符
// [[GetPrototypeOf]]	getPrototypeOf	Object.getPrototypeOf
// [[SetPrototypeOf]]	setPrototypeOf	Object.setPrototypeOf
// [[IsExtensible]]	isExtensible	Object.isExtensible
// [[PreventExtensions]]	preventExtensions	Object.preventExtensions
// [[DefineOwnProperty]]	defineProperty	Object.defineProperty, Object.defineProperties
// [[GetOwnProperty]]	getOwnPropertyDescriptor	Object.getOwnPropertyDescriptor, for..in, Object.keys/values/entries
// [[OwnPropertyKeys]]	ownKeys	Object.getOwnPropertyNames, Object.getOwnPropertySymbols, for..in, Object/keys/values/entries

// let numbers = []

// numbers = new Proxy(numbers, {
//     get(target, prop, receiver) {
//         console.log(target, prop, receiver)
//         // return 'hello'
//     },
//     set(target, prop, value, receiver) {
//         if (typeof prop === 'number') {
//             target[prop] = value
//             return true
//         } else {
//             return false
//         }
//         // console.log(target,prop,value,receiver)
//         // target[prop] = value
//         // return true
//     },
// })

// numbers.push(1)

// 代理应该在所有地方都完全替代目标对象。目标对象被代理后，任何人都不应该再引用目标对象。否则很容易搞砸。

// 1. 当前的操作触发 "0" 1 的添加
// 2. 然后是length的变化
let numbers = []

numbers = new Proxy(numbers, {
    // (*)
    set(target, prop, val) {
        // 拦截写入属性操作
        // console.log(prop, val)
        if (typeof val == 'number') {
            target[prop] = val
            return true
        } else {
            return false
        }
    },
})
// numbers.push(1); // 添加成功
numbers.push(2) // 添加成功

/**
 * 使用 “ownKeys” 和 “getOwnPropertyDescriptor” 进行迭代
 */

// Object.getOwnPropertyNames(obj) 返回非 Symbol 键。

// Object.getOwnPropertySymbols(obj) 返回 Symbol 键。

// Object.keys/values() 返回带有 enumerable 标志的非 Symbol 键/值

// for..in 循环遍历所有带有 enumerable 标志的非 Symbol 键，以及原型对象的键。

let target = {
    name: 'John',
    age: 30,
    _password: '***',
}

// target = new Proxy(target, {
//     ownKeys(target) {
// 		// 如果直接引用外层的target 然后调用Object.keys() 这样又会调用ownKeys()
//         return Object.keys(target).filter(key => !key.startsWith('_'))
//     },
// })

// for(const key in target) {
// 	console.log(key)
// }

let user = {
    name: 'big',
    hasKey() {
        // console.log(this.name)
    },
}

let proxy = new Proxy(user, {
    get(target, prop, receiver) {
        // console.log(target, prop, receiver)
        return target[prop]
    },
    ownKeys(target) {
        return ['a', 'b', 'c']
    },
    getOwnPropertyDescriptor(target, prop, value) {
        // console.log(target, prop)
        return {
            enumerable: true,
            configurable: true,
            writable: true,
        }
    },
})
// 这里为什么会是空呢 ？原因很简单：Object.keys 仅返回带有 enumerable 标志的属性。为了检查它，该方法会对每个属性调用内部方法 [[GetOwnProperty]] 来获取 它的描述符（descriptor
// console.log(Object.keys(user))
// user.name = 10
proxy.hasKey()

// 为什么使用 Reflect 这个东西

// user = {
//     _name: 'big',
//     get name() {
//         return this._name
//     },
// }

// // let admin = {
// //     _name: '张',
// //     __proto__: user,
// // }
// // console.log(admin)
// let userProxy = new Proxy(user, {
//     get(target, prop, receiver) {
//         console.log(target, prop, receiver)
//         return target[prop]
//     },
// })

// let admin = {

//     __proto__: userProxy,
// 	_name: '张',
// }

// console.log(admin)

user = {
    _name: 'Guest',
    get name() {
        return this._name
    },
}
let current = null
let userProxy = new Proxy(user, {
    get(target, prop, receiver) {
		return Reflect.get(target, prop,receiver)
    },
})

let admin = {
    __proto__: userProxy,
    _name: 'Admin',
}

// console.log(admin)
// console.log(current)

// 期望输出：Admin

// alert(admin.name) // 输出：Guest (?!?)
