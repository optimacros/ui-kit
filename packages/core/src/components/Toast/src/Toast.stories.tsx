import { Toast, ToastGroup } from '.';
import { IconButton } from '@optimacros-ui/icon-button';

export default {
    title: 'UI Kit core/Toast',
    component: Toast.Root,
};

const types = ['info', 'error', 'success'];
export const Base = (props) => {
    return (
        <ToastGroup.Root>
            <ToastGroup.Api>
                {(api) => (
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
                )}
            </ToastGroup.Api>
            <ToastGroup.Portal>
                {(toast) => (
                    <Toast.Root actor={toast}>
                        <Toast.Content>
                            {toast.id}
                            <Toast.Title />
                            <Toast.Description />
                        </Toast.Content>
                        <Toast.CloseTrigger asChild>
                            <IconButton icon="close" variant="accent" />
                        </Toast.CloseTrigger>
                    </Toast.Root>
                )}
            </ToastGroup.Portal>
        </ToastGroup.Root>
    );
};
