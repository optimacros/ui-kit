# Tooltip

A Tooltip is useful to show information on hover in any kind of component. We have a component that can be used as a **decorator** for any kind of component. Also, it's factory function is exposed so you can create your own decorator with specific properties.

<!-- example -->
```jsx
import { Tooltip } from 'ui-kit-core/components/Tooltip';
import { Button } from 'ui-kit-core/components/Button';



const TestComponent = () => (
  <div>
      <div style={{ padding: '100px', display: 'flex', justifyContent: 'space-between' }}>
          <Tooltip composedComponent="div" tooltip="Text" tooltipPosition="left" > 
              <Button label="left" /> 
          </Tooltip> 
          <Tooltip composedComponent="div" tooltip="Text" tooltipPosition="right" > 
              <Button label="right" /> 
          </Tooltip>

          <Tooltip composedComponent="div" tooltip="Text" tooltipPosition="top" > 
              <Button label="top" /> 
          </Tooltip> 
          <Tooltip composedComponent="div" tooltip="Text" tooltipPosition="bottom" > 
              <Button label="bottom" /> 
          </Tooltip> 
      </div> 
      <Tooltip composedComponent={Button} tooltip="Text" composedComponentProps={{ label: 'Apply', }} /> 
      <Tooltip composedComponent="div" tooltip="Text" tooltipDelay={300} > 
          <Button label="delayed" /> 
      </Tooltip> 
      <Tooltip composedComponent="div" tooltip="Text" tooltipShowOnClick > 
          <Button label="Show on click" /> 
      </Tooltip> 
      <Tooltip composedComponent="div" tooltip="Text" tooltipOffset={20} > 
          <Button label="Offset" /> 
      </Tooltip>
  </div>
);
```

## Import
```jsx
import { Tooltip } from 'ui-kit-core';
// or
import { Tooltip } from 'ui-kit-core/components/Tooltip';
```

## Properties

In any component you decorate with the Tooltip you'd get some additional props:

| Name                     | Type               | Default    | Description                                                                                                                                            |
|:-------------------------|:-------------------|:-----------|:-------------------------------------------------------------------------------------------------------------------------------------------------------|
| `children`               | `Element`          | -          | Tooltip reference element.                                                                                                                             |
| `className`              | `String`           | `''`       | Sets a class to give customized styles to the tooltip.                                                                                                 | 
| `theme`                  | `Object`           | -          | Theme object with classnames that will be used to style the component.                                                                                 |
| `composedComponent`      | `String` or `Node` | -          | Tooltip reference element.                                                                                                                             | 
| `composedComponentProps` | `Object`           | -          | Props to composed component.                                                                                                                           | 
| `tooltip`                | `String` or `Node` | -          | The text string or node to use for the tooltip.                                                                                                        |
| `tooltipDelay`           | `Number`           | `0`        | Amount of time in milliseconds spent before the tooltip is visible.                                                                                    |
| `tooltipOffset`          | `Number`           | `0`        | If `tooltipPosition` - `vertical`, `bottom` or `top`, the tooltip moves relative to its axis.                                                          |
| `tooltipPosition`        | `String`           | `vertical` | Determines the position of the tooltip. It can be automatic with `vertical` and `horizontal` values or forced with `bottom`, `top`, `left` or `right`. |
| `onClick`                | `Function`         | -          | Callback to be invoked when Component is clicked.                                                                                                      |
| `onMouseEnter`           | `Function`         | -          | Callback called when the mouse enters the Component.                                                                                                   |
| `onMouseLeave`           | `Function`         | -          | Callback called when the mouse leaves the Component.                                                                                                   |

## Theme

| Name             | Description                                                                     |
|:-----------------|:--------------------------------------------------------------------------------|
| `tooltip`        | Added to the tooltip element wrapper.                                           |
| `tooltipActive`  | Added to the root when the tooltip is active.                                   |
| `tooltipInner`   | Added to the inner element which sets the background, font and rounded borders. |
| `tooltipBottom`  | Added to the root in case the tooltip is being positioned at bottom.            |
| `tooltipLeft`    | Added to the root in case the tooltip is being positioned at left.              |
| `tooltipRight`   | Added to the root in case the tooltip is being positioned at right.             |
| `tooltipTop`     | Added to the root in case the tooltip is being positioned at top.               |
