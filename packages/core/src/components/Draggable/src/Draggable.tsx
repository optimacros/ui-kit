import { forward, styled } from '@optimacros-ui/store';
import { ReactNode, useImperativeHandle } from 'react';
import { DndContext, useDraggable, UseDraggableArguments, useDroppable } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
export { DragOverlay } from '@dnd-kit/core';

export const Item = forward<
    UseDraggableArguments & {
        children: (props: ReturnType<typeof useDraggable> & { id: string }) => ReactNode;
    },
    {}
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

export const SortableItem = forward<any, {}>(
    ({ children, id: baseId, data, disabled, attributes: attr }, ref) => {
        const id = 'draggable-' + baseId;

        const { transform, transition, ...draggable } = useSortable({
            id,
            data,
            disabled,
            attributes: attr,
        });

        useImperativeHandle(ref, () => draggable.node as unknown as HTMLLIElement);

        return children({
            id,
            ...draggable,
            style: {
                transform: CSS.Transform.toString(transform),
                transition,
            },
        });
    },
);

export const Root = DndContext;
export {
    SortableContext,
    verticalListSortingStrategy,
    horizontalListSortingStrategy,
} from '@dnd-kit/sortable';

export const Container = forward<
    // TODO: resolve type error when import from dnd-kit
    {
        id: string;
        disabled?: boolean;
        data?: any;
        resizeObserverConfig?: Record<string, any>;
    },
    'div'
>(({ id, data, resizeObserverConfig, disabled, ...rest }, ref) => {
    const { setNodeRef, node } = useDroppable({
        id,
        data,
        disabled,
        resizeObserverConfig,
    });

    useImperativeHandle(ref, () => node as unknown as HTMLDivElement);

    return <styled.div ref={setNodeRef} id={id as string} {...rest} />;
});
