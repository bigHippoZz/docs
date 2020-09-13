const randomString = () =>
    Math.random().toString(36).substring(7).split("").join(".");

const ActionTypes = {
    INIT: `@@redux/INIT${randomString()}`,
    REPLACE: `@@redux/REPLACE${randomString()}`,
    PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${randomString()}`,
};

function isPlainObject(object) {
    if (typeof object !== "object" || object === null) return false;
    let proto = object;
    while (Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(object) === proto;
}
const compose = (...funcs) => {
    if (funcs.length === 0) {
        return val => val;
    }
    if (funcs.length === 1) {
        return funcs[0];
    }
    return funcs.reduce((a, b) => (...args) => a(b(...args)));
};
isPlainObject({});
function createStore(reducer, preloadedState, enhancer) {
    let currentReducer = reducer;
    let currentState = preloadedState;
    let currentListeners = [];
    let nextListeners = currentListeners;
    let isDispatching = false; //判断当前是不是有dispatch触发

    function ensureCanMutateNextListeners() {
        if (nextListeners === currentListeners) {
            nextListeners = currentListeners.slice();
        }
    }

    function dispatch(action) {
        if (isDispatching) {
            throw new Error("不能再reducer中使用dispatch");
        }
        try {
            isDispatching = true;
            currentState = currentReducer(currentState, action);
        } finally {
            isDispatching = false;
        }
        const listeners = (currentListeners = nextListeners);
        listeners.forEach(func => func());
        return action;
    }

    function subscribe(listener) {
        if (isDispatching) {
            throw new Error("不能再reducer中使用subscribe");
        }
        let isSubscribed = false;
        ensureCanMutateNextListeners();
        nextListeners.push(listener);
        return function unsubscribe(listener) {
            if (!isSubscribed) {
                return;
            }
            if (isDispatching) {
                throw new Error(
                    "You may not unsubscribe from a store listener while the reducer is executing. " +
                        "See https://redux.js.org/api-reference/store#subscribelistener for more details."
                );
            }
            ensureCanMutateNextListeners();
            const index = nextListeners.indexOf(listener);
            nextListeners.splice(index, 1);
            currentListeners = null;
        };
    }

    function getState() {
        if (isDispatching) {
            throw new Error("reducer 中不能使用 getState");
        }
        return currentState;
    }
    // 初始化检查
    dispatch({ type: ActionTypes.INIT });
    return {
        dispatch,
        subscribe,
        getState,
    };
}

function combineReducers(reducers) {
    const finalReducers = {};
    Object.keys(reducers).forEach(key => {
        if (typeof reducers[key] === "function") {
            finalReducers[key] = reducers[key];
        }
    });
    console.log(finalReducers, "finalReducers");
    return function combination(state = {}, action) {
        let hasChanged = false;
        let nextState = {};
        Object.keys(finalReducers).forEach(key => {
            const reducer = finalReducers[key];
            const previousStateForKey = state[key];
            const currentState = reducer(previousStateForKey, action);
            nextState[key] = currentState;
            hasChanged = hasChanged || previousStateForKey !== currentState;
        });
        hasChanged =
            hasChanged ||
            Object.keys(finalReducers).length !== Object.keys(state).length;
        return hasChanged ? nextState : state;
    };
}

function todo(state = {}, action) {
    return state;
}

function doSomething(state, action) {
    if (action.type === "INIT") {
        return {
            name: "liwuzhou",
        };
    }

    return state;
}

// const finallyReducer = combineReducers({ todo, doSomething });

// console.log(finallyReducer({ 1: 10, name: "bigHippoZz" }, { type: "INIT" }));
const store = createStore(todo, {});

let logger = function () {
    store.subscribe(function () {
        console.log("hello world");
    });
};
store.subscribe(logger);
store.dispatch({});

// store.dispatch({});

// let current = [1];
// const listeners = current;
// current = current.slice();
// current.push(1);
// console.log(current, "current");
// console.log(listeners, "listeners");
