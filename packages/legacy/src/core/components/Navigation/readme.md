# Navigation

This component is intended to be a common wrapper for a group of links or buttons. It sets a minimal layout, semantic markup and spacing for each of those elements.

<!-- example -->
```jsx
import { Navigation } from 'ui-kit-core/components/Navigation';

const TestComponent = () => (
  <div>
      <Navigation >
          <Button>Portfolio</Button>
          <Button>About</Button>
      </Navigation>

      <Navigation type="vertical">
          <Button>Portfolio</Button>
          <Button>About</Button>
      </Navigation>
  </div>
);
```

## Import
```jsx
import { Navigation } from 'ui-kit-core';
// or
import { Navigation } from 'ui-kit-core/components/Navigation';
```

## Properties

| Name        | Type      | Default      | Description                                                            |
|:------------|:----------|:-------------|:-----------------------------------------------------------------------|
| `children`  | `Node`    | -            | Menu contents. Usually `SubMenu` or `MenuItem`.                        |
| `className` | `String`  | -            | Set a custom class styles to style the navigation.                     |
| `theme`     | `Object`  | -            | Theme object with classnames that will be used to style the component. |
| `type`      | `String`  | `horizontal` | Type of the navigation, it can be `vertical` or `horizontal`.          |
| `wrap`      | `Boolean` | `false`      | If `true`, navigation items can wrap onto multiple lines.              |

## Theme

| Name         | Description                                            |
|:-------------|:-------------------------------------------------------|
| `horizontal` | Used for the root element if the layout is horizontal. |
| `vertical`   | Used for the root element if the layout is vertical.   |
