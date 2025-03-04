export type Selector<State> = (store: State, ...params) => any;

export type Slice<A = Record<string, (state, payload) => any>> = {
    actions: A;
};
