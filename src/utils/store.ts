// type VueStoreOptions<Modules, Mutations> = {
//     modules: Modules;
//     mutations: Mutations;
// };

// type Values<Modules> = {
//     [K in keyof Modules]: Modules[K];
// }[keyof Modules];

// type obj = {
//     a: "a";
//     b: "b";
// };

// type GetModulesMutationKeys<Modules> = {
//     [K in keyof Modules]: GetModuleMutationKeys<Modules[K], K>;
// }[keyof Modules];
// type Action<Modules, Mutations> = Values<Modules>;

// type Store<Modules, Mutations> = {
//     dispatch(action: Action<Modules, Mutations>): void;
// };
// declare const createStore: <Modules, Mutations>(
//     VueStoreOptions: VueStoreOptions<Modules, Mutations>
// ) => Store<Modules, Mutations>;
// const store = createStore({
//     mutations: {
//         root() {},
//     },
//     modules: {
//         cart: {
//             mutations: {
//                 add() {},
//                 remove() {},
//             },
//         },
//         user: {
//             mutations: {
//                 login() {},
//             },
//             modules: {
//                 admin: {
//                     mutations: {
//                         login() {},
//                     },
//                 },
//             },
//         },
//     },
// });

export class ObjectManipulator<T> {
    constructor(protected obj: T) {}

    public set<K extends string, V>(
        key: K,
        value: V
    ): ObjectManipulator<T & { K: V }> {
        return new ObjectManipulator({ ...this.obj, [key]: value } as T & {
            K: V;
        });
    }

    public get<K extends keyof T>(key: K): T[K] {
        return this.obj[key];
    }

    public delete<K extends keyof T>(key: K): ObjectManipulator<Omit<T, K>> {
        const newObj = { ...this.obj };
        delete newObj[key];
        return new ObjectManipulator(newObj);
    }

    public getObject(): T {
        return this.obj;
    }
}

const object = new ObjectManipulator({ name: "liwuzhou", age: "23" });
const name = object.delete("name");
// name.get('age')

type BigHippoType = {
    readonly name: string;
    readonly age: number;
};
// 将只读的属性变为可变的
type Mutable<T> = {
    -readonly [K in keyof T]: T[K];
};
type BigHippoTypeMutable = Mutable<BigHippoType>;

// pick选择某些属性  omit移除某些属性
