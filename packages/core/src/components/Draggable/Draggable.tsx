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

export const Item = forward<
    UseDraggableArguments & {
        children: (props: ReturnType<typeof useDraggable> & { id: string }) => ReactNode;
    },
    'div'
>(({ children, id: baseId, data, disabled, attributes: attr }) => {
    const id = 'draggable-' + baseId;

    const draggable = useDraggable({
        id,
        data,
        disabled,
        attributes: attr,
    });

    return children({ id, ...draggable });
});

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
