# Menu

<!-- example -->
```jsx
import { Menu } from 'ui-kit-core/components/Menu';
import { MenuDivider } from 'ui-kit-core/components/MenuDivider';
import { SubMenu } from 'ui-kit-core/components/SubMenu';
import { MenuItemGroup } from 'ui-kit-core/components/MenuItemGroup';
import { MenuItem } from 'ui-kit-core/components/MenuItem';
import { FontIcon } from 'ui-kit-core/components/FontIcon';

const TestComponent = () => (
  <div>
      <Menu style={{ margin: 20, width: 200 }} expandIcon={(<FontIcon style={{ position: 'absolute', right: '20px' }} value="arrow_right_alt" />)} >
          <MenuItem>Menu item 1</MenuItem>
          <MenuDivider />
          <SubMenu title="Sub menu 1">
              <MenuItem>MenuItem 1</MenuItem>
              <MenuItem disabled>MenuItem 2 disabled</MenuItem>
              <MenuItem title="MenuItem 3" />
          </SubMenu>
          <SubMenu title="Sub menu 2" disabled >
              <MenuItem>MenuItem 1</MenuItem>
          </SubMenu>
      </Menu>

      <Menu mode="inline" style={{ margin: 20, width: 200 }} expandIcon={(<FontIcon style={{ position: 'absolute', right: '20px' }} value="arrow_drop_down" />)} >
          <MenuItem>Menu item 1</MenuItem>
          <SubMenu title="Sub menu 1">
              <MenuItem>MenuItem 1</MenuItem>
              <MenuItem disabled>MenuItem 2 disabled</MenuItem>
              <MenuItem title="MenuItem 3" />
          </SubMenu>
      </Menu>

      <Menu style={{ margin: 20, width: 200 }} expandIcon={(<FontIcon style={{ position: 'absolute', right: '20px' }} value="arrow_right_alt" />)} >
          <MenuItemGroup title="Menu Group 1">
              <MenuItem>MenuItem 1</MenuItem>
              <MenuItem>MenuItem 2</MenuItem>
              <SubMenu title="Sub menu 1">
                  <MenuItem>MenuItem 1</MenuItem>
                  <MenuItem>MenuItem 2</MenuItem>
              </SubMenu>
          </MenuItemGroup>
          <MenuItemGroup title="Menu Group 2">
              <MenuItem>MenuItem 3</MenuItem>
              <MenuItem>MenuItem 4</MenuItem>
          </MenuItemGroup>
      </Menu>
  </div>
);
```

## Import
```jsx
import { Menu } from 'ui-kit-core';
// or
import { Menu } from 'ui-kit-core/components/Menu';
```

## Properties

| Name        | Type      | Default | Description                                             |
|:------------|:----------|:--------|:--------------------------------------------------------|
| `className` | `String`  | `''`    | Override or extend the styles applied to the component. |
| `children`  | `Node`    | -       | Menu contents. Usually `SubMenu` or `MenuItem`.         |


Ui-kit using rc-menu library for Menu. Other props can be viewed at the [link](https://react-component.github.io/menu/)
___

# SubMenu

## Import
```jsx
import { SubMenu } from 'ui-kit-core';
// or
import { SubMenu } from 'ui-kit-core/components/SubMenu';
```

## Properties

| Name         | Type               | Default | Description                                             |
|:-------------|:-------------------|:--------|:--------------------------------------------------------|
| `className`  | `String`           | `''`    | Override or extend the styles applied to the component. |
| `children`   | `Node`             | -       | Sub menu's contents. Usually `MenuItem`.                |
| `title`      | `String` or `Node` | -       | Sub menu's title.                                       |
| `disabled`   | `Boolean`          | `false` | If `true`, component will be disabled.                  |

Ui-kit using rc-menu library for SubMenu. Other props can be viewed at the [link](https://react-component.github.io/menu/)
___


# MenuItem

## Import
```jsx
import { MenuItem } from 'ui-kit-core';
// or
import { MenuItem } from 'ui-kit-core/components/MenuItem';
```

## Properties

| Name        | Type               | Default | Description                                             |
|:------------|:-------------------|:--------|:--------------------------------------------------------|
| `className` | `String`           | `''`    | Override or extend the styles applied to the component. |
| `children`  | `Node`             | -       | Menu item title.                                        |
| `title`     | `String` or `Node` | -       | Menu item title.                                        |
| `disabled`  | `Boolean`          | `false` | If `true`, component will be disabled.                  |
| `onClick`   | `Function`         | -       | Callback fired when the menu item clicked.              |


Ui-kit using rc-menu library for MenuItem. Other props can be viewed at the [link](https://react-component.github.io/menu/)

___
# MenuItemGroup

## Import
```jsx
import { MenuItemGroup } from 'ui-kit-core';
// or
import { MenuItemGroup } from 'ui-kit-core/components/MenuItemGroup';
```

## Properties

| Name        | Type               | Default | Description                                             |
|:------------|:-------------------|:--------|:--------------------------------------------------------|
| `className` | `String`           | `''`    | Override or extend the styles applied to the component. |
| `children`  | `Node`             | -       | Sub menu's contents. Usually `SubMenu` or `MenuItem`.   |
| `title`     | `String` or `Node` | -       | Menu item title.                                        |


Ui-kit using rc-menu library for MenuItemGroup. Other props can be viewed at the [link](https://react-component.github.io/menu/)
___

# MenuDivider

MenuDivider used inside Menu, SubMenu, MenuItemGroup components.

## Import
```jsx
import { MenuDivider } from 'ui-kit-core';
// or
import { MenuDivider } from 'ui-kit-core/components/MenuDivider';
```


