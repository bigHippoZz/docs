/**
 *  \d 代表 digit 代表从 0-9 的任何数字
 *  \s 代表 space 代表空格
 *  \w 代表 word  拉丁字符和数字或者下划线
 */

const d = /\d/;
const s = /\s/;
const w = /\w/;
let string = "_";
//  console.log(string.match(w))

// 反向类
/**
 *  \D 代表除了 0-9 数字的任何一个
 *  \S 代表除了空格都能配匹配的字符
 *  \W 除了\w以外的任何字符 例如非拉丁字母或者空格
 */

// . 除了换行符之后所有的字符

let pattern = /./;
string = "z";

// console.log(string.match(pattern))

let allPattern = /[\s\S]/; /* [^] 来代替匹配所有的字符 */

// 注意空格
// console.log("1 - 5".match(/\d-\d/));
// console.log("1 - 5".match(/\d\s-\s\d/));

// console.log(/[\s\S]/)