let string = "hello world";

let pattern = /^hello/;
// 这种情况使用 startsWith方法
// console.log(string.match(pattern));

// console.log(string.startsWith('hello'))

/**
 *  ^ $ 属于测试，他们的宽度为零，换句话来讲他们并不是一个具体的字符
 */