function tokenizer(input: string) {
  let current = 0;

  const tokens = [];

  while (current < input.length) {
    let char = input[current];
    if (char === "(") {
      tokens.push({ type: "paren", value: "(" });
      current++;
      continue;
    }

    if (char === ")") {
      tokens.push({ type: "paren", value: ")" });
      current++;
      continue;
    }

    const WHITESPACE = /\s/;

    if (WHITESPACE.test(char)) {
      current++;
      continue;
    }

    const NUMBERS = /[0-9]/;

    if (NUMBERS.test(char)) {
      let value = "";

      while (NUMBERS.test(char)) {
        value += char;

        char = input[++current];
      }

      tokens.push({ type: "number", value });

      continue;
    }

    if (char === '"') {
      let value = "";
      char = input[++current];
      while (char !== '"') {
        value += char;
        char = input[++current];
      }

      char = input[++current];
      tokens.push({ type: "string", value });

      continue;
    }

    const LETTERS = /[a-z]/i;
    if (LETTERS.test(char)) {
      let value = "";

      // 和其他情况一样，我们遍历字母并将它们添加到`value`变量。
      while (LETTERS.test(char)) {
        value += char;
        char = input[++current];
      }

      // 之后创建词素并添加到`tokens`变量。
      tokens.push({ type: "name", value });

      continue;
    }

    // 最后如果我们并不能匹配到任何情况的话，我们就抛出一个错误并退出。
    throw new TypeError("I dont know what this character is: " + char);
  }

  return tokens;
}



// console.log(tokenizer('  (add 2 (subtract 4 2)) '))