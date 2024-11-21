//@ts-nocheck
import { Map as _Map } from 'immutable';
import { invariant } from '../functions';
/**
 * map that is constructed by a plain array of values
 * useful for reducing code
 * @example
 * export class ThemeStyles<
  Atoms extends Array<ThemeAtom<Record<string, unknown>>> = Array<
    ThemeAtom<Record<string, unknown>>
  >,
> extends TupleMap<Atoms, 'name', ThemeAtom<Record<string, unknown>>> {
  constructor(...atoms: [...Atoms]) {
    super('name', ...atoms);
  }
 */
export class TupleMap<
    Tuple extends Array<any> = Array<any>,
    Key extends keyof Tuple[number] = keyof Tuple[number],
    Item extends Tuple[number] = Tuple[number],
    TupleRecord extends {
        [Instance in Tuple[number] as `${Instance[Key] & string}`]: Instance;
    } = {
        [Instance in Tuple[number] as `${Instance[Key] & string}`]: Instance;
    },
> {
    readonly __values__: TupleRecord;
    readonly __key__: keyof TupleRecord;
    readonly __tuple__: Tuple;

    private _values: _Map<string, Item>;

    constructor(
        protected _key: Key,
        ...values: [...Tuple]
    ) {
        this._values = _Map(
            values.map((v) => {
                return [v[this._key], v];
            }),
        );
    }

    get values() {
        return this._values;
    }

    /**
     * immutable method
     * creates a new instance with merged values
     */
    add<Add extends Array<Item>>(...values: Add) {
        const mergedParts = this._values.valueSeq().concat(...values);

        return new TupleMap(this._key, ...(mergedParts as [...Tuple, ...Add]));
    }

    clone() {
        return new TupleMap(this._key, this._values.slice());
    }

    get<K extends keyof TupleRecord>(name: K) {
        const item = this._values.get(name as string) as unknown as TupleRecord[K];

        invariant(item, `COuldnt resolve ${name as string}`);

        return item;
    }
}
