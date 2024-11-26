# SelectBox

<!-- example -->
```typescript jsx
import { SelectBox } from 'ui-kit-core/components/SelectBox';

const source = [ { label: 'Newer first', value: 1, }, { label: 'Older first', value: 2, }, { label: 'No sort', value: 3, }, ] 
const customSource = [ { title: 'One', key: 1, }, { title: 'Two', key: 2, }, ]

const TestComponent = () => {
    const [value, setValue] = useState<string | number |(string | number)[]>(1)
    const [multiValue, setMultiValue] = useState<string | number |(string | number)[]>([1, 2])

    return (
      <div>
          <SelectBox name="Sort" source={source} label="Sort" value={value} onChange={(val) => setValue(val)} />
          <SelectBox name="Sort" source={source} label="Sort" onChange={(val) => setValue(val)} allowBlank={false} />
          <SelectBox name="Sort" source={customSource} label="Sort" labelKey="title" value={value} valueKey="key" onChange={(val) => setValue(val)} />
          <SelectBox name="Sort" source={source} label="Sort" value={multiValue} onChange={(val) => setMultiValue(val)} multiSelect />
          <SelectBox name="Sort" source={source} label="Sort" value={value} onChange={(val) => setValue(val)} disabled />
          <SelectBox name="Sort" source={source} label="Sort" value={value} onChange={(val) => setValue(val)} error="Error text" />
      </div> 
    )
};
```

## Import
```jsx
import { SelectBox } from 'ui-kit-core';
// or
import { SelectBox } from 'ui-kit-core/components/SelectBox';
```

## Properties

| Name          | Type                     | Default | Description                                                                                                                          |
|:--------------|:-------------------------|:--------|:-------------------------------------------------------------------------------------------------------------------------------------|
| `className`   | `String`                 | -       | Set a custom class styles to style the SelectBox.                                                                                    |
| `theme`       | `Object`                 | -       | Theme object with classnames that will be used to style the component.                                                               |
| `label`       | `String`                 | -       | The label of the select box container.                                                                                               |
| `labelKey`    | `String`                 | `label` | Name of property used for display options names.                                                                                     |
| `value`       | `any` or `any[]`         | -       | The value from source which is currently selected                                                                                    |
| `valueKey`    | `String`                 | `value` | Name of property used like select box value.                                                                                         |
| `name`        | `String`                 | -       | Name attribute of the input element.                                                                                                 |
| `source`      | { [key: string]: any }[] | -       | Array of options for select. Usually `{ label: '...', value: '...', disabled: true }`. `disabled` is optional and is default `false` |
| `error`       | `String` or `null`       | -       | If not empty, the error will be shown.                                                                                               |
| `allowBlank`  | `Boolean`                | `true`  | If `true`, the select box value can be empty. If `false` - value is first item of source.                                            |
| `disabled`    | `Boolean`                | -       | If `true`, the select box will be disabled.                                                                                          |
| `required`    | `Boolean`                | -       | If `true`, the input element is required.                                                                                            |
| `auto`        | `Boolean`                | `false` | If `true`, then depending on the position of the select box on the page, the dropdown will appear above or below the select box.     |
| `multiSelect` | `Boolean`                | -       | If `true`, value must be an array and the menu will support multiple selections.                                                     |
| `onClick`     | `Function`               | -       | Callback function that is fired when component is clicked.                                                                           |
| `onBlur`      | `Function`               | -       | Callback function that is fired when component is blurred.                                                                           |
| `onChange`    | `Function`               | -       | Callback function that is fired when the component's value changes.                                                                  |
| `onFocus`     | `Function`               | -       | Callback function that is fired when component is focused.                                                                           |

## Theme

| Name            | Description                                                                                          |
|:----------------|:-----------------------------------------------------------------------------------------------------|
| `Container`     | Used to the root component.                                                                          |
| `Title`         | Used to label wrapper component.                                                                     |
| `label`         | Used to the label component inside template.                                                         |
| `dropdown`      | Used to the input wrapper component.                                                                 |
| `active`        | Used to the input wrapper component when dropdown is open.                                           |
| `disabled`      | Used to the input wrapper component when select box is `disabled`.                                   |
| `required`      | Used to the input wrapper component when select box is `required`.                                   |
| `error`         | Used to the error component if error not empty.                                                      |
| `errored`       | Used to the template wrapper component if error not empty.                                           |
| `field`         | Used to the template wrapper component.                                                              |
| `selected`      | Used to selected item in dropdown select list.                                                       |
| `focused`       | Used to focused item in dropdown select list.                                                        |
| `templateValue` | Used to the template value wrapper component.                                                        |
| `up`            | Used to the input wrapper component when `auto` is `true` and dropdown appears above the select box. |
| `value`         | Used to the input wrapper component.                                                                 |
| `values`        | Used to dropdown select list.                                                                        |

