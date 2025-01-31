import { Toast, ToastGroup } from '@optimacros-ui/kit';
import { Button } from '@optimacros-ui/kit';
import { memo, ReactNode, useEffect, useMemo } from 'react';
import { SnackbarType } from '../models';
import { isNil } from '@optimacros-ui/utils';
import { clsx } from '@optimacros-ui/utils';
import { Button as DefaultButton } from '@optimacros-ui/kit';
import { Text } from '@optimacros-ui/kit';
import { buttonStatusMapping } from '../settings';

export interface SnackbarProps {
    action?: string;
    active?: boolean;
    children?: ReactNode;
    className?: string;
    label?: ReactNode;
    onClick?: () => void;
    onTimeout?: () => void;
    Button?: typeof Button;
    theme?: {
        accept?: string;
        active?: string;
        button?: string;
        cancel?: string;
        label?: string;
        snackbar?: string;
        warning?: string;
        portal?: string;
    };
    timeout?: number;
    type?: SnackbarType;
}

const SnackbarComponent = memo<SnackbarProps>(
    ({
        active,
        action,
        Button = DefaultButton,
        onClick,
        theme,
        timeout,
        label,
        type,
        children,
        className,
    }) => {
        const api = ToastGroup.useApi();

        const create = () => {
            api.create({
                placement: 'bottom',
                duration: timeout || 9999999,
            });
        };

        // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
        useEffect(() => {
            if (active) {
                create();
            } else {
                api.remove();
            }
        }, [active]);

        const rootClassName = clsx(
            [theme?.snackbar, theme?.[type]],
            {
                [theme?.active]: active,
            },
            className,
        );

        const buttonStatus = useMemo(() => {
            return buttonStatusMapping[type];
        }, [type]);

        return (
            <>
                <ToastGroup.Portal className={theme?.portal}>
                    {(toast) => (
                        <Toast.Root actor={toast} className={rootClassName}>
                            <Toast.Content className={theme?.snackbar}>
                                {!isNil(label) && (
                                    <Text.Paragraph as="span" className={theme?.label}>
                                        {label}
                                    </Text.Paragraph>
                                )}

                                {children}
                            </Toast.Content>

                            {!!action && Button && (
                                <Toast.CloseTrigger asChild>
                                    <Button
                                        onClick={onClick}
                                        className={theme?.button}
                                        status={buttonStatus}
                                    >
                                        {action}
                                    </Button>
                                </Toast.CloseTrigger>
                            )}
                        </Toast.Root>
                    )}
                </ToastGroup.Portal>
            </>
        );
    },
);

export const Snackbar = memo<SnackbarProps>((props) => (
    <ToastGroup.RootProvider max={1}>
        <SnackbarComponent {...props} />
    </ToastGroup.RootProvider>
));
