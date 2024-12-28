# FontIcon

<!-- example -->
```jsx
import { FontIcon } from 'ui-kit-core/components/FontIcon';

const CustomDeleteIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
        <path d="M14.8284 14.8284L9.17158 9.17158M9.17157 14.8284L14.8284 9.17158M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#28303F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

const TestComponent = () => (
  <div>
      <FontIcon value="home" title="Description home" /> 
      <FontIcon value="search" alt="search-icon" /> 
      <FontIcon value={<CustomDeleteIcon />} title="Description search" alt="search" />
  </div>
);
```

## Import
```jsx
import { FontIcon } from 'ui-kit-core';
// or
import { FontIcon } from 'ui-kit-core/components/FontIcon';
```

## Properties

| Name        | Type                  | Default | Description                                                               |
|:------------|:----------------------|:--------|:--------------------------------------------------------------------------|
| `className` | `String`              | `''`    | Set a class to style the Component.                                       |
| `value`     | `String` or `Element` | -       | The key string for the icon you want be displayed or custom icon element. |
| `title`     | `String`              | -       | Icon description, visible on icon hover.                                  |
| `alt`       | `String`              | `''`    | The text used to set the `aria-label` attribute.                          |
| `style`     | `Object`              | `''`    | Add styles to component.                                                  |
| `onClick`   | `Function`            | -       | Callback fired when the icon is clicked.                                  |
