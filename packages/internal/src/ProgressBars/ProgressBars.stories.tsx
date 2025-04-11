import { useState, useEffect } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ProgressBars } from '@optimacros-ui/kit-internal';

const Wrapper = ({ children }: { children }) => (
    <div style={{ position: 'relative', height: '20px' }}>{children}</div>
);

const meta: Meta<typeof ProgressBars> = {
    title: 'UI Kit internal/ProgressBars',
    component: ProgressBars,
    tags: ['autodocs'],
    argTypes: {
        className: {
            control: 'text',
            description: 'Additional CSS class for the progress bars container',
        },
        state: {
            control: 'object',
            description: 'State object containing current progress bar and progress bars array',
        },
    },
};

export default meta;

type Story = StoryObj<typeof ProgressBars>;

const progressBars = [
    {
        start: () => {},
        stop: () => {},
        currentValue: 30,
        maxValue: 100,
    },
    {
        start: () => {},
        stop: () => {},
        currentValue: 60,
        maxValue: 100,
    },
    {
        start: () => {},
        stop: () => {},
        currentValue: 90,
        maxValue: 100,
    },
];

export const Basic: Story = {
    args: {
        state: {
            currentProgressBar: progressBars[0],
            progressBars: progressBars,
            currentIndex: 0,
        },
    },
    tags: ['skip-test-runner'],
    render: (args) => (
        <Wrapper>
            <ProgressBars {...args} />
        </Wrapper>
    ),
};

const StateProgressBars = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex >= progressBars.length - 1) {
            return;
        }

        const timeout = setTimeout(() => {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }, 500);

        return () => clearTimeout(timeout);
    }, [currentIndex]);

    const state = {
        currentProgressBar: progressBars[currentIndex],
        progressBars,
        currentIndex,
    };

    return (
        <Wrapper>
            <ProgressBars state={state} />
        </Wrapper>
    );
};

export const MultipleProgressBar: Story = {
    tags: ['skip-test-runner'],
    render: () => <StateProgressBars />,
};
