import { UserDragConfig } from '@use-gesture/react';
import { forward, styled } from '@optimacros/ui-kit-store';
import { ReactNode } from 'react';
import {
    DndContext,
    useDraggable,
    UseDraggableArguments,
    useDroppable,
    UseDroppableArguments,
} from '@dnd-kit/core';

type DraggableProps = {
    mode?: 'drag-and-return';
    config?: UserDragConfig;
    children: ReactNode;
};

export const Item = forward<UseDraggableArguments & { style: (transform) => object }, 'div'>(
    ({ children, id: baseId, data, disabled, attributes: attr, style, ...rest }) => {
        const id = 'draggable-' + baseId;

        const { listeners, attributes, setNodeRef, transform, over, active, isDragging, node } =
            useDraggable({
                id,
                data,
                disabled,
                attributes: attr,
            });
        return (
            <styled.div
                id={baseId as string}
                onPointerDown={listeners?.onPointerDown}
                {...attributes}
                style={style(transform)}
                ref={setNodeRef}
                data-draggable-id={id}
                {...rest}
            >
                {children}
            </styled.div>
        );
    },
);

export const Root = DndContext;

export const Container = forward<UseDroppableArguments, 'div'>(
    ({ id, data, resizeObserverConfig, disabled, ...rest }) => {
        const { setNodeRef: ref } = useDroppable({
            id,
            data,
            disabled,
            resizeObserverConfig,
        });

        return <styled.div ref={ref} id={id as string} {...rest} />;
    },
);
