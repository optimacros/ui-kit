import { useState } from 'react';
import { Draggable } from '..';
import { Flex } from '@optimacros-ui/flex';

const Item = () => (
    <Draggable.Item id="item">
        {({ transform, attributes, listeners, setNodeRef }) => (
            <Flex
                {...attributes}
                {...listeners}
                ref={setNodeRef}
                style={{
                    width: 77,
                    height: 77,
                    border: `3px solid green`,
                    transform:
                        transform && `translateX(${transform.x}px) translateY(${transform.y}px)`,
                }}
                data-testid="item"
            >
                drag me
            </Flex>
        )}
    </Draggable.Item>
);

export const Basic = (props: Draggable.DndContextProps) => {
    const [isDropped, setIsDropped] = useState(false);

    const handleDragEnd = (event: Draggable.DragEndEvent) => {
        if (event.over?.id === 'container') {
            setIsDropped(true);
        } else {
            setIsDropped(false);
        }

        if (props.onDragEnd) {
            props.onDragEnd(event);
        }
    };

    return (
        <Draggable.Root {...props} onDragEnd={handleDragEnd}>
            {isDropped ? 'drop item outside container' : <Item />}

            <Draggable.Container
                id="container"
                style={{ border: `3px solid red`, width: 300, height: 300 }}
                data-testid="container"
            >
                {isDropped ? <Item /> : 'drop item here'}
            </Draggable.Container>
        </Draggable.Root>
    );
};
