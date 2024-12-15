# Loader

Minimize visual changes that occur while your app loads content by representing each operation with a single activity indicator. For example, a refresh operation should display either a refresh bar or an activity circle, but not both.

<!-- example -->
```jsx
import { Loader } from 'ui-kit-core/components/Loader';

const TestComponent = () => (
  <div>
      <Loader /> 
      <Loader disabled mode="determinate" value={40} /> 
      <Loader type="circular" multicolor /> 
      <Loader type="circular" mode="determinate" value={25} /> 
      <Loader type="linear" mode="determinate" value={34} max={100} buffer={50} />
  </div>
);
```

## Import
```jsx
import { Loader } from 'ui-kit-core';
// or
import { Loader } from 'ui-kit-core/components/Loader';
```

## Properties

| Name         | Type      | Default         | Description                                                                                                           |
|:-------------|:----------|:----------------|:----------------------------------------------------------------------------------------------------------------------|
| `className`  | `String`  | `''`            | Additional class name to provide custom styling.                                                                      |
| `theme`      | `String`  | -               | Theme object with classnames that will be used to style the component.                                                |
| `value`      | `Number`  | `0`             | Value of the current progress.                                                                                        |
| `max`        | `Number`  | `100`           | Maximum value permitted.                                                                                              |
| `min`        | `Number`  | `0`             | Minimum value permitted.                                                                                              |
| `buffer`     | `Number`  | `0`             | Value of a secondary progress bar useful for buffering.                                                               |
| `mode`       | `String`  | `indeterminate` | Mode of the progress bar, it can be `determinate` or `indeterminate`.                                                 |
| `type`       | `String`  | `linear`        | Type of the progress bar, it can be `circular` or `linear`.                                                           |
| `disabled`   | `Boolean` | `false`         | If `true`, component will be disabled.                                                                                |
| `multicolor` | `Boolean` | `false`         | If `true`, the circular progress bar will be changing its color. When type is `circular` and node is `indeterminate`. |
| `innerRef`   | `Node`    | -               | Used for ref Loader Component.                                                                                        |

## Theme

| Name            | Description                                              |
|:----------------|:---------------------------------------------------------|
| `buffer`        | Used to style the buffer element in the linear progress. |
| `circle`        | Used for the circle element in the circular progress.    |
| `circular`      | Used for the root element when the type is circular.     |
| `linear`        | Used for the root element when the type is linear.       |
| `indeterminate` | Added to the root element if mode is indeterminate.      |
| `multicolor`    | Added to the root if the component is multicolor.        |
| `path`          | Used for the inner path in the circular progress.        |
| `value`         | Used to style the value element in the linear progress.  |
