import _ from 'lodash'

const isArray = val => Array.isArray(val)
const isFunction = val => typeof val === 'function'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

function createFlow(effects) {
    function helper(source) {
        const result = []
        if (_.isFunction(source)) {
            return source
        } else if (_.isArray(source)) {
            for (let index = 0; index < source.length; index++) {
                const item = helper(source[index])
                _.isArray(item) ? result.push(...item) : result.push(item)
            }
            return result
        } else if (_.isObject(source)) {
            return helper([...source.effects])
        }
    }
    return {
        effects: helper(effects),
        run(cb) {
            this.effects
                .reduce((pre, cur) => pre.then(cur), Promise.resolve())
                .then(cb)
        },
    }
}

// const subFlow = [() => delay(1000).then(() => console.log('c'))]
// const a = createFlow([() => delay(1000).then(() => console.log('c'))])
const subFlow = createFlow([() => delay(1000).then(() => console.log('c'))])
// console.log(subFlow)

createFlow([
    () => console.log('a'),
    () => console.log('b'),
    subFlow,
    [() => delay(1000).then(() => console.log('d')), () => console.log('e')],
]).run(() => {
    console.log('hello world')
})
