// type Token = { type: "paren" | "name" | "number" | "string"; value: string };

// function tokenizer(input: string) {
//   let current = 0;

//   const tokens: Array<Token> = [];
//   while (current < input.length) {
//     let char = input[current];
//     // 检测括号
//     if (char === "(") {
//       tokens.push({
//         type: "paren",
//         value: "(",
//       });
//       current++;

//       continue;
//     }

//     if (char === ")") {
//       tokens.push({
//         type: "paren",
//         value: ")",
//       });
//       current++;
//       continue;
//     }

//     // 检查空格
//     const WHITESPACE = /\s/;

//     if (WHITESPACE.test(char)) {
//       current++;
//       continue;
//     }

//     // 检查number
//     const NUMBERS = /[0-9]/;
//     if (NUMBERS.test(char)) {
//       let value = "";

//       while (NUMBERS.test(char)) {
//         value += char;
//         char = input[++current];
//       }
//       tokens.push({ type: "number", value });
//       // 每次都是在一个判断语句中进行continue
//       continue;
//     }

//     if (char === '"') {
//       let value = "";
//       // 略过'"'
//       char = input[++current];
//       while (char !== '"') {
//         value += char;
//         char = input[++current];
//       }
//       char = input[++current];
//       tokens.push({ type: "string", value });
//       continue;
//     }

//     const LETTERS = /[a-z]/i;
//     if (LETTERS.test(char)) {
//       let value = "";

//       while (LETTERS.test(char)) {
//         value += char;
//         char = input[++current];
//       }
//       tokens.push({ type: "name", value });
//       continue;
//     }

//     throw new TypeError("I dont know what this character is: " + char);
//   }
//   return tokens;
// }

// const tokens = tokenizer("(add 2 (subtract 4 2))");
// console.log(tokens);

// type AstNode = {
//   name: string;
//   type: string;
//   params?: AstNode[];
// };
// interface AST {
//   type: "Program";
//   body: AstNode[];
//   _context: AstNode[];
// }
// function parser(tokens: Array<Token>): AST {
//   let current = 0;
//   function walk() {
//     let token = tokens[current];
//     if (token.type === "number") {
//       current++;
//       return {
//         type: "NumberLiteral",
//         value: token.value,
//       };
//     }

//     if (token.type === "name") {
//       current++;
//       return {
//         type: "StringLiteral",
//         value: token.value,
//       };
//     }

//     if (token.type === "paren" && token.value === "(") {
//       token = tokens[++current];
//       let node = {
//         type: "CallExpression",
//         name: token.value,
//         params: [],
//       };

//       token = tokens[++current];

//       while (
//         token.type !== "paren" ||
//         (token.type === "paren" && token.value !== ")")
//       ) {
//         (node.params as Array<any>).push(walk());
//         token = tokens[current];
//       }

//       current++;

//       return node;
//     }
//     throw new TypeError(token.type);
//   }

//   let ast: AST = {
//     type: "Program",
//     body: [],
//     _context: [],
//   };

//   while (current < tokens.length) {
//     (ast.body as Array<any>).push(walk());
//   }
//   return ast;
// }

// const ast = parser(tokens);
// console.log(ast);

// function traverser(ast: AST, visitor: any) {
//   function traverseArray(array: AstNode[], parent: AstNode) {
//     array.forEach((children) => {});
//   }

//   function traverseNode(node: AstNode, parent: AstNode) {}
// }

// function transformer(ast: AST) {
//   let newAst = {
//     type: "Program",
//     body: [],
//   };

//   ast._context = newAst.body;
// }
