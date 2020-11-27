function decodeString(s: string): string {
  let curStr = ""; // 缓存当前的字符串
  let count = ""; // 缓存当前的字符串重复数量
  const stack = [];
  for (const char of s) {
    if (!isNaN(Number(char))) {
      count += char;
    } else if (char === "[") {
      stack.push({ str: curStr, count });
      console.log(stack);
      curStr = "";
      count = "";
    } else if (char === "]") {
      const data = stack.pop();
      console.log(data);
      if (data === undefined) continue;
      curStr = data?.str + curStr.repeat(Number(data?.count));
    } else {
      curStr += char;
    }
  }
  return curStr;
}
// 注意解析字符串转为数字的时候 一定要使用字符串进行累加！
// 一定不要随便使用 if(!condition) 如果为数字判断的话就会出错！
// splice会改变数组的长度，如果介意的话使用delete来进行删除数组的项，这样原来的下标就会变成undefined
// console.log(decodeString("100[af]"));

function minRemoveToMakeValid(s: string): boolean {
  const stack = [];
  const pattern = /^[a-z]$/;
  let index = 0;
  while (index < s.length) {
    const char = s.charAt(index);
    if (pattern.test(char)) {
      index++;
      continue;
    } else if (char === "(") {
      stack.push(1);
    } else if (char === ")") {
      const result = stack.pop();
      if (!result) return false;
    }
    index++;
  }
  return stack.length === 0;
}

// console.log(minRemoveToMakeValid("lee(t((c)o)de"));

// 简单计算器
function Test(s: string) {
  // 计算规则
  const OPERATOR = {
    "+": (a: number, b: number) => a + b,
    "-": (a: number, b: number) => a - b,
  };
  const WHITESPACE = /\s/; // 匹配空格
  const NUMBERS = /[0-9]/; // 匹配数字
  let currentString = ""; // 保存当前字符
  let currentNumber = 0; // 保存当前的计算数字
  let currentFunction = OPERATOR["+"]; // 保存当前的计算函数

  const stack = []; // 栈
  let index = 0; // 索引
  while (index < s.length) {
    let char = s[index]; // 获取当前的字符

    // 检测空格
    if (WHITESPACE.test(char)) {
      index++;
      continue;
    }
    // 检测数字
    if (NUMBERS.test(char)) {
      let value = "";
      while (NUMBERS.test(char)) {
        value += char;
        char = s[++index];
      }
      // 遍历生成最终的字符
      currentString = value;
      continue;
    }

    // 检测 （
    if (char === "(") {
      // 遇到 （ 将之前的收集的 currentNumber currentFunction 入栈
      stack.push(currentNumber, currentFunction);
      // 重置 currentNumber
      currentNumber = 0;
      // 重置 current Function
      currentFunction = OPERATOR["+"];
      // 重置 currentString
      currentString = "";
      // 索引增加
      index++;
      continue;
    }
    // 检测 ）
    if (char === ")") {
      // 计算之前未计算的数值
      currentNumber = currentFunction(currentNumber, Number(currentString));
      // 弹出栈 将现在的数值与之前存入栈的数值进行运算
      currentNumber = stack.length
        ? (stack.pop() as Function)(stack.pop(), currentNumber)
        : currentNumber;
      // 索引增加
      index++;
      // 重置保存的string
      currentString = "";
      continue;
    }

    // 检测 + -
    if (char === "+" || char === "-") {
      // 与之前的保存的数值进行运算
      currentNumber = currentFunction(currentNumber, Number(currentString));
      // 更新最新的运算函数
      currentFunction = OPERATOR[char];
      // 重置 currentString
      currentString = "";
      index++;
      continue;
    }
  }

  if (currentString !== "") {
    // 如果后续还是currentstring 将currentNumber进行运算
    currentNumber = currentFunction(currentNumber, Number(currentString));
  }
  return currentNumber;
}

const isValid = function(s: string) {
  //  利用递归进行操作
  const pattern = /abc/;
  if (s.includes("abc")) {
    return s.replace(pattern, "");
  }
  return !s.length;
};

// var validateStackSequences = function(pushed, popped) {
//   let stack = [];
//   let i = 0;
//   let j = 0;

//   while (i < pushed.length) {
//       stack.push(pushed[i]);
//       while(stack[stack.length - 1] === popped[j] && stack.length) {
//           j++;
//           stack.pop();
//       }
//       i++
//   }
//   return stack.length === 0;
// };

// 作者：xianyu-3
// 链接：https://leetcode-cn.com/problems/validate-stack-sequences/solution/zhan-de-fang-fa-by-xianyu-3/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

