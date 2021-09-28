import { createApp } from "vue";
import App from "./App.vue";
import { setupAppRouter } from "./routers";

const app = createApp(App);
setupAppRouter(app);
app.mount("#app");

// class TreeNode {
//   val: number;
//   left: TreeNode | null;
//   right: TreeNode | null;
//   constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
//     this.val = val === undefined ? 0 : val;
//     this.left = left === undefined ? null : left;
//     this.right = right === undefined ? null : right;
//   }
// }

// function pathSum(root: TreeNode | null, targetSum: number): number {
//   let ans = 0;

//   function helper(root: TreeNode | null) {
//     if (!root) return 0;
//     const left = helper(root.left);
//     const right = helper(root.right);
//     if (left === targetSum) ans++;
//     if (right === targetSum) ans++;
//   }
//   return ans;
// }
