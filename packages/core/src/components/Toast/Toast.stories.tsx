import { Toast, ToastGroup } from '.';
import { Icon } from '../Icon';
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
            <ToastGroup.Root>
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
const types = ['info', 'error', 'loading', 'success'];
export const Base = (props) => {
    const api = ToastGroup.useApi();
    return (
        <>
            <button
                onClick={() => {
                    api.create({
                        duration: 1000,
                        title: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi id explicabo deleniti soluta est',
                        type: types[Math.floor(Math.random() * (types.length - 1))],
                        placement: 'top-end',
                    });
                }}
            >
                create toast
            </button>
            <ToastGroup.Portal>
                {(toast) => (
                    <Toast.Root actor={toast}>
                        <Toast.Content>
                            {toast.id}
                            <Toast.Title />
                            <Toast.Description />
                        </Toast.Content>
                        <Toast.CloseTrigger>
                            {(props) => <Icon {...props} value="close" />}
                        </Toast.CloseTrigger>
                    </Toast.Root>
                )}
            </ToastGroup.Portal>
        </>
    );
};
