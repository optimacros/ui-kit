import { forward, styled } from '@optimacros-ui/store';
import { PropsWithChildren, ReactNode, useMemo } from 'react';
import { round, sum } from '@optimacros-ui/utils';
import { machine, Props, RootProvider, useApi } from './file-upload.machine';

export type RootProps = PropsWithChildren<Props>;
export const Root = forward<RootProps, 'div'>(({ children, ...context }, ref) => {
    const [providerProps, elementProps] = machine.splitProps(context);

    return (
        <RootProvider {...providerProps}>
            <RootComponent {...elementProps} ref={ref}>
                {children}
            </RootComponent>
        </RootProvider>
    );
});

const RootComponent = forward<{}, 'div'>(({ children, ...rest }, ref) => {
    const api = useApi();

    return (
        <styled.div
            {...api.getRootProps()}
            {...rest}
            ref={ref}
            data-empty={api.acceptedFiles.length <= 0}
        >
            {children}
        </styled.div>
    );
});

export const HiddenInput = forward<{}, 'input'>((props, ref) => {
    const api = useApi();

    return <styled.input {...api.getHiddenInputProps()} {...props} ref={ref} />;
});

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

export const DeleteItemTrigger = forward<{ file: File; children: ReactNode }, 'button'>(
    ({ file, children, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.button {...api.getItemDeleteTriggerProps({ file })} {...rest} ref={ref}>
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
            <styled.ul {...api.getItemGroupProps()} {...rest} ref={ref}>
                {api.acceptedFiles.map((file) => (
                    <styled.li key={file.name} {...api.getItemProps({ file })}>
                        {children(file)}
                    </styled.li>
                ))}
            </styled.ul>
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

export const Dropzone = ({ children, ...rest }) => {
    const api = useApi();

    return (
        <styled.div {...rest} {...api.getDropzoneProps()}>
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
