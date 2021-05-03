/**
 *
 *
 * 很正常的一个问题的 \w+他会产生回溯
 *
 */
let pattern = /(?=(?<word>\w+))\k<word>/

// 使用前瞻断言来进行方式回溯 当前的 \w+ 也是贪婪模式 但是他并不会进行回溯

const array = [
    { color: 'red' },
    [{ width: '100px' }],
    'height:100px',
    { backgroudColor: 'red' },
]

const isString = value => value && typeof value === 'string'

const isObject = value => value && value !== null && typeof value === 'object'

const listDelimiter = /;/
const propertyDelimiter = /:(.+)/

function normalizedStyle(value) {
    if (Array.isArray(value)) {
        let result = {}
        for (let i = 0; i < value.length; i++) {
            const item = value[i]
            const normalized = normalizedStyle(
                isString(item) ? parseStringStyle(item) : item
            )
            for (const key in normalized) {
                result[key] = normalized[key]
            }
        }
        return result
    }
    if (isObject(value)) {
        return value
    }
}

function parseStringStyle(string) {
    const result = {}
    if (isString(string)) {
        string.split(listDelimiter).forEach(item => {
            if (item) {
                const current = item.split(propertyDelimiter)
                current.length > 1 &&
                    (result[current[0].trim()] = current[1].trim())
            }
        })
    }
    return result
}

function cacheStringFunction(fn) {
    const cache = Object.create(null)
    return function (string) {
        const hit = cache[string]
        return hit || (cache[string] = fn(string))
    }
}

const hyphenateRE = /\B([A-Z])/g

const hyphenate = cacheStringFunction(string => {
    return string.replace(hyphenateRE, '-$1').toLowerCase()
})

function stringifyStyle(style) {
    console.log(style)
    let result = ''
    if (!style) {
        return result
    }

    for (const key in style) {
        const value = style[key]
        const normalize = key.startsWith('--') ? key : hyphenate(key)
        if (isString(value)) {
            result += `${normalize}:${value};`
        }
    }
    console.log(result)
    return result
}

stringifyStyle(normalizedStyle(array))
