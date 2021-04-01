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

// console.log(tokenizer("(add 2 (subtract 4 2))"));

// (add 2 (subtract 4 2))   =>   [{ type: 'paren', value: '(' }, ...]

function parser(tokens) {
  let current = 0;

  function walk() {
    let token = tokens[current];

    if (token.type === "number") {
      current++;
      return {
        type: "NumberLiteral",
        value: token.value,
      };
    }
    if (token.type === "string") {
      current++;

      return {
        type: "StringLiteral",
        value: token.value,
      };
    }
    if (token.type === "paren" && token.value === "(") {
      token = tokens[++current];
      let node = {
        type: "CallExpression",
        name: token.value,
        params: [],
      };

      token = tokens[++current];

      while (
        token.type !== "paren" ||
        (token.type === "paren" && token.value !== ")")
      ) {
        // 我们调用`walk`函数，`walk`函数会返回一个节点然后我们将这个节点添加到我们的`node.params`。
        node.params.push(walk());
        token = tokens[current];
      }

      current++;

      // 返回这个节点。
      return node;
    }

    throw new TypeError(token.type);
  }

  let ast = {
    type: "Program",
    body: [],
  };
  while (current < tokens.length) {
    ast.body.push(walk());
  }
  return ast;
}

// console.log(parser(tokenizer("(add 2 (subtract 4 2))")));

// console.log(transformer(parser(tokenizer("(add 2 (subtract 4 2))"))));

function traverser(ast, visitor) {
  // `traverseArray`函数，这个函数允许我们遍历一个数组并且调用我们接下来定义的函数："traverseNode`。
  function traverseArray(array, parent) {
    array.forEach((child) => {
      traverseNode(child, parent);
    });
  }

  // `traverseNode`函数会接收一个节点以及这个节点的父节点。这样它就可以将这两个参数传递给我们
  // 的访问者对象的方法。
  function traverseNode(node, parent) {
    //我们首先检测访问者对象是否含有一个匹配当前类型节点的方法。
    let methods = visitor[node.type];

    // 如果当前类型节点有相匹配的`enter`方法，我们调用这个方法`enter`方法并传入节点以及父节点。
    if (methods && methods.enter) {
      methods.enter(node, parent);
    }

    // 接下来我们根据当前节点类型分情况处理。
    switch (node.type) {
      // 我们从最顶层的`Program`开始。由于Program节点的body属性是一个节点数组，我们调用
      // `traverseArray`函数来向下遍历它们。
      //
      // （请注意'traverseArray`会调用`traverseNode`所以我们会递归地遍历抽象语法树。）
      case "Program":
        traverseArray(node.body, node);
        break;

      // 对于`CallExpression`节点，我们遍历它的`params`属性。
      case "CallExpression":
        traverseArray(node.params, node);
        break;

      // 对于`NumberLiteral`和`StringLiteral`的情况，我们并没有任何子节点去访问，所以我们
      // 直接break。
      case "NumberLiteral":
      case "StringLiteral":
        break;

      // 同样的，如果出现没有匹配的情况，我们抛出一个错误。
      default:
        throw new TypeError(node.type);
    }

    // 如果访问者对象针对当前类型节点存在着一个`exit`方法的话，我们在这里调用它并传入节点和父节点。
    if (methods && methods.exit) {
      methods.exit(node, parent);
    }
  }

  // 最后，我们通过调用`traverseNode`并传入ast和null来开始遍历。这里传入null作为父节点的原
  // 因是因为抽象语法树的根节点并没有父节点。
  traverseNode(ast, null);
}

function transformer(ast) {
  // 我们会创建一个`newAst`，这个新抽象语法树和之前的抽象语法树一样有一个Program节点。
  let newAst = {
    type: "Program",
    body: [],
  };

  // 接下来我会小小地作弊一下并使用一个小小的hack。我们会给父节点添加一个`context`属性，我们
  // 会将子节点添加到它们的父节点的`context`属性中。通常情况下你会有一个比这个更好的抽象，
  // 但是针对我们的目的这样做更简洁。
  //
  // 只要记住`context`是一个从旧的抽象语法树到新的抽象语法树的引用即可。
  ast._context = newAst.body;

  // 我们从调用traverser函数并传入抽象语法树和访问者对象开始。
  traverser(ast, {
    // 访问者对象处理的第一种情况是`NumberLiteral`节点。
    NumberLiteral: {
      // 我们会在进入节点的时候访问节点。
      enter(node, parent) {
        //我们创建一个`NumberLiteral`类型的新节点并添加到父节点的`context`。
        parent._context.push({
          type: "NumberLiteral",
          value: node.value,
        });
      },
    },

    // 接下来是`StringLiteral`类型节点。
    StringLiteral: {
      enter(node, parent) {
        parent._context.push({
          type: "StringLiteral",
          value: node.value,
        });
      },
    },

    // 接着是`CallExpression`类型节点。
    CallExpression: {
      enter(node, parent) {
        // 我们创建一个新的`CallExpression`类型节点，这个新节点还有一个嵌套的`Identifier`对象。
        let expression = {
          type: "CallExpression",
          callee: {
            type: "Identifier",
            name: node.name,
          },
          arguments: [],
        };

        // 接下来我们给原始的`CallExpression`节点定义一个`context`属性。这个属性指向
        // `expression`的arguments属性，这样我们就可以添加参数了。
        node._context = expression.arguments;

        // 接下来我们检测父节点是否是一个`CallExpression`，如果不是的话……
        if (parent.type !== "CallExpression") {
          // 我们将我们的`CallExpression`节点包裹在`ExpressionStatement`节点中。
          // 我们这样做的原因是因为JS中顶层的`CallExpression`实际上是语句。
          expression = {
            type: "ExpressionStatement",
            expression: expression,
          };
        }

        // 最后，我们将我们的`CallExpression`（可能被包裹）添加到父节点的`context`属性。
        parent._context.push(expression);
      },
    },
  });

  // 最后，转换器会返回我们刚刚创造的全新抽象语法树。
  return newAst;
}

function codeGenerator(node) {
  // 我们根据节点类型分情况处理。
  switch (node.type) {
    // 如果我们有一个`Program`节点。我们会使用代码生成器遍历`body`属性中的所有节点然后使用
    // 换行符\n连接起来。
    case "Program":
      return node.body.map(codeGenerator).join("\n");

    // 针对`ExpressionStatement`我们会对节点的expression属性调用代码生成器，并加上一个分号……
    case "ExpressionStatement":
      return (
        codeGenerator(node.expression) + ";" // << (...because we like to code the *correct* way)
      );

    // 针对`CallExpression`我们会打印出`callee`，也就是函数名，加上一个开括号，我们会对
    // `arguments`数组中的每一个节点调用代码生成器，使用逗号连接它们，然后我们添加一个闭括号。
    case "CallExpression":
      return (
        codeGenerator(node.callee) +
        "(" +
        node.arguments.map(codeGenerator).join(", ") +
        ")"
      );

    // 针对`Identifier`，我们简单地返回节点的name属性。
    case "Identifier":
      return node.name;

    // 针对`NumberLiteral`，我们简单地返回节点的值。
    case "NumberLiteral":
      return node.value;

    // 针对StringLiteral`，我们在节点value周围加上引号。
    case "StringLiteral":
      return '"' + node.value + '"';

    // 如果没有匹配，我们抛出一个错误。
    default:
      throw new TypeError(node.type);
  } 
}
// console.time("time");
// console.log(codeGenerator(transformer(parser(tokenizer("(add 2 2)"))))); 
// console.timeEnd("time");
