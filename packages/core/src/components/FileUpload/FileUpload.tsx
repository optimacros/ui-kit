import { createReactApiStateContext, forward, styled } from '@optimacros/ui-kit-store';
import * as fileUpload from '@zag-js/file-upload';
import { PropTypes } from '@zag-js/react';
import { ReactNode, useMemo } from 'react';
import { isFunction, round, sum, tw } from '@optimacros/ui-kit-utils';

export const { Api, Root, Provider, useApi, useMachine } = createReactApiStateContext({
    api: null as fileUpload.Api<PropTypes>,
    id: 'file-upload',
    initialState: null,
    machine: fileUpload,
    rootAsTag: true,
    useRootProps(api) {
        const hasFile = api.acceptedFiles.length > 0;
        return {
            ...api.getRootProps(),
            'data-empty': !hasFile,
            className: 'group',
        };
    },
});

export const HiddenInput = () => {
    const api = useApi();

    return <styled.input {...api.getHiddenInputProps()} />;
};

export const UploadTrigger = forward<{ children: ((props) => ReactNode) | ReactNode }, 'button'>(
    ({ children, ...rest }) => {
        const api = useApi();

        const apiProps = api.getTriggerProps();

        return isFunction(children) ? (
            children(apiProps)
        ) : (
            <styled.button {...apiProps} {...rest}>
                {children}
            </styled.button>
        );
    },
);

export const clearTriggerClassName = tw`
absolute top-1 right-1
`;

export const ClearTrigger = forward<{ children: ((props) => ReactNode) | ReactNode }, 'button'>(
    ({ children, ...rest }) => {
        const api = useApi();

        const apiProps = api.getClearTriggerProps();

        return isFunction(children) ? (
            <div className={clearTriggerClassName}>{children(apiProps)}</div>
        ) : (
            <styled.button {...apiProps} {...rest} className={clearTriggerClassName}>
                {children}
            </styled.button>
        );
    },
);

export const DeleteItemTrigger = ({
    file,
    children,
}: { file: File; children: (props) => ReactNode }) => {
    const api = useApi();

    return children(api.getItemDeleteTriggerProps({ file }));
};

export const contentClassName =
    'relative text-[var(--text)] border-[var(--border)] border-12 w-full hidden group-data-[empty=false]:flex flex-col';

export const Content = forward<{}, 'div'>((props, ref) => {
    return (
        <styled.div
            {...props}
            className={contentClassName}
            ref={ref}
            data-scope="file-upload"
            data-part="content"
        />
    );
});

export const tableClassName = 'gap-1 *:p-2.5 *:odd:w-2/3 *:even:w-1/3 flex w-full';

export const itemGroupHeaderClassName = tw`p-2 text-xl ${tableClassName} font-bold`;
export const ItemGroupHeader = forward<{}, 'div'>((props, ref) => {
    return (
        <styled.div
            {...props}
            ref={ref}
            data-scope="file-upload"
            data-part="item-group-header"
            className={itemGroupHeaderClassName}
        />
    );
});

export const itemGroupClassName = 'p-2  flex-col gap-1 flex';
export const ItemGroup = forward<{ children: (file: File) => ReactNode }, 'ul'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        return (
            <ul {...api.getItemGroupProps()} {...rest} className={itemGroupClassName} ref={ref}>
                {api.acceptedFiles.map((file) => (
                    <li
                        key={file.name}
                        {...api.getItemProps({ file })}
                        className="font-bold text-base"
                    >
                        {children(file)}
                    </li>
                ))}
            </ul>
        );
    },
);

export const itemClassName = tw`
    p-2.5 bg-[var(--bg)] text-[var(--text)]
`;

export const ItemSize = forward<{ file: File }, 'span'>(({ file, ...rest }, ref) => {
    const size = useMemo(() => {
        return calculateFileSize(file.size);
    }, [file.size]);

    return (
        <styled.span
            {...rest}
            ref={ref}
            data-scope="file-upload"
            data-part="item-size"
            className={itemClassName}
        >
            {size}
        </styled.span>
    );
});

export const ItemName = forward<{ file: File }, 'span'>(({ file, ...rest }, ref) => {
    return (
        <styled.span
            {...rest}
            ref={ref}
            data-scope="file-upload"
            data-part="item-name"
            className={itemClassName}
        >
            {file.name}
        </styled.span>
    );
});

export const itemInfoClassName = `gap-1 flex ${tableClassName}`;
export const ItemInfo = forward<{ file: File }, 'div'>(({ file, ...rest }, ref) => {
    return (
        <styled.div
            {...rest}
            ref={ref}
            data-scope="file-upload"
            data-part="item-info"
            className={itemInfoClassName}
        >
            <ItemName file={file} />
            <ItemSize file={file} />
        </styled.div>
    );
});

export const TotalSize = () => {
    const api = useApi();

    const size = useMemo(() => {
        const sizeNumber = sum(api.acceptedFiles.map(({ size }) => size));

        return calculateFileSize(sizeNumber);
    }, [api.acceptedFiles]);

    return (
        <styled.span data-scope="file-upload" data-part="total-size">
            {size}
        </styled.span>
    );
};

export const dropzoneClassName =
    'bg-[var(--bg)] text-[var(--text)] flex items-center justify-center size-full data-dragging:border-dashed data-dragging:border-[var(--border-active)] border-transparent border-3 group-data-[empty=false]:hidden';
export const Dropzone = ({ children }) => {
    const api = useApi();

    return (
        <styled.div {...api.getDropzoneProps()} className={dropzoneClassName}>
            {children}
        </styled.div>
    );
};

const symbols = ['B', 'kB', 'MB', 'GB', 'TB'] as const;

export function calculateFileSize(sizeNumber: number) {
    const i = Math.floor(Math.log(sizeNumber) / Math.log(1024));

    const res = sizeNumber / +Math.pow(1024, i).toFixed(2);

    return `${round(res, 2)} ${symbols[i]}`;
}
