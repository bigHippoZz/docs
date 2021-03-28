// 剑指 Offer 11. 旋转数组的最小数字
// 把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。输入一个递增排序的数组的一个旋转，输出旋转数组的最小元素。例如，数组 [3,4,5,1,2] 为 [1,2,3,4,5] 的一个旋转，该数组的最小值为1。  



// 示例 1：

// 输入：[3,4,5,1,2]
// 输出：1
// 示例 2：

// 输入：[2,2,2,0,1]
// 输出：0

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/xuan-zhuan-shu-zu-de-zui-xiao-shu-zi-lcof
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


/**
 * @param {number[]} numbers
 * @return {number}
 */
var minArray = function (numbers) {
    let left = 0
    let right = numbers.length - 1
    // 这题的主要思路还是比较右侧的数值与中间数值的大小 来进行判断
    while (left < right) {
        // 取中间数值
        let min = (left + right) >> 1 
        // 判断中间数值与右侧数值的大小变化 
        // 若中间的数值大于右侧的数值说明 最小数值存在于数组的右侧 所以将左侧的指针进行右移
        // 若中间的数值小于右侧的数值 最小的数值存在于数组左侧 所以将右侧的指针进行左移
        // 细节：指针右移的时候 说明当前的中间指针肯定不是最小数字 所以将 left = min + 1 
        //      指针左移的时候 比如说 [2,1]
        // 当中间的数值与右侧的数值相同的时候
        //    1. 不断的右移出现中间的数值小于右侧的数值 然后进行左移
        //    2. 不断右移然后右侧的数值发生变化
        if (numbers[min] > numbers[right]) {
            left = min + 1
        } else if (numbers[min] < numbers[right]) {
            right = min
        } else {
            right--
        }
    }
    return numbers[left]
};

// [2,2,2,0,1]