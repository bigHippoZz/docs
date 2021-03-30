// 词边界  \b
// 他会检查字符串中的位置是不是词边界

// 三种情况
// 1.在字符串中的开头,如果第一个字符是单词字符 \w
// 2.在字符串中的两个字符之间,其中一个单词字符 \w 另一个不是
// 3.在字符串末尾,如果最后一个字符为单词字符 \w

const java = "hello,java";
const javascript = "hello,javaScript!";

const patternJava = /\bjava\b/;
const patternNotJava = /\bjavaScript!\b/;
// console.log(java.match(patternJava));

// !!!! \b 是词边界 所以特殊符号不能后进行匹配
// 可以这样理解 \b 只能应用与 \w \d

// console.log(javascript.match(patternNotJava));

const string = `90:45 Breakfast at 09:00 in the room 123:456.`;

/* 查找时间 */
const pattern = /\b\d\d:\d\d\b/g

// console.log(string.match(pattern));
