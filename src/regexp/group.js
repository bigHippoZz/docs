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

const _dateString = "2019-10-30 2020-01-01";

const __datePattern = /(?<y>\d{4})-(?<m>\d{2})-(?<d>\d{2})/;
// console.log(_dateString.match(_dateRegex));

// console.log(_dateString.match(__datePattern))

const pattern = /\{\{(?<expression>[^\}\}]+?)\}\}/g;

const template = `div {{ string }} html span {{ number }}`;

// console.log(template.matchAll(pattern));

for (const result of template.matchAll(pattern)) {
  const {
    groups: { expression },
  } = result;
  //   console.log(expression.trim());
}

// 使用 replace 进行替换
// console.log(template.replace(pattern,"$<expression>"))

// 括号将正则表达式的一部分组合在一起，以便量词可以整体应用。

// 括号组从左到右编号，可以选择用 (?<name>...) 命名。

// 可以在结果中获得按组匹配的内容：

// 方法 str.match 仅当不带标志 g 时返回捕获组。
// 方法 str.matchAll 始终返回捕获组。
// 如果括号没有名称，则匹配数组按编号提供其内容。命名括号还可使用属性 groups。

// 我们还可以使用 str.replace 来替换括号内容中的字符串：使用 $n 或者名称 $<name>。

// 可以通过在组的开头添加 ?: 来排除编号组。当我们需要对整个组应用量词，但不希望将其作为结果数组中的单独项时这很有用。我们也不能在替换字符串时引用此类括号。

let colorPattern = /#([0-9a-f]{3}|[0-9a-f]{6})\b;/gi;

tagString = "color: #3f3; background-color: #AA00ef; and: #abcd";

colorPattern = /-?\d+(\.\d+)*/g;

tagString = "-1.5 0 2 -123.42323.";

colorPattern = /(?<a>-?\d+(\.\d+)*)\s*(?<o>[\+\*\/-])\s*(?<b>-?\d+(\.\d+)*)/;

tagString = "-3 / -6";


// console.log(tagString.match(colorPattern));
