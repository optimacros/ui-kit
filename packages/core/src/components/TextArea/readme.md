# TextArea

<!-- example -->
```jsx
import { TextArea } from 'ui-kit-core/components/TextArea';

const TestComponent = () => {
    return (
      <div>
          <TextArea label="Description" /> 
          <TextArea label="Description" error="Some error" />
          <TextArea label="Description" error={<div>Some error</div>} />
      </div> 
    )
};
```

## Import
```jsx
import { TextArea } from 'ui-kit-core';
// or
import { TextArea } from 'ui-kit-core/components/TextArea';
```

## Properties

| Name                 | Type               | Default | Description                                            |
|:---------------------|:-------------------|:--------|:-------------------------------------------------------|
| `classNameContainer` | `String`           | -       | Set a custom class styles to style the root component. |
| `className`          | `String`           | -       | Set a custom class styles to style the `textarea`.     |
| `error`              | `String` or `Node` | -       | The error content.                                     |
| `label`              | `String`           | -       | The label content.                                     |

