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
