export function sortAsc(a: number | string, b: number | string) {
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
}
export function sortDesc(a: number | string, b: number | string) {
    if (a < b) {
        return 1;
    }
    if (a > b) {
        return -1;
    }
    return 0;
}
const comp =
    (order, ...props) =>
    (a, b) => {
        for (const p of props) {
            if (a[p] > b[p]) {
                return order * 1;
            }
            if (a[p] < b[p]) {
                return order * -1;
            }
        }
        return 0;
    };
export type CompareValuesArgs<T> = Array<`${keyof T & string}:asc` | `${keyof T & string}:desc`>;
export function compareValues<T extends object>(...props: CompareValuesArgs<T>) {
    return (a: T, b: T) => {
        for (const p of props) {
            const [prop, type] = p.split(':');
            const order = type === 'asc' ? 1 : -1;
            if (a[prop] > b[prop]) {
                return order * 1;
            }
            if (a[prop] < b[prop]) {
                return order * -1;
            }
        }
        return 0;
    };
}
export function sortByManyPropsAsc<T>(...props: Array<keyof T>) {
    return comp(1, ...props);
}

export function sortByManyPropsDesc<T>(...props: Array<keyof T>) {
    return comp(-1, ...props);
}
