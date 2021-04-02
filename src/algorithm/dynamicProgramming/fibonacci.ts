// function fib(n: number): number {
//   const catchMap = new Map<number, number>();

//   function helper(number: number): number {
//     if (catchMap.has(number)) {
//       return catchMap.get(number) as number;
//     }
//     if (number <= 1) {
//       return 1;
//     }
//     if (number === 2) {
//       return 2;
//     }
//     const result = helper(number - 1) + helper(number - 2);
//     catchMap.set(number, result);
//     return result;
//   }
//   return helper(n);
// }




// function fib(n: number) {
//   const dp = new Int32Array(n + 1);
//   dp[0] = 0;
//   dp[1] = 1;
//   dp[2] = 2;
//   for (let i = 3; i <= n; i++) {
//     dp[i] = dp[i - 1] + dp[i - 2];
//   }
//   return dp[n];
// }
// console.log(fib(1000));
