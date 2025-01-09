import { ArgTypes } from '@storybook/react';
import { Button } from '.';

export const argTypesTheme: Partial<ArgTypes> = {
    button: {
        control: false,
        description: 'Button root element',
    },
    icon: {
        control: false,
        description: 'Button icon element',
    },
    flat: {
        control: false,
        description: 'Use when the button is flat',
    },
    floating: {
        control: false,
        description: 'Use when the button is floating',
    },
    raised: {
        control: false,
        description: 'Use when the button is raised',
    },
    inverse: {
        control: false,
        description: 'Use when the button is inverted',
    },
    mini: {
        control: false,
        description: 'Use for mini floating button',
    },
    neutral: {
        control: false,
        description: 'Use for neutral colored button',
    },
    accent: {
        control: false,
        description: 'Use when the button is neutral and accent',
    },
    primary: {
        control: false,
        description: 'Use when the button is neutral and primary',
    },
    bordered: {
        control: false,
        description: 'Use when the button is neutral and bordered',
    },
};

const meta = {
    title: 'UI kit internal/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: { ...argTypesTheme },
    excludeStories: ['argTypesTheme'],
};

export default meta;

export const Basic = Button;
