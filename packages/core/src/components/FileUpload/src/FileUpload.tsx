import { createReactApiStateContext, forward, styled } from '@optimacros-ui/store';
import * as fileUpload from '@zag-js/file-upload';
import { ComponentProps, PropsWithChildren, ReactNode, useMemo } from 'react';
import { round, sum } from '@optimacros-ui/utils';

export const { Api, RootProvider, useApi } = createReactApiStateContext({
    id: 'file-upload',
    machine: fileUpload,
});

export type RootProps = PropsWithChildren<ComponentProps<typeof RootProvider>>;
export const Root = forward<RootProps, 'div'>(({ children, ...context }, ref) => {
    return (
        <RootProvider {...context}>
            {(api) => (
                <styled.div
                    {...api.getRootProps()}
                    ref={ref}
                    data-empty={api.acceptedFiles.length <= 0}
                >
                    {children}
                </styled.div>
            )}
        </RootProvider>
    );
});

export const HiddenInput = () => {
    const api = useApi();

    return <styled.input {...api.getHiddenInputProps()} />;
};

export const UploadTrigger = forward<{ children: ReactNode }, 'button'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        const apiProps = api.getTriggerProps();

        return (
            <styled.button {...apiProps} {...rest} ref={ref}>
                {children}
            </styled.button>
        );
    },
);

export const ClearTrigger = forward<{ children: ReactNode }, 'button'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        const apiProps = api.getClearTriggerProps();

        return (
            <styled.button {...apiProps} {...rest} ref={ref}>
                {children}
            </styled.button>
        );
    },
);

export const DeleteItemTrigger = forward<{ children: ReactNode }, 'button'>(
    ({ file, children }: { file: File; children: ReactNode }, ref) => {
        const api = useApi();

        return (
            <styled.button {...api.getItemDeleteTriggerProps({ file })} ref={ref}>
                {children}
            </styled.button>
        );
    },
);

export const Content = forward<{}, 'div'>((props, ref) => {
    return <styled.div {...props} ref={ref} data-scope="file-upload" data-part="content" />;
});

export const ItemGroupHeader = forward<{}, 'div'>((props, ref) => {
    return (
        <styled.div {...props} ref={ref} data-scope="file-upload" data-part="item-group-header" />
    );
});

export const ItemGroup = forward<{ children: (file: File) => ReactNode }, 'ul'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        return (
            <ul {...api.getItemGroupProps()} {...rest} ref={ref}>
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

export const ItemSize = forward<{ file: File }, 'span'>(({ file, ...rest }, ref) => {
    const size = useMemo(() => {
        return calculateFileSize(file.size);
    }, [file.size]);

    return (
        <styled.span {...rest} ref={ref} data-scope="file-upload" data-part="item-size">
            {size}
        </styled.span>
    );
});

export const ItemName = forward<{ file: File }, 'span'>(({ file, ...rest }, ref) => {
    return (
        <styled.span {...rest} ref={ref} data-scope="file-upload" data-part="item-name">
            {file.name}
        </styled.span>
    );
});

export const ItemInfo = forward<{ file: File }, 'div'>(({ file, ...rest }, ref) => {
    return (
        <styled.div {...rest} ref={ref} data-scope="file-upload" data-part="item-info">
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

export const Dropzone = ({ children }) => {
    const api = useApi();

    return <styled.div {...api.getDropzoneProps()}>{children}</styled.div>;
};

const symbols = ['B', 'kB', 'MB', 'GB', 'TB'] as const;

export function calculateFileSize(sizeNumber: number) {
    const i = Math.floor(Math.log(sizeNumber) / Math.log(1024));

    const res = sizeNumber / +Math.pow(1024, i).toFixed(2);

    return `${round(res, 2)} ${symbols[i]}`;
}
