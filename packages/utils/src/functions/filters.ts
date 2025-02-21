import isNull from 'lodash-es/isNull';

export const filter = {
    gt: (a: number, b: number) => a > b,
    gte: (a: number, b: number) => a >= b,
    lt: (a: number, b: number) => a < b,
    lte: (a: number, b: number) => a <= b,
    eq: (a: number, b: number) => a === b,
    startsWith: (v: string, other: string) => v.startsWith(other),
    endsWith: (v: string, other: string) => v.endsWith(other),
    contains: (v: string, other: string) => v.includes(other),
    notContains: (v: string, other: string) => !v.includes(other),
    not: (v, other) => v !== other,
    notNull: (v) => !isNull(v),
} as const;
