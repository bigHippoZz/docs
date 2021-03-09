// (add 2 (subtract 4 2))   =>   [{ type: 'paren', value: '(' }, ...]

export function tokenizer(input) {
  let current = 0;
  const tokens = [];
  const length = input.length;
  while (current < length) {
    let char = input[current];

    if (char === "(") {
      tokens.push({
        type: "paren",
        value: "(",
      });
      current++;
      continue;
    }

    if (char === ")") {
      tokens.push({
        type: "paren",
        value: ")",
      });
      current++;
      continue;
    }

    const whitespace = /\s/;
    if (whitespace.test(char)) {
      current++;
      continue;
    }

    const numbers = /[0-9]/;
    if (numbers.test(char)) {
      let value = "";

      while (numbers.test(char)) {
        value += char;
        char = input[++current];
      }

      tokens.push({
        type: "number",
        value,
      });
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
      tokens.push({
        type: "string",
        value,
      });
      continue;
    }
    const letter = /[a-z]/i;

    if (letter.test(char)) {
      let value = "";
      while (letter.test(char)) {
        value += char;
        char = input[++current];
      }
      // 之后创建词素并添加到`tokens`变量。
      tokens.push({ type: "name", value });

      continue;
    }
    throw new Error(`I dont know what this character is: ${char}`);
  }
  return tokens;
}

console.log(tokenizer("(add 2 (subtract 4 2))"));

