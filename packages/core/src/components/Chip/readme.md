# Chip

Chips represent complex entities in small blocks, such as a contact. Chips can be used for various types of entities, including free form text, predefined text, rules, or contacts. Chips may also contain icons.

<!-- example -->
```jsx
import { Chip } from 'ui-kit-core/components/Chip';


const UserIcon = () => (
    <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" >
        <path d="m12 11c2.2091 0 4-1.79086 4-4s-1.7909-4-4-4c-2.20914 0-4 1.79086-4 4s1.79086 4 4 4zm0 10c3.866 0 7-1.7909 7-4s-3.134-4-7-4c-3.86599 0-7 1.7909-7 4s3.13401 4 7 4z" fill="#28303f" clipRule="evenodd" fillRule="evenodd" />
    </svg>
)

const CustomDeleteIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
        <path d="M14.8284 14.8284L9.17158 9.17158M9.17157 14.8284L14.8284 9.17158M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#28303F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

const TestComponent = () => (
  <div>
      <Chip className='CustomChip'>Example chip</Chip>
      <Chip settingsDialog={<div>Settings</div>}>Chip with settings dialog</Chip>
      <Chip deletable theme={{ deletable: 'CustomDeletable' }} onDeleteClick={() => console.log('delete')} >
          Deletable Chip
      </Chip>
      <Chip deletable incomeDeleteIcon={<CustomDeleteIcon />} >
          Deletable Chip With Custom Delete Icon
      </Chip>
      <Chip>
          <div style={{ display: 'flex', alignSelf: 'center' }}><UserIcon /></div>
          <span>Image chip</span>
      </Chip>
  </div>
);
```

## Import
```jsx
import { Chip } from 'ui-kit-core';
// or
import { Chip } from 'ui-kit-core/components/Chip';
```

## Properties

| Name               | Type       | Default | Description                                                                 |
|:-------------------|:-----------|:--------|:----------------------------------------------------------------------------|
| `children`         | `Node`     | -       | The content of the component.                                               |
| `className`        | `String`   | `''`    | Set a class to style the Chip.                                              |
| `theme`            | `Object`   | -       | Theme object with classnames that will be used to style the component.      |
| `settingsDialog`   | `Node`     | -       | Set block on the right.                                                     |
| `customDeleteIcon` | `Node`     | -       | Override the default delete icon element. Shown only if `deletable` is set. |
| `deletable`        | `Boolean`  | `false` | If `true`, the chip will be rendered with delete icon.                      |
| `onDeleteClick`    | `Function` | -       | Callback fired when the delete icon is clicked.                             |

## Theme

| Name         | Description                                               |
|:-------------|:----------------------------------------------------------|
| `chip`       | Used for the root element.                                |
| `deletable`  | Used to the root element when the component is deletable. |
