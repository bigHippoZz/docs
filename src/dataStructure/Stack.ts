import { stringifyQuery } from "vue-router";

class Stack {
  private stack: Array<any>;
  private index: number;
  constructor() {
    this.stack = [];
    this.index = -1;
  }
  push(value: unknown) {
    this.stack.push(value);
    this.index++;
  }
  pop() {
    if (this.index < 0) return;
    this.stack.pop();
    this.index--;
  }
  top() {
    return this.stack[this.index];
  }
  length() {
    return this.index + 1;
  }
}

class MinStack {
  stack: Array<number>;
  minStack: Array<number>;
  constructor() {
    this.stack = [];
    this.minStack = [Infinity];
  }
  push(value: number) {
    this.stack.push(value);
    this.minStack.push(
      Math.min(this.minStack[this.minStack.length - 1], value)
    );
  }
  pop() {
    this.stack.pop();
    this.minStack.pop();
  }
  top() {
    return this.stack[this.stack.length];
  }
  getMin() {
    return this.minStack[this.minStack.length - 1];
  }
}

// 可以利用指针进行判断栈顶
const minStack = new MinStack();
// 用栈实现队列

class QueueForTwoStack<T> {
  private stack: T[];
  private helperStack: T[];
  private popElement: T | null;
  constructor() {
    this.stack = [];
    this.helperStack = [];
    this.popElement = null;
  }
  push(val: T) {
    if (!this.stack.length) this.popElement = val;
    this.stack.push(val);
  }
  pop() {
    let target = null;

    while (this.stack.length) {
      this.helperStack.push(this.stack.pop() as T);
    }
    if (this.helperStack.length) {
      target = this.helperStack.pop();
      this.popElement = this.helperStack.pop() as T;
      this.popElement && this.helperStack.push(this.popElement);
    }
    while (this.helperStack.length) {
      this.stack.push(this.helperStack.pop() as T);
    }
    return target;
  }

  peek() {
    return this.stack.length && this.popElement;
  }

  empty() {
    return !this.stack.length;
  }
}

// 1190. 反转每对括号间的子串

// 给出一个字符串 s（仅含有小写英文字母和括号）。

// 请你按照从括号内到外的顺序，逐层反转每对匹配括号中的字符串，并返回最终的结果。

// 注意，您的结果中 不应 包含任何括号。

// 示例 1：

// 输入：s = "(abcd)"
// 输出："dcba"
// 示例 2：

// 输入：s = "(u(love)i)"
// 输出："iloveu"
// 示例 3：

// 输入：s = "(ed(et(oc))el)"
// 输出："leetcode"
// 示例 4：

// 输入：s = "a(bcdefghijkl(mno)p)q"
// 输出："apmnolkjihgfedcbq"

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/reverse-substrings-between-each-pair-of-parentheses
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

// 思路：

// 1.什么时机进行入栈，什么时机进行出栈？
//        这道题的显而易见就是在 '(' ')' 进行出栈入栈操作，但是这道题的难点并不是在出栈入栈的时机上，
//        而是入栈一个''字符串，然后对栈顶元素进行累加，这是这道题的关键所在！并不是按照正常的逻辑保存当前遍历之后累加的字符串然后进行入栈操作
//       2.入栈的数据结构是什么样子？
//         将字符串进行入栈

// 总结：有时候并不需要保存当前遍历累加的字符串，而是直接操作栈顶元素
function reverseParentheses(s: string): string {
  // 初始化栈底元素 方便进行累加
  const stack = [""];
  // 遍历所以元素
  for (const char of s) {
    // 遇到 '(' 入栈，只将 '' 入栈方便后续的累加
    if (char === "(") {
      stack.push("");
    } else if (char === ")") {
      // 弹出当前的栈顶元素
      const last = stack.pop() as string;
      // 翻转字符串
      const temp = last
        .split("")
        .reverse()
        .join("");
      console.log(temp);
      // 对栈顶元素进行累加
      stack[stack.length - 1] += temp;
    } else {
      // 对栈顶元素进行累加
      stack[stack.length - 1] += char;
    }
  }
  return stack.join("");
}

// const result = reverseParentheses("(u(love)i)");
// console.log(result);

// 316. 去除重复字母
// 给你一个字符串 s ，请你去除字符串中重复的字母，使得每个字母只出现一次。需保证 返回结果的字典序最小（要求不能打乱其他字符的相对位置）。
// 注意：该题与 1081 https://leetcode-cn.com/problems/smallest-subsequence-of-distinct-characters 相同
// 示例 1：
// 输入：s = "bcabc"
// 输出："abc"
// 示例 2：

// 输入：s = "cbacdcbc"
// 输出："acdb"

/**
 *
 * 思路
 * 看完题目中最重要的几个信息 1.去除字符串中重复的字母 2.返回的结果需要字典序最小
 * 先看第二个信息，返回的结果需要字典序最小，也就是说当s字符串中出现两个相同的字母要取索引较大的字母，本题的重点所在！
 * 第一个去重就比较简单不再赘述
 */
