import { forward, styled } from '@optimacros-ui/store';
import { ReactNode, useImperativeHandle } from 'react';
import {
    DndContext,
    useDraggable,
    UseDraggableArguments,
    useDroppable,
    UseDroppableArguments,
} from '@dnd-kit/core';
type DraggableProps = {
    mode?: 'drag-and-return';
    children: ReactNode;
};

export const Item = forward<
    UseDraggableArguments & {
        children: (props: ReturnType<typeof useDraggable> & { id: string }) => ReactNode;
    },
    'li'
>(({ children, id: baseId, data, disabled, attributes: attr }, ref) => {
    const id = 'draggable-' + baseId;

    const draggable = useDraggable({
        id,
        data,
        disabled,
        attributes: attr,
    });

    useImperativeHandle(ref, () => draggable.node as unknown as HTMLLIElement);

    return children({ id, ...draggable });
});

export const Root = DndContext;

export const Container = forward<UseDroppableArguments, 'div'>(
    ({ id, data, resizeObserverConfig, disabled, ...rest }, ref) => {
        const { setNodeRef, node } = useDroppable({
            id,
            data,
            disabled,
            resizeObserverConfig,
        });

        useImperativeHandle(ref, () => node as unknown as HTMLDivElement);

        return <styled.div ref={setNodeRef} id={id as string} {...rest} />;
    },
);
