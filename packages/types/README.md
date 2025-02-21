# @optimacros-ui/types

A comprehensive collection of utility types for TypeScript development within the Optimacros UI ecosystem.

## Installation

```bash
npm install @optimacros-ui/types
```

## Usage

Import all types using the namespace import:

```typescript
import * as $ from '@optimacros-ui/types';
```

## Available Type Utilities


### Immutable Types (`immutable.d.ts`)
Types for using with immutable JS

```typescript
export type ImmutableArrayLike<T = unknown> =
    | Collection.Indexed<T>
    | Collection.Set<T>
    | List<T>
    | Stack<T>
    | Seq.Indexed<T>
    | Seq.Set<T>
    | Set<T>
    | OrderedSet<T>;

export type IsArrayLike<T> = T extends ImmutableArrayLike ? 1 : 0;

export type ImmutableObjectLike =
    | Collection.Keyed<any, any>
    | OrderedMap<any, any>
    | _Record<any>
    | Map<any, any>
    | Seq.Keyed<any, any>;

export type IsObjectLike<T> = T extends ImmutableObjectLike ? 1 : 0;

export type MapFromObject<T> = [
    ValuesUnion<{
        [K in keyof T]: [K, T[K]];
    }>,
];
```

### Object Types (`object.d.ts`)
Utility types for object manipulation and transformation.

```typescript
export namespace Exclude {
    /** exclude all fields where values = never */
    export type Never<T extends object> = Object.Filter<T, never, 'equals'>;

    /**
     * @example
     *   type WithoutNumbers = Object.Exclude.OfType<{iam: string; biam: number}, number, 'equals'>;
     */
    export type OfType<
        T extends Record<string, any>,
        KT,
        match extends Match = 'default',
    > = Object.Filter<T, KT, match>;

    export type NonNullable<T extends Record<string, any>> = Object.Filter<
        {
            [K in keyof T]: Is.EmptyObject<T[K]> extends 1 ? 'remove' : T[K];
        },
        'remove',
        'equals'
    >;
}

export type Values<T> = UnionToTuple<ValuesUnion<T>>;

export type Keys<T> = UnionToTuple<KeysUnion<T>>;
```

### Path Types (`paths.d.ts`)
Types for handling nested object paths and access.

```typescript
type Path<T> = $.Path<T>;
type PathValue<T, P extends Path<T>> = $.PathValue<T, P>;
```

### String Types (`string.d.ts`)
String manipulation and pattern matching types.

```typescript
type StringLiteral<T> = $.StringLiteral<T>;
type CamelCase<T> = $.CamelCase<T>;
type KebabCase<T> = $.KebabCase<T>;
```

### Tuple Types (`tuple.d.ts`)
Types for working with tuples and fixed-length arrays.

```typescript
type Tuple<T, N extends number> = $.Tuple<T, N>;
type UnionToTuple<T> = $.UnionToTuple<T>;
```

### Utility Types (`utils.d.ts`)
General purpose utility types.

```typescript
type Nullable<T> = $.Nullable<T>;
type Optional<T> = $.Optional<T>;
type NonNullable<T> = $.NonNullable<T>;
```

## Examples

### Working with Objects

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

// Get keys of User interface
type UserKeys = $.Object.Keys<User>; // 'id' | 'name' | 'email'
```

### Using Immutable Types

```typescript
interface Config {
  theme: {
    primary: string;
    secondary: string;
  };
  features: string[];
}

type ImmutableConfig = $.ReadonlyDeep<Config>;

// Now all properties are readonly
const config: ImmutableConfig = {
  theme: {
    primary: '#000',
    secondary: '#fff'
  },
  features: ['dark-mode', 'rtl']
};

// Error: Cannot modify readonly property
config.theme.primary = '#333'; // TypeError
```

### Path Types for Safe Object Access

```typescript
interface NestedData {
  user: {
    profile: {
      settings: {
        notifications: boolean;
      };
    };
  };
}

type ValidPath = $.Path<NestedData>; // 'user.profile.settings.notifications'
type NotificationValue = $.PathValue<NestedData, 'user.profile.settings.notifications'>; // boolean
```

### String Transformations

```typescript
type Original = 'user-profile-settings';
type Camel = $.CamelCase<Original>; // 'userProfileSettings'
type Kebab = $.KebabCase<'userProfileSettings'>; // 'user-profile-settings'
```

## Type Safety

The package is designed to maintain strict type safety:

```typescript
// Example of type safety in action
interface Data {
  count: number;
  items: string[];
}

type ReadonlyData = $.ReadonlyDeep<Data>;

const data: ReadonlyData = {
  count: 0,
  items: ['a', 'b']
};

// TypeScript Error: Cannot assign to 'count' because it is a read-only property
data.count = 1;

// TypeScript Error: Property 'push' does not exist on type 'readonly string[]'
data.items.push('c');
```

## Best Practices

1. **Import Convention**
   ```typescript
   import * as $ from '@optimacros-ui/types';
   ```
   This makes it clear that you're using utility types and prevents naming conflicts.

2. **Type Composition**
   ```typescript
   type SafeUserData = $.ReadonlyDeep<$.NonNullable<UserData>>;
   ```
   Combine utility types to create more specific type guarantees.

3. **Type Inference**
   Let TypeScript infer types where possible to avoid redundancy:
   ```typescript
   const data = {} as const;
   type DataType = $.Object.Keys<typeof data>;
   ```


## Related Packages
- [ts-toolbelt](https://github.com/millsp/ts-toolbelt)
- [type-fest](https://github.com/sindresorhus/type-fest)