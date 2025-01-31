import { StoryObj } from '@storybook/react';

import { ColorPicker } from '.';
import { Icon } from '@optimacros-ui/kit';
import { useState } from 'react';
import { ValueChangeDetails } from '@zag-js/color-picker';
import { Flex } from '@optimacros-ui/flex';
import { ArgTypes as ArgTypesType, Meta } from '@storybook/react';
import { Title, Subtitle, Description, Primary, Stories, ArgTypes } from '@storybook/blocks';

const argTypesRoot: Partial<ArgTypesType> = {
    value: {
        control: 'object',
        description: 'The current color value',
        table: { type: { summary: 'Color' } },
    },
    onValueChange: {
        control: false,
        description: 'Handler that is called when the value changes, as the user drags.',
        table: { type: { summary: '(details: ValueChangeDetails) => void' } },
    },
    onValueChangeEnd: {
        control: false,
        description: 'Handler that is called when the user stops dragging.',
        table: { type: { summary: '(details: ValueChangeDetails) => void' } },
    },
    disabled: {
        control: 'boolean',
        description: 'Whether the color picker is disabled',
    },
    readOnly: {
        control: 'boolean',
        description: 'Whether the color picker is read-only',
    },
    format: {
        control: 'select',
        options: ['rgba', 'hsba', 'hsla'],
        description: 'The color format to use',
        table: { defaultValue: { summary: 'rgba' } },
    },
    positioning: {
        control: 'object',
        description: 'The positioning options for the color picker.',
        table: { type: { summary: 'PositioningOptions' } },
    },
    disableAlpha: {
        control: 'boolean',
        description: 'Whather alpha channel is disabled',
        table: { defaultValue: { summary: 'false' } },
    },
};

const argTypesPopover: Partial<ArgTypesType> = {
    eyeDropperIcon: {
        control: 'object',
        description: 'Eye dropper button child',
        table: { type: { summary: 'ReactNode' } },
    },
};

const meta: Meta = {
    title: 'Ui kit core/Color Picker',
    argTypes: { ...argTypesRoot, ...argTypesPopover },
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Subtitle />
                    <Description />
                    <Primary />
                    <Subtitle>Root props</Subtitle>
                    <ArgTypes include={Object.keys(argTypesRoot)} />
                    <Subtitle>Popover props</Subtitle>
                    <ArgTypes include={Object.keys(argTypesPopover)} />
                    <Stories />
                </>
            ),
        },
    },
};
export default meta;

const initialValue = '#005599';

type Story = StoryObj<typeof ColorPicker.RootProvider>;

export const Basic: Story = {
    render: (props) => {
        const [currentValue, setCurrentValue] = useState(initialValue);
        const [finalValue, setFinalValue] = useState(initialValue);

        const handleValueChange = ({ value }: ValueChangeDetails) => {
            setCurrentValue(value.toString('hex'));
        };

        const handleValueChangeEnd = ({ value }: ValueChangeDetails) => {
            setFinalValue(value.toString('hex'));
        };

        return (
            <Flex direction="column" gap={5} style={{ width: 250 }}>
                <Flex direction="column">
                    <span>Current value: {currentValue}</span>
                    <span>Final value: {finalValue}</span>
                </Flex>

                <ColorPicker.RootProvider
                    onValueChange={handleValueChange}
                    onValueChangeEnd={handleValueChangeEnd}
                    //value={ColorPicker.parse(currentValue)}
                    {...props}
                >
                    {(api) => (
                        <>
                            <ColorPicker.Root>
                                <ColorPicker.Label>Color</ColorPicker.Label>
                                <ColorPicker.DefaultControl />
                                <ColorPicker.Popover
                                    eyeDropperIcon={<Icon value="eye-drop" />}
                                ></ColorPicker.Popover>
                            </ColorPicker.Root>

                            <button onClick={() => api.setValue(initialValue)}>reset</button>
                        </>
                    )}
                </ColorPicker.RootProvider>
            </Flex>
        );
    },
};

export {
    Swatches,
    Disabled,
    ReadOnly,
    FormatHSBA,
    Positioning,
    Original,
    DisableAlpha,
    PopoverSettings,
} from './stories';
