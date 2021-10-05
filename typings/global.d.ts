import type { ComponentPublicInstance, FunctionalComponent } from "vue";

declare global {
  const __DEV__: boolean;
  const __APP_INFO__: string;
  const PERFORM_SORTING: boolean;
}

declare module "vue" {
  export type JSXComponent<Props = any> =
    | { new (): ComponentPublicInstance<Props> }
    | FunctionalComponent<Props>;
}
