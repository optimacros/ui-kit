# Toolbar

<!-- example -->
```jsx
import { Toolbar } from 'ui-kit-core/components/Toolbar';

const TestComponent = () => {
    return (
      <div>
          <Toolbar> 
              <Button label="cancel" />
              <Button label="submit" bordered /> 
          </Toolbar>

          <Toolbar align="center" small > 
              <Button label="cancel" />
              <Button label="submit" bordered /> 
          </Toolbar>
      </div> 
    )
};
```

## Import
```jsx
import { Toolbar } from 'ui-kit-core';
// or
import { Toolbar } from 'ui-kit-core/components/Toolbar';
```

## Properties

| Name        | Type      | Default | Description                                                                   |
|:------------|:----------|:--------|:------------------------------------------------------------------------------|
| `children`  | `Node`    | -       | Toolbar content.                                                              |
| `className` | `String`  | -       | Set a custom class styles to style the root component.                        |
| `align`     | `String`  | `left`  | The variant of position. It can be `right`, `rightInRow`, `left` or `center`. |
| `small`     | `Boolean` | `false` | If `true`, toolbar will have less margin top.                                 |

