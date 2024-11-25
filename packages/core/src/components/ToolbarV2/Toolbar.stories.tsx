import { Toolbar } from './index';
import { Button } from '../ButtonV2';
import { Align } from '../../constants';

export default {
    title: 'UI Kit core/ToolbarV2',
    component: Toolbar.Root,
    tags: ['autodocs'],
    argTypes: {
        align: {
            control: 'radio',
            options: Align,
            table: {
                defaultValue: {
                    summary: Align.Left,
                },
            },
        },
        isSmall: {
            control: 'boolean',
            description: 'If `true`, toolbar will have less margin top.',
        },
    },
};

const Children = (
    <>
        <Button variant="accent"> Cancel </Button>
        <Button variant="primary"> Submit </Button>
    </>
);

export const Base = (props) => {
    return <Toolbar.Root {...props}>{Children}</Toolbar.Root>;
};

export const Left = (props) => {
    return (
        <Toolbar.Root {...props} align={Align.Left}>
            {Children}
        </Toolbar.Root>
    );
};

export const Center = (props) => {
    return (
        <Toolbar.Root {...props} align={Align.Center}>
            {Children}
        </Toolbar.Root>
    );
};

export const RightInRow = (props) => {
    return (
        <Toolbar.Root {...props} align={Align.RightInRow}>
            {Children}
        </Toolbar.Root>
    );
};

export const Small = (props) => {
    return (
        <Toolbar.Root {...props} isSmall>
            {Children}
        </Toolbar.Root>
    );
};
