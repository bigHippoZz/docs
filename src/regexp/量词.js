// const pattern = /\{\{ (.+) \}\}/;
// const string  = `{{ number }}`

// console.log(string.match(pattern))

/**
 * {n} 代表的是量词
 */

// 正则表达式只会匹配一开始匹配到的 然后不会进行往下匹配
const numberPattern = /\d{5}/;

const numberAccuratePattern = /* 这样更加准确 */ /\b\d{5}\b/;

let string = "I'm 123456768 years old";
// console.log(string.match(numberAccuratePattern))
// console.log(string.match(numberPattern))

// 某个范围的

const rangePattern = /\d{2,5}/;
/*  {1,} 代表一个至多个 */
let rangeString = `I'm not 12, but 1234 years old`;

// console.log(rangeString.match(rangePattern))

/* 重中之重！！！ */
/* 量词的缩写 */

/**
 *  + {1,}
 */
const addPattern = /\d+/g;
const addString = "+7(903)-123-45-67";
// console.log(addString.match(addPattern));

/**
 *  ? {0，1}
 *  可以这样理解类似js中的可选链
 */

// 注意一个点 量词一定是放在后面的！！！
const questionMark = /olor?/;

let color = "color";
let colo = "colo";

// console.log(color.match(questionMark));
// console.log(colo.match(questionMark));

/**
 * * {0,}
 * 代表零个或者多个
 */

// 比较

const A = /10?/g; // 当前的 0 有或者没有 有的话只有一位
const B = /10+/g; // 当前的 0 必须有 可以是多个
const C = /10*/g; // 当前的 0 有或者没有 有个话可以是多个

const diff = "100 10 1";

// console.log(diff.match(A));
// console.log(diff.match(B));
// console.log(diff.match(C));

const pattern = /\{\{(.+?)\}\}/;
string = "{{  string 0}}";
// console.log(string.match(pattern));
const htmlTag = /<\/?[a-z][0-9a-z]*>/gim;
let html = `"<h1>Hi!</h1>"`;
// console.log(html.match(htmlTag));
let colorPattern = /#[0-9a-f]{6}/gi;
/* 但是当前有个问题 就是能够从更长的字符中匹配到 */
colorPattern = /#[0-9a-f]{6}\b/gi;
