import { ReactNode } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { Navigation } from './index';
import { ButtonMenu } from '../ButtonMenu';
import { IconButton } from '../IconButton';
import { MenuItem } from '../Menu';
import theme from './custom.module.css';

const meta: Meta<typeof Navigation> = {
    title: 'UI Kit internal/Navigation',
    component: Navigation,
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: { type: 'radio' },
            options: ['horizontal', 'vertical'],
            description: 'Layout orientation of the navigation',
        },
        theme: {
            control: 'object',
            description: 'Theme customization object',
        },
        className: {
            control: 'text',
            description: 'Additional CSS class',
        },
        wrap: {
            control: 'boolean',
            description: 'Whether navigation items can wrap to multiple lines',
        },
    },
};

export default meta;

type Story = StoryObj<typeof Navigation>;

const Wrapper = ({ children }: { children: ReactNode }) => (
    <div style={{ width: '300px' }}>{children}</div>
);

export const Basic: Story = {
    args: {
        type: 'horizontal',
        children: (
            <>
                <Button>Portfolio</Button>
                <Button>About</Button>
                <Button>Menu</Button>
                <Button>Location</Button>
                <Button>Contact</Button>
            </>
        ),
    },
};

export const IconButtonNav: Story = {
    args: {
        type: 'horizontal',
        theme,
        className: `${theme.NavigationContainer_small}`,
        children: [
            <ButtonMenu dataName="viewButton" label={'viewMenuLabel'} disabled>
                <MenuItem data-name="saveAsMenuItem" label={'saveAsMenuItemLabel'} disabled />
            </ButtonMenu>,
            <ButtonMenu dataName="dataButton" label={'dataMenuLabel'}>
                <MenuItem data-name="importResultsMenuItem" label={'importResultsMenuLabel'} />
            </ButtonMenu>,
            <IconButton icon="play_arrow" label={'runButtonLabel'} />,
            <IconButton icon="save" label={'saveAsToolbarButtonLabel'} disabled />,
            <IconButton icon="content_copy" label={'copyAsToolbarButtonLabel'} disabled />,
            <ButtonMenu dataName="viewButton" icon="cloud_download" tooltip={'exportRequestLabel'}>
                <MenuItem data-name="downloadLP" label="LP" />

                <MenuItem data-name="downloadMPS" label="MPS" disabled />

                <MenuItem data-name="downloadAMPL" label="AMPL" disabled />
            </ButtonMenu>,
            <IconButton icon="vertical_align_bottom" label={'exportToolbarButtonLabel'} disabled />,
            <IconButton icon="refresh" label={'labelRefreshButton'} disabled />,
            <IconButton icon="search" label="Search" disabled />,
            <IconButton icon="build" label={'RequestSettingsLabel'} />,
        ],
    },
};

export const Horizontal: Story = {
    args: {
        type: 'horizontal',
        children: (
            <>
                <Button>Portfolio</Button>
                <Button>About</Button>
                <Button>Menu</Button>
                <Button>Location</Button>
                <Button>Contact</Button>
            </>
        ),
    },
};

export const Vertical: Story = {
    args: {
        type: 'vertical',
        children: (
            <>
                <Button>Portfolio</Button>
                <Button>About</Button>
            </>
        ),
    },
};

export const Wrap: Story = {
    args: {
        type: 'horizontal',
        children: (
            <>
                <Button>Portfolio</Button>
                <Button>About</Button>
                <Button>Menu</Button>
                <Button>Location</Button>
                <Button>Contact</Button>
            </>
        ),
    },
    decorators: [
        // eslint-disable-next-line new-cap
        (Story) => (
            <Wrapper>
                <Story />
            </Wrapper>
        ),
    ],
};
