class State {
    _data;
    constructor(currentState) {
        this._data = currentState;
    }
}

class Store {
    // 当前的仓库
    state = {};
    // 中间件
    middlewareList = [];
    // 订阅的事件
    callbacks = [];
    constructor(state) {
        this.state = state;
    }

    dispatch(func) {
        return (...args) => {
            func(value => this.setState(value), ...args);
        };
    }

    use(middleware) {
        this.middlewareList.push(middleware);
    }

    enhance(func) {
        return (...args) => {};
    }

    getState() {
        return Object.assign({}, this.state);
    }

    setState(func) {
        // 更加的可控
        let result = func(this.state);
        console.log(this.state);
        this.state = result;
        this.callbacks.forEach(f => f());
    }

    listener(callback) {
        this.callbacks.push(callback);
    }
}

function createStore(...args) {
    return new Store(...args);
}

let store = createStore({
    count: Math.random(),
    total: 100,
    async: 100,
});

store.use(function (state) {});


store.listener(function (){
    console.log(store.getState())
})


let request = store.dispatch(function (setState, ...args) {
    setState(function (oldValue) {
        return {
            nextCount: 1000,
        };
    });
});

request("hello world");


