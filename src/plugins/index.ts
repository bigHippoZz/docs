import { App } from "vue";
import naive from "naive-ui";
/**
 * 导入文件
 */
export function setupImportFile() {
  const files = import.meta.globEager("/src/dataStructure/*/**.ts");
}
/**
 * 注册组件
 * @param app
 * @returns
 */
export function registerComponent(app: App) {
  app.use(naive);
  return app;
}
