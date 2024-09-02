# Modal


<!-- example -->
```jsx
import { Modal } from 'ui-kit-core/components/Modal';

const TestComponent = () => {
    const [isOpen, setIsOpen] = useState(false)
    
    return (
        <div>
            <button onClick={() => setIsOpen(true)}>Open modal</button>
              
            <Modal title="Modal Title" isOpen={isOpen} draggableTarget=".modalDraggableElement" compact onRequestClose={() => setIsOpen(false)}>
                <div style={{ marginBottom: '20px' }}>Duis mollis, est non commodo luctus.</div>
                <FontIcon className="modalDraggableElement" value="pan_tool" />
            </Modal>
        </div>
    )
};
```

## Import
```jsx
import { Modal } from 'ui-kit-core';
// or
import { Modal } from 'ui-kit-core/components/Modal';
```

## Properties

| Name                 | Type      | Default | Description                                                                                                                                             |
|:---------------------|:----------|:--------|:--------------------------------------------------------------------------------------------------------------------------------------------------------|
| `className`          | `String`  | -       | Additional class name to provide custom styling to Modal component.                                                                                     |
| `headerClassName`    | `String`  | -       | Additional class name to provide custom styling to Modal Header component.                                                                              |
| `contentClassName`   | `String`  | -       | Additional class name to provide custom styling to Modal Content component.                                                                             |
| `title`              | `String`  | -       | Modal header title.                                                                                                                                     |
| `draggableTarget`    | `String`  | -       | Classname or id. If there is an element with the passed class/id inside the modal window, then moving is possible by pressing and holding this element. |
| `isOpen`             | `Boolean` | `false` | If `true`, modal is shown.                                                                                                                              |
| `compact`            | `Boolean` | -       | If `true`, modal becomes more compact by reducing the padding.                                                                                          |
| `nonDraggable`       | `Boolean` | `false` | If `true`, modal not draggable.                                                                                                                         |
| `isFatalError`       | `Boolean` | `false` | If `true`, hide modal close button.                                                                                                                     |
| `customHeaderButton` | `Node`    | -       | Modal header button. Visible if `title` not empty.                                                                                                      |
                                                                                    |

Ui-kit using react-modal library for Modal. Other props can be viewed at the [link](https://reactcommunity.org/react-modal/)