function removeDuplicateLetters(s: string): string {
  const stack: string[] = []; /** 栈 */
  const len = s.length;
  for (let i = 0; i < len; i++) {
    const char = s.charAt(i);
    /** 进行去重操作 */
    if (stack.includes(char)) continue;
    /** 栈必须有元素，栈顶不能大于当前char 栈顶元素不能小于之后出现与当前重复的元素的索引 */
    while (
      stack.length &&
      stack[stack.length - 1] > char &&
      s.indexOf(stack[stack.length - 1], i) > i
    ) {
      /** 进行出栈操作 */
      stack.pop();
    }
    // 将当前的字符串进行入栈
    stack.push(char);
  }
  return stack.join("");
}

// const string = "cbacdcbc";
// const result = removeDuplicateLetters(string);
// console.log(result);

// 1209. 删除字符串中的所有相邻重复项 II
// 给你一个字符串 s，「k 倍重复项删除操作」将会从 s 中选择 k 个相邻且相等的字母，并删除它们，使被删去的字符串的左侧和右侧连在一起。

// 你需要对 s 重复进行无限次这样的删除操作，直到无法继续为止。

// 在执行完所有删除操作后，返回最终得到的字符串。

// 本题答案保证唯一。

// 示例 1：

// 输入：s = "abcd", k = 2
// 输出："abcd"
// 解释：没有要删除的内容。
// 示例 2：

// 输入：s = "deeedbbcccbdaa", k = 3
// 输出："aa"
// 解释：
// 先删除 "eee" 和 "ccc"，得到 "ddbbbdaa"
// 再删除 "bbb"，得到 "dddaa"
// 最后删除 "ddd"，得到 "aa"
// 示例 3：

// 输入：s = "pbbcggttciiippooaais", k = 2
// 输出："ps"

// 思路
//  栈问题还是两个点：
//  1.什么时机进行入栈，什么时机进行出栈，
//  2.入栈的数据结构怎样选择？
//          先回答第二个问题，一开始我直接想到的是用暴力法，使用字符串入栈，
// 直接将字符串依次进行入栈，然后判断栈顶到k-1位元素是否相同，相同的话就将上述的k-1位直接出栈。虽然做出来了但是超级慢。
// 后来看了别人的解答，发现自己用了最笨的方法(手动滑稽)，这题是将一个描述当前字符串数量的对象入栈，然后最后根据栈中对象生成最终的字符串。
// 至于什么时候入栈呢？当前栈顶不等于当前遍历的元素进行入栈，什么时候出栈呢？当栈顶描述当前字符串的数量正好等于k就进行出栈
// 总结 一定要注意入栈出栈的数据结构 超级重要！！！！重要的话说三遍！
function removeDuplicates(s: string, k: number): string {
  const stack: { val: string; count: number }[] = [];
  for (let i = 0; i < s.length; i++) {
    // 获取最新的char
    const val = s[i];
    //  获取当前的stack长度
    const len = stack.length;
    // 当当前的val等于栈顶的元素的时候
    if (len > 0 && val === stack[len - 1].val) {
      // 栈顶的元素进行++
      stack[len - 1].count++;
      // 栈顶的元素的count  === k
      if (stack[len - 1].count === k) {
        stack.pop();
      }
    } else {
      stack.push({ val, count: 1 });
    }
  }
  return stack.reduce((prev, item) => {
    return prev + item.val.repeat(item.count);
  }, "");
}

// const result = removeDuplicates("deeedbbcccbdaa",3);

// console.log(result);

// 402. 移掉K位数字
// 给定一个以字符串表示的非负整数 num，移除这个数中的 k 位数字，使得剩下的数字最小。

// 注意:

// num 的长度小于 10002 且 ≥ k。
// num 不会包含任何前导零。
// 示例 1 :

// 输入: num = "1432219", k = 3
// 输出: "1219"
// 解释: 移除掉三个数字 4, 3, 和 2 形成一个新的最小的数字 1219。
// 示例 2 :

// 输入: num = "10200", k = 1
// 输出: "200"
// 解释: 移掉首位的 1 剩下的数字为 200. 注意输出不能有任何前导零。
// 示例 3 :

// 输入: num = "10", k = 2
// 输出: "0"
// 解释: 从原数字移除所有的数字，剩余为空就是0。

// 1021. 删除最外层的括号
// 有效括号字符串为空 ("")、"(" + A + ")" 或 A + B，其中 A 和 B 都是有效的括号字符串，+ 代表字符串的连接。例如，""，"()"，"(())()" 和 "(()(()))" 都是有效的括号字符串。

// 如果有效字符串 S 非空，且不存在将其拆分为 S = A+B 的方法，我们称其为原语（primitive），其中 A 和 B 都是非空有效括号字符串。

// 给出一个非空有效字符串 S，考虑将其进行原语化分解，使得：S = P_1 + P_2 + ... + P_k，其中 P_i 是有效括号字符串原语。

// 对 S 进行原语化分解，删除分解中每个原语字符串的最外层括号，返回 S 。

//

// 示例 1：

