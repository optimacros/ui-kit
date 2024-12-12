# Dropdown

<!-- example -->
```jsx 
import { Dropdown } from 'ui-kit-core/components/Dropdown';

const OverlayComponent = () => {
    return <div><div>item1</div><div>item2</div></div>
}

const TestComponent = () => (
    <div>
        <Dropdown trigger="click" closeOnSelect overlay={OverlayComponent} overlayStyle={{ background: 'gray' }} > 
            <Button label="Users"/> 
        </Dropdown>

        <Dropdown overlay={OverlayComponent} visible overlayStyle={{ border: '1px solid gray' }} > 
            <Button label="Visible"/> 
        </Dropdown>

        <Dropdown trigger="click" disabled > 
            <Button label="Disabled"/> 
        </Dropdown>

        <Dropdown trigger="click" overlay={OverlayComponent} minOverlayWidthMatchTrigger={false} align={{ points: ['tc', 'bc'], }} overlayStyle={{ border: '1px solid gray' }} > 
            <Button label="Overlay width less"/> 
        </Dropdown>

        <Dropdown trigger="click" overlay={OverlayComponent} alignPoint overlayStyle={{ background: 'gray' }} > 
            <Button label="Point overlay"/> 
        </Dropdown>
    </div>
);
```

## Import
```jsx
import { Dropdown } from 'ui-kit-core';
// or
import { Dropdown } from 'ui-kit-core/components/Dropdown';
```

## Properties

| Name                          | Type                               | Default                           | Description                                                                                 |
|:------------------------------|:-----------------------------------|:----------------------------------|:--------------------------------------------------------------------------------------------|
| `children`                    | `Node`                             | -                                 | The content of the component.                                                               |
| `className`                   | `String`                           | `''`                              | Dropdown button wrapper class name.                                                         |
| `disabled`                    | `Boolean`                          | `false`                           | If `true`, component will be disabled.                                                      |
| `closeOnSelect`               | `Boolean`                          | `true`                            | If `true`, overlay close after select.                                                      |
| `overlayClassName`            | `String`                           | -                                 | Overlay class name.                                                                         |
| `visible`                     | `Boolean`                          | `false`                           | If `true`, overlay will be visible by default.                                              |
| `overlay`                     | `Node`                             | -                                 | Popup component, which is shown by trigger.                                                 |
| `onVisibleChange`             | `Function(visible: boolean)`       | -                                 | Call when overlay visibility is changed.                                                    |
| `trigger`                     | `ActionType[]`                     | `["hover"]`                       | Which actions cause popup shown. Enum of `hover`,`click`,`focus`,`contextMenu`.             |

Ui-kit using `rc-dropdown`. You can read more at the [link](https://github.com/react-component/dropdown).
