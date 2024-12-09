import { Divider } from './index';
import { Orientation } from '../../constants';

export default {
    title: 'UI Kit core/Divider',
    component: Divider,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: { type: 'radio' },
            options: Orientation,
        },
    },
};

export const Base = (props) => {
    return <Divider {...props} />;
};

export const Vertical = (props) => {
    return <Divider orientation={Orientation.Vertical} {...props} />;
};

export const Horizonatal = (props) => {
    return <Divider orientation={Orientation.Horizontal} {...props} />;
};
