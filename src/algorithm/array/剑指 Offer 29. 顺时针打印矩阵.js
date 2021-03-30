// 输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字。



//  

// 示例 1：

// 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
// 输出：[1,2,3,6,9,8,7,4,5]
// 示例 2：

// 输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
// 输出：[1,2,3,4,8,12,11,10,9,5,6,7]
//  

// 限制：

// 0 <= matrix.length <= 100
// 0 <= matrix[i].length <= 100

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/shun-shi-zhen-da-yin-ju-zhen-lcof
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {

    let { length: rowLen } = matrix
    if (!rowLen) return []
    let { length: colLen } = matrix[0]

    const result = []
    const size = rowLen * colLen


    let top = 0,
        right = colLen - 1,
        bottom = rowLen - 1,
        left = 0

    while (result.length !== size) {
        for (let i = left; i <= right; i++) {
            result.push(matrix[top][i])
        }
        top++
        for (let i = top; i <= bottom; i++) {
            result.push(matrix[i][right])
        }
        right--
        if (result.length === size) break
        for (let i = right; i >= left; i--) {
            result.push(matrix[bottom][i])
        }
        bottom--
        for (let i = bottom; i >= top; i--) {
            result.push(matrix[i][left])
        }
        left++
    }
    return result
};