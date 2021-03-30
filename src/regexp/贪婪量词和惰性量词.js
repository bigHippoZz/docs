const pattern = /".+"/g;

let string = `a "witch" and her "broom" is one`;

// 这就是贪婪模式 匹配到 " 之后 把所有 .+都进行匹配 然后进行回溯
// console.log(string.match(pattern));

// 懒惰匹配
const lazy = /".+?"/g;

// console.log(string.match(lazy));

// 一定要记住 贪婪匹配只会匹配尽可能多的，而惰性匹配只会尽可能匹配少的，但都并不是最优的！！！

/**
 * 替代方法
 */

const replacePattern = /"[^"]+"/g;
// console.log(string.match(replacePattern));
let htmlPattern = /<a href="(.*?)" class="doc">/g;
let str = '...<a href="link" class="doc">...';

// console.log(str.match(htmlPattern));
str = '...<a href="link1" class="doc">... <a href="link2" class="doc">...';

// console.log(str.match(htmlPattern));

str = '...<a href="link1" class="wrong">... <p style="" class="doc">...';

// console.log(str.match(htmlPattern));

htmlPattern = /<a href="[^"]+" class="doc">/g;

// console.log(str.match(htmlPattern))

str = `... <!-- My -- comment
 test --> ..  <!----> ..
`;

const commentStripRE = /^-?>|<!--|-->|--!>|<!-$/g;
let reg = /<!--[\s\S]*?-->/g;
// console.log(str.match(reg));
str = '<> <a href="/"> <input type="radio" checked> <b>';
let htmlTag = /<\/?[a-z][0-9a-z]?.*?>/gi;
// console.log(str.match(htmlTag));
htmlTag = /<[^<>]+>/g;
// console.log(str.match(htmlTag));


