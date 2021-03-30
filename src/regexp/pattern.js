let string = "+7(903)-123-45-67";
/* 当前注意加不加 g 修饰符 加上的话就会返回全部匹配的字符 并不是index  */
/* 不加 g 的话返回一个对象 没有匹配的结果会返回null */

let pattern = /\d/g;

// 小心 match 的结果为null
let tel = string.match(pattern)?.join("");

// console.log(tel)

// i 不区分大小写
// g 全局匹配
// m 换行匹配
// u 开启完整的unicode支持