// 输入："(()())(())"
// 输出："()()()"
// 解释：
// 输入字符串为 "(()())(())"，原语化分解得到 "(()())" + "(())"，
// 删除每个部分中的最外层括号后得到 "()()" + "()" = "()()()"。
// 示例 2：

// 输入："(()())(())(()(()))"
// 输出："()()()()(())"
// 解释：
// 输入字符串为 "(()())(())(()(()))"，原语化分解得到 "(()())" + "(())" + "(()(()))"，
// 删除每个部分中的最外层括号后得到 "()()" + "()" + "()(())" = "()()()()(())"。
// 示例 3：

// 输入："()()"
// 输出：""
// 解释：
// 输入字符串为 "()()"，原语化分解得到 "()" + "()"，
// 删除每个部分中的最外层括号后得到 "" + "" = ""。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/remove-outermost-parentheses
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

// 思路
//    当栈为空的时候，入栈的第一个'('添加特殊标记。 围绕这个思路进行思考。

//    栈只是一种思想，先入后出，具有缓存性，一定不要死记硬背模板，数字 字符串 数组都可以模拟栈的思想
//    遇见栈的问题，首先先判断什么时机进行入栈，出栈，然后设计入栈的数据结构，在判断在出栈入栈的时候做什么事情，再者使用变量保存
//    某一时机的状态，然后与出栈的元素进行比较作相应的逻辑判断。

/**
 * @param {string} S
 * @return {string}
 */
const removeOuterParentheses = function(S: string) {
  let res = "";
  let opened = 0;
  for (let c of S) {
    if (c === "(" && opened++ > 0) res += c;
    if (c === ")" && opened-- > 1) res += c;
  }
  return res;
};

/**
 * @param {string} s
 * @return {number}
 */
const minInsertions = function(s: string) {
  debugger;
  let res = 0; // 记录右括号的最少插入次数
  let need = 0; // 记录右括号的需求量
  for (let i = 0; i < s.length; i++) {
    if (s[i] == "(") {
      need += 2;
      if (need % 2 == 1) {
        // 它是奇数
        res++; // 插入一个右括号
        need--; // 右括号需求量减一
      }
    }
    if (s[i] == ")") {
      need--; // 右括号需求量减一
      if (need == -1) {
        // 右括号多出一个
        res++; // 插入一个右括号
        need = 1;
      }
    }
  }
  return res + need;
};

// const result = minInsertions("()))");

// console.log(result);

// 1. 闭合标签
// 2. 大写标签 必须是大写的 返回在 [1-9]之间
// 3. 可以包含任意闭合标签 cdata 任意字符
//   不匹配

function isValidTest(code: string): boolean {
  let index = 0;
  const START_TAG = /<([A-Z]{1,9})>/; // 开始标签
  const END_TAG = /<\/([A-Z]{1,9})>/; // 结束标签
  const FILTER_TAG = /<!\[CDATA\[(.*?)\]\]>/g; // 特殊标签
  const stack = [];
  let currentString = "";
  let isClosureTag = false; // 判断是不是嵌套表标签
  const cdata = code.match(FILTER_TAG);
  if (cdata && cdata[0]) {
    if (code.indexOf(cdata[0]) === 0) return false;
    if (code.length - cdata[0].length === code.lastIndexOf(cdata[0]))
      return false;
  }
  code = code.replace(FILTER_TAG, "");
  if (!code.length || !code.includes("<")) return false;
  if(code[0]!== '<') return false; 
  while (index < code.length) {
    let char = code[index];
    if (char === "<") {
      function isTag(reg: RegExp) {
        let value = "";
        let currentIndex = 0;
        while (char !== ">" && currentIndex < 11) {
          currentIndex++;
          value += char;
          char = code[++index];
        }
        value += char;
        index++;
        return {
          isTag: reg.test(value),
          TagName: RegExp.$1,
        };
      }
      // 下一个元素 进行判断是开始还是结束
      const nextChar = code[index + 1];
      if (!nextChar) return false;
      switch (nextChar) {
        // 结束标签
        case "/":
          const endTagRes = isTag(END_TAG);
          if (!endTagRes.isTag) return false;
          if (
            stack.length &&
            stack[stack.length - 1].tag === endTagRes.TagName
          ) {
            currentString = "";
            stack.pop();
          } else {
            return false;
          }
          break;
        // 开始标签
        case (nextChar.match(/[A-Z]/) || {}).input:
          const startRegRes = isTag(START_TAG);
          if (!startRegRes.isTag) return false;
          if (!stack[stack.length - 1]) {
            if (isClosureTag) return false;
            isClosureTag = true;
          }
          currentString = "";
          stack.push({ tag: startRegRes.TagName });
          break;
        // 不匹配就滚蛋
        default:
          return false;
      }
      continue;
    }
    currentString += char;
    index++;
  }
  console.log(stack);
  console.log(currentString);
  if (currentString) return false;
  return !stack.length;
}

// const string = "<DIV>This is the first line</DIV>";
// const result = isValidTest(string);
// console.log(result);
