let testString = "Gogogo now !";

/**
 * 注意括号的位置如果是在量词的前面，则视为整体
 * 带括号的情况 go 为一个整体
 * 不带括号的情况 goooo 这种方式进行匹配
 */
let testPattern = /(go)+/i;

// console.log(testString.match(testPattern));

// 域名正则
let domainPattern = /(\w+\.)+\w+/g;

let domainString = `smith.users.mail.com   users.mail.com`;

// console.log(domainString.match(domainPattern));
domainPattern = /(\w+\.)+\w+/g;

// console.log(domainString.match(domainPattern))

let tagString = "<h1>Hello, world!</h1>";
let tagPattern = /<(.*?)>/g;

// 利用括号进行捕获内容
// console.log(tagString.match(tagPattern))

tagString = `<span class="my">`;
// 防止贪婪匹配一定要使用这种 [^.] 来避免某些问题
const searchPattern = /<((\w+)\s+([^>]*))>/;
// console.time('for')
// let index = 10000;
// do {
//   tagString.match(searchPattern);
// } while (--index);
// console.timeEnd('for')

//  可选组 简单理解就是将字符用括号包裹然后 添加  量词 ？

const optional = /a(c)?(e)?/;

const optionalString = "ae";

// console.log(optionalString.match(optional))

tagString = "<h1>Hello, world!</h1>";

/**
 * 正则表达式添加 g 的修饰符之后 使用match就会返回数组的形式
 * 想要得到括号包裹的值然后又是添加 g 的修饰符，必须使用 matchAll()
 *
 */
// console.log(tagString.matchAll(tagPattern));
// 添加别名 很有意思的东西
const _dateRegex = /(?<year>\d{4})-(?<m>(0\d|1[0-2]))-(?<d>\d{2})/;

const _dateString = '2019-10-30 2020-01-01'


console.log(_dateString.match(_dateRegex));