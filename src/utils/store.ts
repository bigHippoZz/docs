type VueStoreOptions<Modules, Mutations> = {
    modules: Modules;
    mutations: Mutations;
};

type Values<Modules> = {
    [K in keyof Modules]: Modules[K];
}[keyof Modules];

type obj = {
    a: "a";
    b: "b";
};

type GetModulesMutationKeys<Modules> = {
    [K in keyof Modules]: GetModuleMutationKeys<Modules[K], K>;
}[keyof Modules];
type Action<Modules, Mutations> = Values<Modules>;

type Store<Modules, Mutations> = {
    dispatch(action: Action<Modules, Mutations>): void;
};
declare const createStore: <Modules, Mutations>(
    VueStoreOptions: VueStoreOptions<Modules, Mutations>
) => Store<Modules, Mutations>;
const store = createStore({
    mutations: {
        root() {},
    },
    modules: {
        cart: {
            mutations: {
                add() {},
                remove() {},
            },
        },
        user: {
            mutations: {
                login() {},
            },
            modules: {
                admin: {
                    mutations: {
                        login() {},
                    },
                },
            },
        },
    },
});

store.dispatch();
