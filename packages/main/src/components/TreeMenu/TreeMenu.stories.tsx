import { Meta } from '@storybook/react';
import { TreeMenu } from './index';

const Wrapper = ({ children }: { children }) => (
    <div style={{ marginLeft: '20px' }}>{children}</div>
);

const meta: Meta<typeof TreeMenu> = {
    title: 'UI Kit main/TreeMenuV2',
    decorators: [
        (Story) => (
            <Wrapper>
                <Story />
            </Wrapper>
        ),
    ],
};
export default meta;

export const Basic = () => {
    return (
        <TreeMenu.Root>
            <span>fdfd</span>
        </TreeMenu.Root>
    );
};
