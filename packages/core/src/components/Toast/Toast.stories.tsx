import { Toast, ToastGroup } from '.';
import { ReactNode } from 'react';

const Wrapper = ({ children }: { children: ReactNode }) => (
    <div style={{ width: '200px', display: 'flex', flexDirection: 'column' }}>{children}</div>
);

export default {
    title: 'UI Kit core/Toast',
    component: Toast.Root,
    tags: ['autodocs'],

    decorators: [
        (Story) => (
            <ToastGroup.Root getRootNode={() => document.body}>
                <Story />
            </ToastGroup.Root>
        ),
        (Story) => (
            <Wrapper>
                <Story />
            </Wrapper>
        ),
    ],
};

export const Base = (props) => {
    const api = ToastGroup.useApi();
    return (
        <>
            <button
                onClick={() => {
                    api.create({
                        duration: 50000,
                        title: 'test',
                        type: 'info',
                    });
                }}
            >
                create toast
            </button>
            <ToastGroup.Portal>
                {(toast) => (
                    <Toast.Root actor={toast}>
                        <Toast.Title />
                        <Toast.Description />
                    </Toast.Root>
                )}
            </ToastGroup.Portal>
        </>
    );
};
