import * as fileUpload from '@zag-js/file-upload';
import * as popover from '@zag-js/popover';
import { PropTypes, normalizeProps, useMachine } from '@zag-js/react';
import { ReactNode, useId, useState } from 'react';
const Button: any = {};
const ButtonGroup: any = {};

export function FileUploadButton({
    label,
    ...options
}: {
    label: string;
} & Omit<fileUpload.Context, 'id'>) {
    const [state, send] = useMachine(
        fileUpload.machine({
            id: useId(),

            ...options,
        }),
    );

    const [popoverState, popoverSend] = useMachine(
        popover.machine({ id: useId(), closeOnEscape: true }),
    );

    const api = fileUpload.connect(state, send, normalizeProps);

    const popoverApi = popover.connect(popoverState, popoverSend, normalizeProps);

    return (
        <div {...api.getRootProps()}>
            <ButtonGroup
                className="flex gap-0 divide-x-2 *:first:rounded-r-none
          *:last:rounded-l-none"
            >
                <Button
                    {...api.getDropzoneProps()}
                    data-recipe="button"
                    data-variant="primary"
                    data-size="md"
                    className="data-dragging:bg-inverse-primary-active"
                    type="button"
                >
                    <input {...api.getHiddenInputProps()} />
                    {label}
                </Button>
                <Button
                    {...popoverApi.getTriggerProps()}
                    data-variant="primary"
                    data-size="md"
                    type="button"
                >
                    <svg name="tabler-filled-triangle-inverted" className="text-current" />
                </Button>
            </ButtonGroup>
            <div {...popoverApi.getPositionerProps()}>
                <div
                    {...popoverApi.getContentProps()}
                    className="bg-primary w-xss rounded-md p-3 shadow-sm"
                >
                    <ul {...api.getItemGroupProps()} className="flex flex-col gap-2">
                        {api.acceptedFiles.length === 0 && <span>load some files</span>}
                        {api.acceptedFiles.map((file, i) => (
                            <li
                                key={`${file.name}_${i}`}
                                className="bg-primary-active flex items-center justify-between
                  gap-0.5 rounded-md p-1.5 text-sm"
                                {...api.getItemProps({ file })}
                            >
                                <div className="flex w-3/4 flex-col">
                                    <span
                                        {...api.getItemNameProps({ file })}
                                        className="overflow-hidden text-ellipsis"
                                    >
                                        {file.name}
                                    </span>
                                    <span
                                        {...api.getItemSizeTextProps({ file })}
                                        className="text-inverse-primary-active"
                                    >
                                        {(file.size / 1000000).toPrecision(3)} mb
                                    </span>
                                </div>
                                <Button
                                    {...api.getItemDeleteTriggerProps({ file })}
                                    data-variant="secondary"
                                    data-size="sm"
                                    data-shape="round"
                                    type="button"
                                >
                                    <svg name="tabler-x" className="text-error" strokeWidth={3} />
                                </Button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

/** Image upload with preview */
export function ImageUpload({
    label,
    className,
    children,
    onFileChange,
    onFileAccept,
    ...options
}: {
    className?: string;
    children?: (api: fileUpload.Api<PropTypes>) => ReactNode;
    label: string;
} & Omit<fileUpload.Context, 'id'>) {
    const [image, setImage] = useState(null);

    const [state, send] = useMachine(
        fileUpload.machine({
            id: useId(),
            onFileAccept(details) {
                onFileAccept?.(details);

                const reader = new FileReader();

                reader.onload = (event) => {
                    const image = event.target.result;
                    setImage(() => image.toString());
                };

                reader.readAsDataURL(details.files[0]);
            },
            onFileChange(details) {
                onFileChange?.(details);

                if (details.acceptedFiles.length === 0 && details.rejectedFiles.length === 0) {
                    setImage(() => null);
                }
            },
            accept: 'image/*',
            maxFiles: 1,
            ...options,
        }),
    );

    const api = fileUpload.connect(state, send, normalizeProps);

    return (
        <div {...api.getRootProps()} className={className}>
            <div
                {...api.getDropzoneProps()}
                className="group ring-secondary hover:ring-secondary-active
          data-dragging:ring-secondary-active flex size-full cursor-pointer
          items-center justify-center overflow-hidden rounded-lg ring-3"
                data-loaded={api.acceptedFiles.length > 0}
            >
                <input {...api.getHiddenInputProps()} />

                <img src={image} className="hidden size-full group-data-[loaded=true]:block" />

                <div
                    className="group-data-dragging:text-secondary flex flex-col
            items-center gap-2 select-none group-data-[loaded=true]:hidden"
                >
                    <span className="block text-lg font-semibold">{label}</span>

                    <svg name="tabler-photo-scan" className="size-1/5" />
                </div>
            </div>

            {children?.(api)}
        </div>
    );
}
