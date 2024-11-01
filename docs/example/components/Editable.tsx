import * as editable from '@zag-js/editable';
import { normalizeProps, useMachine } from '@zag-js/react';
import { memo, useId, useMemo } from 'react';

function useEditable(props: Omit<editable.Context, 'id'>) {
    const id = useId();

    const [state, send] = useMachine(
        useMemo(() => editable.machine({ id, ...props }), [id, props]),
    );

    const api = editable.connect(state, send, normalizeProps);

    return api;
}

export const EditableTitle = memo(function Editable({
    className,
    ...options
}: {
    className?: string;
} & Omit<editable.Context, 'id'>) {
    const machineOptions = useMemo(
        () => ({
            activationMode: 'focus',
            ...options,
        }),
        [options],
    );

    const api = useEditable(machineOptions);

    return (
        <div {...api.getRootProps()} className={className}>
            <div {...api.getAreaProps()} className="flex flex-col">
                <input {...api.getInputProps()} className="border-none outline-none" />
                <h3
                    {...api.getPreviewProps()}
                    className="hover:bg-primary-active w-full overflow-hidden
            text-ellipsis rounded-md p-2 hover:cursor-pointer"
                />
            </div>
        </div>
    );
});
/** Hint: for preview mode we can make `readOnly` on all editable instances */
export const EditableParagraph = memo(function Editable({
    className,
    ...options
}: {
    className?: string;
} & Omit<editable.Context, 'id'>) {
    const api = useEditable({
        activationMode: 'focus',
        ...options,
    });

    return (
        <div {...api.getRootProps()} className={className}>
            <div {...api.getAreaProps()} className="flex w-full">
                <textarea {...api.getInputProps()} className="w-full border-none outline-none" />
                <p
                    {...api.getPreviewProps()}
                    className="hover:bg-primary-active w-full break-words rounded-md p-2
            hover:cursor-pointer"
                />
            </div>
        </div>
    );
});
