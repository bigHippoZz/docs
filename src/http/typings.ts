import { Ref } from "vue";

export interface State<D, P> {
  data: Ref<D | undefined>;
  error: Ref<undefined | Error>;
  loading: Ref<boolean>;
  params: Ref<P>;
}

export interface QueryState<D, P extends unknown[]> extends State<D, P> {
  run: (...args: P) => Promise<D>;
  cancel: () => void;
  refresh: () => Promise<D>;
}

export type Query<D, P extends unknown[]> = (...args: P) => Promise<D>;

type ServiceObject = Partial<RequestInfo> & {
  url: string;
  [key: string]: any;
};

type ServiceParams = string | ServiceObject;

export type IService<D, P extends unknown[]> =
  | ServiceParams
  | (() => ServiceParams)
  | Promise<D>
  | Query<D, P>;
