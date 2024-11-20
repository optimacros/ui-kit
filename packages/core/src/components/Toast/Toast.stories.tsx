import { Toast, ToastGroup } from '.';
import { Icon } from '../Icon';
import { IconButton } from '../IconButtonV2';

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
    ],
};

const types = ['info', 'error', 'success'];
export const Base = (props) => {
    const api = ToastGroup.useApi();
    return (
        <>
            <button
                onClick={() => {
                    api.create({
                        duration: 50000,
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
                        <Toast.CloseTrigger asChild>
                            <IconButton
                                renderIcon={() => <Icon value="close" />}
                                variant="accent"
                            />
                        </Toast.CloseTrigger>
                    </Toast.Root>
                )}
            </ToastGroup.Portal>
        </>
    );
};
