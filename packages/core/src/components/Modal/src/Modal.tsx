import {
    ComponentProps,
    PointerEvent,
    PropsWithChildren,
    useId,
    useImperativeHandle,
    useRef,
} from 'react';
import {
    ConnectMachine,
    ExtendedMachine,
    forward,
    MachineConfig,
    MachineOptions,
    styled,
    UserContext,
    UserState,
} from '@optimacros-ui/store';
import { Portal } from '@zag-js/react';
import * as dialog from '@zag-js/dialog';
import { createMachineContext } from '@optimacros-ui/store';
import { extendMachine } from '@optimacros-ui/store';
import { Draggable } from '@optimacros-ui/draggable';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';

const config = {
    context: {
        onClose: () => {},
    } as {
        onClose?: () => void;
    },
    on: {
        'ON_CLOSE.SET': { actions: 'setOnClose' },
    },
} satisfies MachineConfig<dialog.Service>;

const options = ({ options }) =>
    ({
        actions: {
            toggleVisibility(ctx, evt, params) {
                !ctx.open && ctx.onClose();

                options.actions.toggleVisibility(ctx, evt, params);
            },
        },
    }) satisfies MachineOptions<dialog.Service, dialog.Context, typeof config>;

type State = UserState<typeof dialog>;
type Context = UserContext<dialog.Context, typeof config>;

export const machine = extendMachine(dialog, config, options) satisfies ExtendedMachine<
    typeof dialog,
    Context,
    State
>;

const connect = ((api, { state, send }, machine) => {
    return {
        ...api,
        handleDragEnd: () => {
            const content = document.querySelector(
                'div[data-scope="dialog"][data-part="content"]',
            ) as HTMLDivElement;

            const { top, left, width } = content.getBoundingClientRect();

            content.style.position = 'absolute';
            content.style.top = `${top}px`;
            content.style.left = `${left}px`;
        },
    };
}) satisfies ConnectMachine<dialog.Api, Context, State>;

export type Machine = typeof machine;

export const {
    Api,
    RootProvider: Root,
    useApi,
    useSelector,
    useProxySelector,
} = createMachineContext({
    id: 'modal',
    machine,
    connect,
});

export type Props = ComponentProps<typeof Root>;

export type OpenChangeDetails = dialog.OpenChangeDetails;

export const Trigger = forward<PropsWithChildren, 'button'>((props, ref) => {
    const api = useApi();

    return <styled.button {...props} {...api.getTriggerProps()} ref={ref} />;
});

export const Content = forward<PropsWithChildren, 'div'>(
    (props, ref) => {
        const api = useApi();

        return (
            api.open && (
                <Portal>
                    <styled.div {...api.getBackdropProps()} />
                    <styled.div {...api.getPositionerProps()}>
                        <styled.div {...props} {...api.getContentProps()} ref={ref} />
                    </styled.div>
                </Portal>
            )
        );
    },
    {
        displayName: 'Content',
    },
);

export const DraggableContent = forward<PropsWithChildren, 'div'>(
    (props, ref) => {
        const contentRef = useRef<HTMLDivElement>();

        useImperativeHandle(ref, () => contentRef.current);

        const draggableId = useId();
        const api = useApi();

        const handlePointerDown =
            (listeners: SyntheticListenerMap) => (e: PointerEvent<HTMLDivElement>) => {
                if (
                    (e.target as HTMLElement).closest('*[data-draggable-part="handle"]') &&
                    !(e.target as HTMLElement).closest('*[data-role="close-trigger"]')
                ) {
                    listeners.onPointerDown(e);
                }
            };

        if (!api.open) {
            return null;
        }

        return (
            <Draggable.Root onDragEnd={api.handleDragEnd} id={draggableId}>
                <Portal>
                    <styled.div {...api.getBackdropProps()} />
                    <styled.div {...api.getPositionerProps()}>
                        <Draggable.Item ref={contentRef} id={draggableId}>
                            {({ setNodeRef, transform, attributes, listeners, isDragging }) => (
                                <styled.div
                                    {...props}
                                    {...api.getContentProps()}
                                    {...attributes}
                                    data-dragging={isDragging}
                                    data-draggable-id={draggableId}
                                    onPointerDown={handlePointerDown(listeners)}
                                    ref={setNodeRef}
                                    style={{
                                        transform:
                                            transform &&
                                            `translateX(${transform.x}px) translateY(${transform.y}px)`,
                                    }}
                                />
                            )}
                        </Draggable.Item>
                    </styled.div>
                </Portal>
            </Draggable.Root>
        );
    },
    {
        displayName: 'DraggableContent',
    },
);

export const Footer = forward<PropsWithChildren, 'div'>(
    ({ children, ...rest }, ref) => (
        <styled.div {...rest} ref={ref} data-part="footer" data-scope="dialog">
            {children}
        </styled.div>
    ),
    {
        displayName: 'Footer',
    },
);

export const Header = forward<PropsWithChildren, 'div'>(
    ({ children, ...rest }, ref) => {
        return (
            <styled.div {...rest} ref={ref} data-scope="dialog" data-part="header">
                {children}
            </styled.div>
        );
    },
    {
        displayName: 'Header',
    },
);

export const CloseTrigger = forward<PropsWithChildren, 'button'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.button
                ref={ref}
                {...rest}
                {...api.getCloseTriggerProps()}
                data-role="close-trigger"
            >
                {children}
            </styled.button>
        );
    },
    {
        displayName: 'CloseTrigger',
    },
);

export const ScrollContainer = forward<PropsWithChildren, 'div'>(
    ({ children, ...rest }, ref) => (
        <styled.div ref={ref} {...rest} data-scope="dialog" data-part="scroll-container-outer">
            <styled.div
                data-scope="dialog"
                data-part="scroll-container-inner"
                data-role="scroll-container"
            >
                {children}
            </styled.div>
        </styled.div>
    ),
    {
        displayName: 'ScrollContainer',
    },
);

export const Title = forward<PropsWithChildren, 'h3'>(
    (props, ref) => {
        const api = useApi();

        return <styled.h3 {...api.getTitleProps()} ref={ref} {...props} />;
    },
    {
        displayName: 'Title',
    },
);

export const DragHandle = forward<PropsWithChildren, 'div'>(
    (props, ref) => (
        <styled.div {...props} ref={ref} data-scope="dialog" data-draggable-part="handle" />
    ),
    {
        displayName: 'DragHandle',
    },
);