function validateStackSequences(pushed: number[], popped: number[]) {
  if (pushed.length !== popped.length) return false;
  const stack = [];
  let j = 0;
  let i = 0;
  // i 最大值为pushed数组的长度
  while (i < pushed.length) {
    // 栈中添加相应的pushed中对应的index
    stack.push(pushed[i]);
    // 遍历
    while (stack[stack.length - 1] === popped[j] && stack.length) {
      j++;
      stack.pop();
    }
    i++;
  }
  return !stack.length;
}

// const result = validateStackSequences([1, 2, 3, 4, 5], [4, 3, 5, 1, 2]);

// console.log(result);

function entityParser(text: string): string {
  const textMap = new Map<string, string>([
    ["&quot;", `"`],
    ["&apos;", `'`],
    ["&amp;", `&`],
    ["&gt;", `>`],
    ["&lt;", `<`],
    ["&frasl;", `/`],
  ]);
  console.log(textMap.get("&quot;"));
  let result = "";
  let key = "";
  let index = 0;
  while (index < text.length) {
    const char = text.charAt(index);
    // 遇到&进行判断，但是注意&&&
    // 思路：将最近的字符串进行保存也可以说是缓存，然后在特定的情况下
    // 进行清空重置 也就是& ； 的时候，
    // 首先遇到 & 最开始的判断，先将key累加到result 然后重置状态
    // 遇到；这时候就要判断key是不是 标识符 如果是就进处理，然后累加 不是标识符就直接累加
    // ad[we,t]9
    // 正常来讲就是简单的累加收集状态，但是遇到& ；时就会变得特殊
    // & 重置状态 但是有可能连续的&& 那么就先将key重置
    // ；时就是处理结果，但是可能不是 所谓的标志符，这时候就要加一个判断，如果是就替换之后累加
    // 如果不是就简单的累加
    if (char === "&") {
      result += key;
      key = "&";
      index++;
      continue;
    }
    if (char === ";") {
      key += char;
      console.log(textMap.get(key));
      result += textMap.get(key) || key;
      key = "";
      index++;
      continue;
    }
    key += char;
    index++;
  }
  return (result += key);
}

// const result = entityParser("&amp; is an HTML entity but &ambassador; is not.");
// console.log(result);

// 1249. 移除无效的括号  https://leetcode-cn.com/problems/minimum-remove-to-make-valid-parentheses/
type StackItem = [string, number];
function minRemoveToMakeValidTest(s: string): string {
  if (!s.length) return "";
  const stack: Array<StackItem> = [];
  let index = 0;
  while (index < s.length) {
    const char = s.charAt(index);
    if (char === "(") {
      stack.push(["(", index]);
      index++;
      continue;
    }
    if (char === ")") {
      const stackPeek = stack[stack.length - 1]?.[0];
      if (stackPeek === "(") {
        stack.pop();
      } else {
        stack.push([")", index]);
      }
      index++;
      continue;
    }
    index++;
  }
  // 优先遍历长度小的
  // 字符串并不能进行使用[index] 索引进行修改
  // 可以先将字符串转为数组 再转为 字符串
  const result = s.split("");
  for (const [, index] of stack) {
    result[index] = "";
  }
  return result.join("");
}
// const result = minRemoveToMakeValidTest("lee(t(c)o)de)");
// console.log(result);

///227. 基本计算器 II  https://leetcode-cn.com/problems/basic-calculator-ii/

// 利用位运算进行 string -> number  并不会出现NaN的情况!!
//  'hello world'|0     -> result  0
//  '100' | 0           -> result  100
const calculate = function(s: string) {
  const SYMBOLS = /\D/; /** 匹配非数字 */
  const WHITESPACE = /\s/; /**  匹配空格 */
  const stack: any[] = []; //栈
  let index = 0; //索引
  let currentString = ""; //保存当前的currentString
  let currentFunction = "+"; /** 保存当前的currentFunction */
  while (index < s.length || currentString) {
    const char = s.charAt(index); 
    if (WHITESPACE.test(char)) {
      index++;
      continue;
    }
    if (SYMBOLS.test(char) || index >= s.length) {
      switch (currentFunction) {
        case "+":
          stack.push(+currentString);
          break;
        case "-":
          stack.push(-currentString);
          break;
        case "*":
          stack.push(stack.pop() * +currentString);
          break;
        case "/":
          stack.push((stack.pop() / +currentString) | 0);
          break;
      }
      currentFunction = char;
      currentString = "";
      index++;
      continue;
    }
    currentString += char;
    index++;
  }
  return stack.reduce((a, b) => a + b);
};

// const result = calculate("10 + 29 * 10");
// console.log(result);
