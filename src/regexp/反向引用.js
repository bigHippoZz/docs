// 结果或替换字符串中使用捕获组 (...) 的内容，还可以在模式本身中使用它们。
// 自己的理解就是使用 刚刚匹配的结果来进行使用

let string = `He said: "She's the one!".`;

// ['"](?<expression>.+)\1 当前的正则失效是因为 没有加() 所以没有拿到捕获组
let pattern = /(?<quote>["])(?<expression>.+?)\k<quote>/;

// console.log(string.match(pattern))



