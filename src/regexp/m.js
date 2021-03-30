// 通过修饰符 m 开启多行模式
// 这会影响锚点 ^ $ 的匹配，在多行模式下，他们不仅仅匹配文本的开始和结束，还匹配每一行的开始和结束

/**
 *
 * 注意！！！
 * 细节 在每一个换行的前面一定注意有没有空格的  这算是空格，并不会进行匹配！！！！
 *
 */
const string = `1st place : winner
2nd place: pig
33rd place : ese
`;
const headPattern = /^\d+/gm; /* 匹配以数字开头 进行全局匹配，匹配每一行的开头 */
const footPattern = /\w+$/gm; /* 匹配以字符结尾的 进行全局的匹配 ，并且匹配每一行的结尾 */
// console.log(string.match(/^\d+/gm));
const wrapPattern = /\w+\n/gm /* 并不会匹配最后的换行 */

// console.log(string.match(wrapPattern))