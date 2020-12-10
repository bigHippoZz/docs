interface Action<T> {
  payload?: T;
  type: string;
}

class EffectModule {
  count = 1;
  message = "hello!";

  delay(input: Promise<number>) {
    return input.then((i) => ({
      payload: `hello ${i}!`,
      type: "delay",
    }));
  }

  setMessage(action: Action<Date>) {
    return {
      payload: action.payload!.getMilliseconds(),
      type: "set-message",
    };
  }
}

// 修改 Connect 的类型，让 connected 的类型变成预期的类型
type Connect = (module: EffectModule) => NextContainer<EffectModule>;

const connect: Connect = (m) => ({
  delay: (input: number) => ({
    type: "delay",
    payload: `hello 2`,
  }),
  setMessage: (input: Date) => ({
    type: "set-message",
    payload: input.getMilliseconds(),
  }),
});


type PickFunctionKeys<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

type NextContainer<T> = {
  [K in PickFunctionKeys<T>]: T[K] extends (
    args: Promise<infer V>
  ) => Promise<infer U>
    ? (val: V) => U
    : T[K] extends (args: Action<infer V>) => Action<infer U>
    ? (args: V) => Action<U>
    : never;
};
export const connected = connect(new EffectModule());


