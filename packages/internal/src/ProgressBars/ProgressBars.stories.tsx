import { useState, useEffect } from 'react';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { ProgressBars } from '@optimacros-ui/kit-internal';

const argTypes: Partial<ArgTypes> = {};

const meta: Meta<typeof ProgressBars> = {
    title: 'UI KIT Internal/ProgressBars',
    component: ProgressBars,
    argTypes,
};
export default meta;

type Story = StoryObj<typeof ProgressBars>;

const ProgressBar = {
    currentValue: 80,
    maxValue: 100,
};

const ProgressBar1 = {
    currentValue: 10,
    maxValue: 100,
};

const ProgressBar2 = {
    currentValue: 56,
    maxValue: 100,
};

export const Basic: Story = {
    args: {
        state: {
            currentProgressBar: ProgressBar1,
            progressBars: [ProgressBar, ProgressBar1, ProgressBar2],
            currentIndex: 1,
        },
    },
};

const DynamicProgressBars = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const progressBars = [ProgressBar, ProgressBar1, ProgressBar2];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % progressBars.length);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const state = {
        currentProgressBar: progressBars[currentIndex],
        progressBars,
        currentIndex,
    };

    return <ProgressBars state={state} />;
};

export const Dynamic: Story = {
    render: () => <DynamicProgressBars />,
};
