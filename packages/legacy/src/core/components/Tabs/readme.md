# Tabs

<!-- example -->
```jsx
import { Tabs } from 'ui-kit-core/components/Tabs';

const UserIcon = () => (
    <svg fill="none" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
        <path d="m12 11c2.2091 0 4-1.79086 4-4s-1.7909-4-4-4c-2.20914 0-4 1.79086-4 4s1.79086 4 4 4zm0 10c3.866 0 7-1.7909 7-4s-3.134-4-7-4c-3.86599 0-7 1.7909-7 4s3.13401 4 7 4z" fill="#28303f" clipRule="evenodd" fillRule="evenodd" />
    </svg>
)

const TestComponent = () => {
    const [tabs, setTabs] = useState(["Tab 1", "Tab 2", "Tab 3"])
    const [activeTab, setActiveTab] = useState(0)

    const handleTabPositionChange = (newPosition: number, oldPosition: number) => {
        const updatedTabs = [...tabs]

        const tabOnTargetPosition = updatedTabs[newPosition]
        updatedTabs[newPosition] = updatedTabs[oldPosition]
        updatedTabs[oldPosition] = tabOnTargetPosition

        setTabs(updatedTabs)
    }
    
    return (
      <div>
          <Tabs
              active={activeTab}
              draggable
              onTabPositionChange={handleTabPositionChange}
              onChange={(activeTabNumber: number)=> setActiveTab(activeTabNumber)}
          >
              {tabs.map(tab => {
                  return (
                      <Tab title={tab}
                           key={tab}
                           nonDraggable={tab === 'Tab 3'}
                      >{tab}</Tab>
                  )
              })}
          </Tabs>
    
          <Tabs>
              <Tab title="Item one"
                   icon="add"
              >Item one</Tab>
              <Tab label="Item two"
                   icon={<UserIcon />}
              >Item two</Tab>
              <Tab
                  title="Item three"
                  counter={10}
                  maxCounter={20}
              >Item three</Tab>
          </Tabs>
      </div> 
)};
```

## Import
```jsx
import { Tabs } from 'ui-kit-core';
// or
import { Tabs } from 'ui-kit-core/components/Tabs';
```

## Properties

| Name                  | Type               | Default | Description                                                                    |
|:----------------------|:-------------------|:--------|:-------------------------------------------------------------------------------|
| `children`            | `Node` or `Node[]` | -       | Tabs contents. Usually `Tab`.                                                  |
| `className`           | `String`           | -       | Set a custom class styles to style the Tabs.                                   |
| `headerClassName`     | `String`           | -       | Set a custom class styles to style the Tabs Header.                            |
| `contentClassName`    | `String`           | -       | Set a custom class styles to style the Tabs Content.                           |
| `theme`               | `Object`           | -       | Theme object with classnames that will be used to style the component.         |
| `active`              | `Number`           | `0`     | The value of the currently selected `Tab`.                                     | 
| `draggable`           | `Boolean`          | `false` | If `true`, tabs are draggable.                                                 | 
| `hideTabHeader`       | `Boolean`          | -       |                                                                                | 
| `onChange`            | `Function`         | -       | Callback function that is fired when the component's active tab changes.       |
| `onTabSwitch`         | `Function`         | -       | Callback function that is fired when `Space` or `Enter` keyboard keys pressed. |
| `onTabPositionChange` | `Function`         | -       | Callback function that is fired when the tab position changing.                |

## Theme

| Name                   | Description |
|:-----------------------|:------------|
| `TabsContainer`        |             |
| `TabContent`           |             |
| `TabContent_Inner`     |             |
| `TabHeaderContainer`   |             |
| `TabButton`            |             |
| `TabButton_Inner`      |             |
| `TabButton_Content`    |             |
| `TabButton__active`    |             |
| `TabButton__disabled`  |             |
| `TabButton__draggable` |             |

+ Tabs use `Button`, so you can use Button Theme properties (see Button readme.md)
___

# Tab

## Import
```jsx
import { Tab } from 'ui-kit-core';
// or
import { Tab } from 'ui-kit-core/components/Tab';
```

## Properties

| Name                  | Type               | Default | Description                                 |
|:----------------------|:-------------------|:--------|:--------------------------------------------|
| `children`            | `Node`             | -       | Tab content.                                |
| `className`           | `String`           | -       | Set a custom class styles to style the Tab. |
| `title`               | `String` or `Node` | -       | Tab header.                                 |
| `label`               | `String`           | -       | Tab header.                                 |
| `icon`                | `String` or `Node` | -       | The icon to display.                        |
| `counter`             | `Number`           | -       | Count to show.                              |
| `maxCounter`          | `Number`           | -       | Max count to show.                          |
| `nonDraggable`        | `Boolean`          | `false` | If `true`, tabs is not draggable.           | 
| `isFixed`             | `Boolean`          |         |                                             | 
| `disabled`            | `Boolean`          | `false` | If `true`, the component is disabled.       | 
| `onHeaderContextMenu` | `Function`         | -       |                                             |
| `onDoubleClick`       | `Function`         | -       | Callback function that is fired when        |



