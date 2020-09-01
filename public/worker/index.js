function fib(num) {
    function _(num) {
        if (num == 1) return 1;
        if (num == 2) return 1;
        return _(num - 1) + _(num - 2);
    }
    return _(num);
}
postMessage(fib(20));
// console.log(this);
// this.onmessage = function ({ data }) {
//     console.log(data);
//     fib(data);
//     // fib(arguments[0].data);
// };

// let name = "worker";
