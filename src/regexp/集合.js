/**
 *  正则表达式中[]代表集合
 */
const set = /[mo]/g;
let string = "mip,oip";
// console.log(string.match(set));

// 排除范围

const a = /* 排除 aeyo */ /[^aeyo]/;
const b = /* 排除 0-9 */ /[^0-9]/;
const c = /* 排除空格 */ /[^\s]/;

const pattern = /java[^script]/;
// 返回的结果是null 由于java前半段进行匹配，是正确的，但是后面的 ^script 是排除 script的
// 由于java后面没有字符 所以是 null
// console.log("java".match(pattern));

/\d\d[:-]\d\d/;
