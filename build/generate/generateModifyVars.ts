import { resolve } from "path";

export function generateModifyVars() {
  return {
    hack: `true; @import (reference) "${resolve("src/styles/conf.less")}";`,
  };
}
