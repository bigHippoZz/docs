const strStr = function (haystack, needle) {
    if (needle === "") return 0;
    if (haystack === "") return -1;
    let { length } = needle;
    let inc = [];
    // 计算偏移量
    for (let i = 0; i < length; i++) {
        for (let j = 0; j <= i; j++) {
            if (needle[j] !== needle[i - j]) {
                inc[i] = j + 1;
                break;
            }

            if (j === i && needle[j] === needle[i - j]) {
                inc[i] = j + 1;
            }
        }
    }
    console.log(inc);
    // let i = 0;
    // let l = needle.length;
    // while (i < haystack.length) {
    //     for (let j = 0; j < l; j++) {
    //         if (needle[j] !== haystack[i + j]) {
    //             i += inc[j];
    //             break;
    //         }
    //         if (j === l - 1 && needle[j] === haystack[i + j]) {
    //             return i;
    //         }
    //     }
    // }
    // return -1;
};
// strStr("hello", "ll");
// (function (string) {
//     let { length } = string;
//     const result = [];
//     for (let index = 0; index < length; index++) {
//         for (let j = 0; j <= index; j++) {
//             result.push(string.slice(j, index));
//         }
//     }
// })("hello");
