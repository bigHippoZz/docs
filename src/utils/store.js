class Store {
    // 当前的仓库
    state = {};
    // 中间件
    middlewareList = [];

    constructor(state) {
        this.state = state;
    }

    dispatch(func) {
        return (...args) => {
            func(this.state, ...args);
        };
    }

    use(middleware) {
        this.middlewareList.push(middleware);
    }

    commit() {}

    enhance(func) {
        return (...args) => {};
    }

    getState() {
        return Object.assign({}, this.state);
    }

    setState() {
        // 更加的可控
    }

    listener(){}
}



function createStore(...args) {
    return new Store(...args);
}


let store = createStore({
    count: Math.random(),
});


store.use(function (ctx, next) {
    return false;
});


store.listener("action", function (newVal, oldVale) {
    return false;
});


let requestAnimationFrame = store.dispatch(function (setState, ...args) {
    setState();
    // 变更数据
});


console.log(store);

// 事件驱动
