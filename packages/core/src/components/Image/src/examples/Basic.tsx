import { ComponentProps, useState } from 'react';
import { Image } from '../';
import { StatusChangeDetails } from '@zag-js/avatar';

const messageMapping = {
    loading: 'Loading...',
    loaded: null,
    error: 'Error',
};

export const Basic = (props: ComponentProps<typeof Image.Root>) => {
    const [status, setStatus] = useState('loading');

    const handleStatusUpdate = (details: StatusChangeDetails) => {
        setStatus(details.status);

        if (props.onStatusChange) {
            props.onStatusChange(details);
        }
    };

    return (
        <Image.Root {...props} onStatusChange={handleStatusUpdate} data-testid="root">
            <Image.Image src="/public/image-800x600.jpg" data-testid="image" />
            <Image.Fallback data-testid="fallback">{messageMapping[status]}</Image.Fallback>
        </Image.Root>
    );
};
