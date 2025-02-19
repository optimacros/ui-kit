# @optimacros-ui/utils

A comprehensive utility package that extends lodash and radash with additional functionality for the Optimacros UI ecosystem.

## Installation

```bash
npm install @optimacros-ui/utils
```

## Features

This package provides utility functions organized into several categories:

### IndexedUtils
- Native array operations
- Matrix operations
- Sorting and filtering
- Unique value handling
- Array manipulation (add, delete, update)

### Base Utilities
- Class name utilities (clsx)
- Color manipulation
- Component variant handling (cva)
- Date localization
- Event handling
- React children filtering
- Browser detection
- Component type checking
- Style merging
- Tailwind utilities

### Date Utilities
- Date formatting and parsing
- Range formatting
- Week/Month calculations
- Era formatting
- Day/Month names
- Pagination
- Duration handling

### Element Utilities
- Viewport calculations
- DOM manipulation

### File Handling
- MIME type mapping
- File accept parameter adaptation

### Function Utilities
- Immutable operations
- Predicate functions
- Property renaming
- Sorting snippets
- Tag handling

### Immutable Utilities
- Extendable objects
- Tuple mapping
- Immutable data structures

### Object Utilities
- Nested object flattening
- Immutable maps
- Property prefixing
- Tree searching
- Object traversal

### React Hooks
- Event listeners
- Form handling
- Layout effects
- Text shortening
- Reference helpers

### String Utilities
- Common regular expressions
- String manipulation

## Usage

### Basic Import

```typescript
import { IndexedUtils, map, clone } from '@optimacros-ui/utils';
```

### Array Operations

```typescript
import { IndexedUtils } from '@optimacros-ui/utils';

// Array manipulation
const updatedArray = IndexedUtils.update(originalArray, index, newValue);
const filteredArray = IndexedUtils.filter(array, predicate);
const uniqueValues = IndexedUtils.uniq(array);

// Matrix operations
const matrix = IndexedUtils.createMatrix(rows, columns);
const transposed = IndexedUtils.transposeMatrix(matrix);
```

### Date Operations

```typescript
import { formatDate, formatRange } from '@optimacros-ui/utils';

// Date formatting
const formatted = formatDate(date, 'yyyy-MM-dd');
const range = formatRange(startDate, endDate);

```

### Object Operations

```typescript
// Object manipulation
const flat = flatNestedObject(nestedObj);
const prefixed = prefixProps(obj, 'prefix-');
const traversed = traverse(obj, callback);

// Tree operations
const found = searchTree(tree, predicate);
```


### Style Utilities

```typescript
import { clsx, cva } from '@optimacros-ui/utils';

// Class name handling
const className = clsx('base-class', {
  'conditional-class': condition,
  'another-class': true
});

// Component variants
const button = cva({
  base: 'button-base',
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-lg'
    }
  }
});
```

## Integration with Lodash and Radash

This package extends functionality from both lodash and radash:

```typescript
import * as _ from '@optimacros-ui/utils';

// Using lodash functions
_.map(array, mapper);
_.filter(array, predicate);

// Using radash functions
_.pipe(value, ...functions);
_.isNil(value);
```

## Best Practices

1. **Imports**
   ```typescript
   // Prefer specific imports for better tree-shaking
   import { IndexedUtils } from '@optimacros-ui/utils';
   
   // Instead of
   import * as utils from '@optimacros-ui/utils';
   ```

2. **Immutability**
   ```typescript
   // Use immutable operations when possible
   const newArray = IndexedUtils.update(oldArray, index, newValue);
   
   // Instead of
   oldArray[index] = newValue;
   ```

3. **Type Safety**
   ```typescript
   // Leverage TypeScript for better type safety
   const result = searchTree<MyType>(tree, predicate);
   ```

## Performance Considerations

1. **Array Operations**
   - Use native array methods for simple operations
   - Use utility functions for complex operations or when immutability is required

2. **Object Operations**
   - Consider memoization for expensive operations
   - Use shallow copies when deep copies aren't necessary

3. **React Hooks**
   - Use memoization when appropriate
   - Consider the cost of re-renders



## Related Packages
- [lodash](https://lodash.com)
- [radash](https://radash-docs.vercel.app/docs/getting-started)