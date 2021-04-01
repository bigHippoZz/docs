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
domainPattern = /(\w+\.)+\w+/g

// console.log(domainString.match(domainPattern))

