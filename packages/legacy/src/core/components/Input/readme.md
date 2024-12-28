# Input

<!-- example -->
```jsx
import { Input } from 'ui-kit-core/components/Input';


const TestComponent = () => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        age: '',
        phone: '',
        email: '',
        description: '',
    })

    const handleChange = (value: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [event.target.name]: value }))
    }
    
    return (
      <div>
          <Input label="Readonly" defaultValue="Some text" readOnly />
          <Input label="Name" name="name" value={formData.name} onChange={handleChange} maxLength={8} placeholder="Enter name" />
          <Input label="Surname" name="surname" value={formData.surname} onChange={handleChange} placeholder="Enter surname" autoFocus floating={false} />
          <Input label="Age" name="age" value={formData.age} onChange={handleChange} hint="Enter age" />
          <Input label="Email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" required error="Email is required" />
          <Input label="Phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter phone" disabled icon="phone" />
          <Input label="Description" name="description" value={formData.description} onChange={handleChange} placeholder="Enter description" multiline rows={2} />
          <Input label="Man" type="radio" /> 
          <Input label="Woman" type="radio" />
      </div>
    );
}
```

## Import
```jsx
import { Input } from 'ui-kit-core';
// or
import { Input } from 'ui-kit-core/components/Input';
```


## Properties

| Name           | Type               | Default | Description                                                                                                                                                                                                          |
|:---------------|:-------------------|:--------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `className`    | `String`           | `''`    | Sets a class name to give custom styles.                                                                                                                                                                             |
| `theme`        | `Object`           | -       | Theme object with classnames that will be used to style the component.                                                                                                                                               |
| `name`         | `String`           | -       | Value for `name` input attribute.                                                                                                                                                                                    |
| `value`        | `Any`              | -       | Current value of the `input` element, required for a controlled component.                                                                                                                                           |
| `defaultValue` | `Any`              | -       | The default value. Use when the component is not controlled.                                                                                                                                                         |
| `label`        | `String`           | -       | The text string to use for the floating label element.                                                                                                                                                               |
| `placeholder`  | `String`           | -       | The short hint displayed in the input before the user enters a value.                                                                                                                                                |
| `hint`         | `String` or `Node` | `''`    | The text string to use for hint text element.                                                                                                                                                                        |
| `multiline`    | `Boolean`          | `false` | If `true`, a textarea element is rendered.                                                                                                                                                                           |
| `rows`         | `Number`           | `1`     | Number of rows to display when multiline option is set to true.                                                                                                                                                      |
| `maxLength`    | `Number`           | -       | Specifies the maximum number of characters allowed in the component.                                                                                                                                                 |
| `disabled`     | `Boolean`          | `false` | If `true`, component will be disabled.                                                                                                                                                                               |
| `required`     | `Boolean`          | `false` | If `true`, the `input` element is required.                                                                                                                                                                          |
| `error`        | `String` or `Node` | -       | Give an error content to display under the field.                                                                                                                                                                    |
| `oneLineError` | `Boolean`          | -       |                                                                                                                                                                                                                      |
| `collapsed`    | `Boolean`          | `false` | If `true`, the `label` is hidden.                                                                                                                                                                                    |
| `floating`     | `Boolean`          | `true`  | If `false`, the label is visible only when input value empty.                                                                                                                                                        |
| `icon`         | `String`           | -       | Value of the icon (See Font Icon Component).                                                                                                                                                                         |
| `type`         | `String`           | `text`  | Type of the input element. It can be a valid HTML5 input type.                                                                                                                                                       |
| `autoFocus`    | `Boolean`          | `false` | If `true`, the input will be focused on page load.                                                                                                                                                                   |
| `tabIndex`     | `Number`           | -       | The tabindex allows input to be focusable, allow or prevent them from being sequentially focusable (usually with the Tab key, hence the name) and determine their relative ordering for sequential focus navigation. |
| `autoComplete` | `String`           | -       | This prop helps users to fill forms faster, especially on mobile devices. The name can be confusing, as it's more like an autofill.                                                                                  |
| `readOnly`     | `Boolean`          | `false` | It prevents the user from changing the value of the input.                                                                                                                                                           |
| `onBlur`       | `Function`         | -       | Callback function that is fired when component is blurred.                                                                                                                                                           |
| `onChange`     | `Function`         | -       | Callback function that is fired when the component's value changes.                                                                                                                                                  |
| `onFocus`      | `Function`         | -       | Callback function that is fired when component is focused.                                                                                                                                                           |
| `onKeyPress`   | `Function`         | -       | Callback function that is fired when a key is pressed.                                                                                                                                                               |
| `onKeyDown`    | `Function`         | -       | Callback function that is fired when a key is down.                                                                                                                                                                  |

## Theming

| Name           | Description                                                   |
|:---------------|:--------------------------------------------------------------|
| `input`        | Used to the root component.                                   |
| `bar`          | Used for the bar under the input.                             |
| `counter`      | Used for the counter element (when input has `maxLength`).    |
| `disabled`     | Used to the root class when input is disabled.                |
| `collapsed`    | Used to the root class when input is collapsed.               |
| `required`     | Used for required symbol component, when input is required.   |
| `filled`       | Used for the HTML input element when input value presents.    |
| `fixed`        | Used for label component, when input has `floating` false.    |
| `error`        | Used for the text error.                                      |
| `oneLineError` | Used for the root element when input has `oneLineError` true. |
| `errored`      | Used to the root class when input is errored.                 |
| `hidden`       | Used when the input is hidden.                                |
| `hint`         | Used for the hint text.                                       |
| `icon`         | Used for the icon in case the input has icon.                 |
| `withIcon`     | Used to the root class if the input has icon.                 |
| `inputElement` | Used for the HTML input element.                              |
| `label`        | Used for the label when the input has a label.                |

