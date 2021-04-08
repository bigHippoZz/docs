/**
 *  选择是正则表达式中的 | 这样理解为js中的 ||
 *  最重要的一点是 使用 | 一定要将其括起来！！
 */

let pattern = /php|java(Script)?|python/g;
let string = "First HTML appeared, then CSS, then JavaScript python";
// console.log(string.match(pattern));
// 这样理解 [] 这是字符串级别的 而 | 是表达式级别的
string = "grey";
pattern = /gr(a|e)y/g;
// gr(a|e)y ===  gr[ae]y
console.log(string.match(pattern));

// 23:59
// 01:00

// 注意一个细节 [] 一定不要写 逗号 ,
const datePattern = /\b([01]\d|[2][0-3]):[0-5]\d\b/g;

const testString = "20:98 20: 20:78 20:45 90 23 ： 23  10:10 00:00";

// console.log(testString.match(datePattern));

const q1 = /Java(Script)?|PHP|C(\+\+)?/g;

const s1 = "Java JavaScript PHP C++ C ";

// console.log(s1.match(q1));
