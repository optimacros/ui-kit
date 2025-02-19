# @optimacros-ui/utils

A comprehensive utility package that extends lodash and radash with additional functionality for the Optimacros UI ecosystem.

## Installation

```bash
npm install @optimacros-ui/utils
```

## Features

This package provides utility functions organized into several categories:

### Arrays
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
import { arrays, dates, objects } from '@optimacros-ui/utils';
```

### Array Operations

```typescript
import { arrays } from '@optimacros-ui/utils';

// Array manipulation
const updatedArray = arrays.update(originalArray, index, newValue);
const filteredArray = arrays.filter(array, predicate);
const uniqueValues = arrays.uniq(array);

// Matrix operations
const matrix = arrays.createMatrix(rows, columns);
const transposed = arrays.transposeMatrix(matrix);
```

### Date Operations

```typescript
import { dates } from '@optimacros-ui/utils';

// Date formatting
const formatted = dates.formatDate(date, 'yyyy-MM-dd');
const range = dates.formatRange(startDate, endDate);

// Calendar utilities
const monthDays = dates.getMonthDays(date);
const weekDays = dates.getWeekDays(date);
const monthNames = dates.getMonthNames(locale);
```

### Object Operations

```typescript
import { objects } from '@optimacros-ui/utils';

// Object manipulation
const flat = objects.flatNestedObject(nestedObj);
const prefixed = objects.prefixProps(obj, 'prefix-');
const traversed = objects.traverse(obj, callback);

// Tree operations
const found = objects.searchTree(tree, predicate);
```

### React Hooks

```typescript
import { react } from '@optimacros-ui/utils';

function Component() {
  // Event listener hook
  react.useEventListener('resize', handleResize);

  // Form handling
  const form = react.useForm({
    initialValues,
    onSubmit,
    validate
  });

  // Text shortening
  const [text, toggle] = react.useTextShortener(longText, maxLength);

  return <div>{text}</div>;
}
```

### Style Utilities

```typescript
import { base } from '@optimacros-ui/utils';

// Class name handling
const className = base.clsx('base-class', {
  'conditional-class': condition,
  'another-class': true
});

// Component variants
const button = base.cva({
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
import { _ } from '@optimacros-ui/utils';

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
   import { arrays } from '@optimacros-ui/utils';
   
   // Instead of
   import * as utils from '@optimacros-ui/utils';
   ```

2. **Immutability**
   ```typescript
   // Use immutable operations when possible
   const newArray = arrays.update(oldArray, index, newValue);
   
   // Instead of
   oldArray[index] = newValue;
   ```

3. **Type Safety**
   ```typescript
   // Leverage TypeScript for better type safety
   const result = objects.searchTree<MyType>(tree, predicate);
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

## Common Patterns

### Working with Dates

```typescript
import { dates } from '@optimacros-ui/utils';

// Format dates consistently
const formatDate = (date: Date) => {
  return dates.formatDate(date, {
    format: 'yyyy-MM-dd',
    locale: 'en-US'
  });
};

// Work with date ranges
const formatDateRange = (start: Date, end: Date) => {
  return dates.formatRange(start, end, {
    format: 'MMM dd, yyyy',
    separator: ' - '
  });
};
```

### Component Styling

```typescript
import { base } from '@optimacros-ui/utils';

const styles = base.cva({
  base: 'common classes',
  variants: {
    intent: {
      primary: 'primary classes',
      secondary: 'secondary classes'
    },
    size: {
      small: 'small classes',
      large: 'large classes'
    }
  },
  defaultVariants: {
    intent: 'primary',
    size: 'small'
  }
});
```

### File Handling

```typescript
import { file } from '@optimacros-ui/utils';

const fileInput = {
  accept: file.adaptAcceptParam(['image/*', '.pdf', '.doc']),
  onChange: (event) => {
    const files = event.target.files;
    const validFiles = Array.from(files).filter(file => 
      file.mimeMap.isValidType(file.type)
    );
  }
};
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT

## Related Packages
- @optimacros-ui/core
- @optimacros-ui/types
- lodash
- radash