/**
 * 有时候需要匹配后面或者前面跟着特定的模式
 * 需要用到前瞻和后瞻断言
 */

// 前瞻断言 x(?=y)

let string = "20 has 10%";
let pattern = /\d+(?=%)/;
// console.log(string.match(pattern))
pattern = /\d+(?!%)/;
// console.log(string.match(pattern))

// 后瞻断言

string = "1 turkey costs $30";

pattern = /(?<=\$)\d+/;

// console.log(string.match(pattern))

pattern = /(?<!\$)\d+/;

// console.log(string.match(pattern))

// 环视断言也可以加 | 来进行使用表达式方向的 |
// 还是使用括号进行捕获

pattern = /(?<=(?<symbol>\$|%))(?<number>\d+)/;

// console.log(string.match(pattern))

string = `0 12 -5 123 -18`;

pattern = /\b(?<!-)\d+\b/g;

// console.log(string.match(pattern));

string = `
<html>
  <body style="height: 200px">
  ...
  </body>
</html>
`;

pattern = /(?<=<body .*>)(?<tag>)/m;

// 如果只是单纯的 前瞻判断和后瞻判断 那么他只是匹配到一个位置罢了
// console.log(string.replace(pattern,"<h1>hello world</h1>"));

/**
 * 如何理解前瞻断言呢 ？ 其实就是(?=y)他会匹配一个位置，也就是 y 的前面
 * (?<=y) 同样的他也会匹配一个位置，但是是y 的后面 这就是前瞻断言和后瞻断言的区别
 */
