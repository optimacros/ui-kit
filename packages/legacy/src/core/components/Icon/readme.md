# Icon

<!-- example -->
```jsx
import { Icon } from 'ui-kit-core/components/Icon';

const UserIcon = () => (
    <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" >
        <path d="m12 11c2.2091 0 4-1.79086 4-4s-1.7909-4-4-4c-2.20914 0-4 1.79086-4 4s1.79086 4 4 4zm0 10c3.866 0 7-1.7909 7-4s-3.134-4-7-4c-3.86599 0-7 1.7909-7 4s3.13401 4 7 4z" fill="#28303f" clipRule="evenodd" fillRule="evenodd" />
    </svg>
)

const TestComponent = () => (
  <div>
      <Icon value="add" title="Add" alt="Add icon" style={{ border: '1px solid red' }} />
      <Icon value={<UserIcon />} alt="User icon" />
  </div>
);
```

## Import
```jsx
import { Icon } from 'ui-kit-core';
// or
import { Icon } from 'ui-kit-core/components/Icon';
```

## Properties

| Name        | Type               | Default | Description                                                                  |
|:------------|:-------------------|:--------|:-----------------------------------------------------------------------------|
| `value`     | `String` or `Node` | -       | Value of the icon. Using `FontIcon` if value string. Or `div` if value node. |
| `className` | `String`           | -       | Set a class to style the Component.                                          |
| `title`     | `String`           | -       | Icon description, visible on icon hover.                                     |
| `alt`       | `String`           | -       | The text used to set the `aria-label` attribute.                             |
| `style`     | `Object`           | -       | Add styles to component.                                                     |
| `onClick`   | `Function`         | -       | Callback fired when the icon is clicked.                                     |
