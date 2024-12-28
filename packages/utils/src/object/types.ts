export type RenameProps<prefix extends string, Obj extends Record<string, any>> = {
    [Key in keyof Obj as `${prefix}${Key & string}`]: Obj[Key];
};

export type RenameValues<prefix extends string, Obj extends Record<string, any>> = {
    [Key in keyof Obj]: `${prefix}${Obj[Key] & string}`;
};

export type PropsToValues<Obj extends Record<string, string>> = {
    [Key in keyof Obj as `${Obj[Key] & string}`]: `${Key & string}`;
};
