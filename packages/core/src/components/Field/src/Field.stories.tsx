import { Field } from '.';
import { ReactNode } from 'react';
import { Icon } from '@optimacros-ui/icon';
import { Flex } from '@optimacros-ui/flex';
import { useFormData } from '@optimacros-ui/utils';

const argTypes = {
    status: {
        control: { type: 'radio' },
        options: ['default', 'error', 'readonly', 'warning'],
        table: { defaultValue: { summary: 'default' } },
    },
    collapsed: {
        control: { type: 'boolean' },
        description: 'Whether the input is collapsed ???',
        table: { defaultValue: { summary: 'false' } },
    },
    required: {
        control: { type: 'boolean' },
        description: 'Whether the field is required',
        table: { defaultValue: { summary: 'false' } },
    },
};

const Wrapper = ({ children }: { children: ReactNode }) => (
    <div style={{ width: '200px', display: 'flex', flexDirection: 'column' }}>{children}</div>
);

export default {
    title: 'UI Kit core/Field',
    component: Field.Root,
    tags: ['autodocs'],
    argTypes,
    decorators: [
        (Story) => (
            <Wrapper>
                <Story />
            </Wrapper>
        ),
    ],
};

export const Base = (props) => {
    return (
        <Field.Root>
            <Field.FloatingLabel htmlFor="base">label</Field.FloatingLabel>
            <Field.Input id="base" {...props} />
            <Field.FloatingHint>hint do this</Field.FloatingHint>
        </Field.Root>
    );
};

export const Collapsed = (props) => {
    return (
        <Field.Root {...props} collapsed>
            <Field.FloatingLabel htmlFor="collapsed">label</Field.FloatingLabel>
            <Field.Input id="collapsed" />
            <Field.FloatingHint>hint do this</Field.FloatingHint>
        </Field.Root>
    );
};
export const Required = {
    args: { required: true },
    render: (props) => {
        return (
            <Field.Root {...props}>
                <Field.FloatingLabel htmlFor="req">Required</Field.FloatingLabel>
                <Field.Input id="req" />
                <Field.FloatingHint>hint do this</Field.FloatingHint>
            </Field.Root>
        );
    },
};

export const Disabled = (props) => {
    return (
        <Field.Root {...props}>
            <Field.FloatingLabel htmlFor="dis">Disabled</Field.FloatingLabel>
            <Field.Input id="dis" disabled value="im so disabled" />
        </Field.Root>
    );
};

export const WithIcon = () => {
    return (
        <div className="flex flex-col gap-4">
            <Field.Root>
                <Field.FloatingIcon>
                    <Icon value={'people'} />
                </Field.FloatingIcon>
                <Field.Input id="ic-1" placeholder="Enter" />
                <Field.FloatingLabel htmlFor="ic-1">Enter name</Field.FloatingLabel>
                <Field.FloatingHint>hint do this</Field.FloatingHint>
            </Field.Root>
            <Field.Root>
                <Field.FloatingIcon>
                    <Icon value={'people'} />
                </Field.FloatingIcon>
                <Field.FloatingLabel htmlFor="ic-2">Enter name</Field.FloatingLabel>
                <Field.Input id="ic-2" placeholder="Enter" />
                <Field.FloatingHint>hint do this</Field.FloatingHint>
            </Field.Root>
        </div>
    );
};
export const Error = (props) => {
    return (
        <Field.Root {...props} status={props.status ?? 'error'}>
            <Field.FloatingLabel htmlFor="err">Error</Field.FloatingLabel>
            <Field.Input id="err" />
            <Field.FloatingError>error</Field.FloatingError>
        </Field.Root>
    );
};

export const Readonly = (props) => {
    return (
        <Field.Root {...props} status={'readonly'}>
            <Field.FloatingLabel htmlFor="err">Readonly</Field.FloatingLabel>
            <Field.Input id="err" value="im readonly, bruh" />
            <Field.FloatingError>error</Field.FloatingError>
        </Field.Root>
    );
};

export const ErrorOneLine = (props) => {
    return (
        <Field.Root {...props}>
            <Field.FloatingLabel htmlFor="err2">Error</Field.FloatingLabel>
            <Field.Input id="err2" />
            <Field.FloatingError>error</Field.FloatingError>
        </Field.Root>
    );
};

export const Multiline = (props) => {
    return (
        <Field.Root {...props}>
            <Field.FloatingLabel htmlFor="test">label</Field.FloatingLabel>
            <Field.Multiline id="test" rows={3} />
        </Field.Root>
    );
};

export const Counter = (props) => {
    return (
        <Field.Root {...props}>
            <Field.FloatingLabel htmlFor="err2">Error</Field.FloatingLabel>
            <Field.Input id="err2" />
            <Field.Counter length={0} maxLength={8} />
        </Field.Root>
    );
};

export const TextArea = (props) => {
    return (
        <Field.Root>
            <Field.FloatingLabel htmlFor="err2">Error</Field.FloatingLabel>
            <Field.TextArea id="err2" {...props} />
            <Field.FloatingHint>some hint there</Field.FloatingHint>
            <Field.FloatingError>some error there</Field.FloatingError>
        </Field.Root>
    );
};

export const Pin = (props) => {
    return (
        <Field.Root style={{ width: 300 }}>
            <Field.FloatingLabel htmlFor="err2">Error</Field.FloatingLabel>
            <Field.PinInput.Input id="err2" pins={6} {...props} />
            <Field.FloatingHint>some hint there</Field.FloatingHint>
            <Field.FloatingError>some error there</Field.FloatingError>
        </Field.Root>
    );
};

export const NumberInput = (props) => {
    return (
        <Field.Root style={{ width: 300 }}>
            <Field.FloatingLabel htmlFor="err2">Error</Field.FloatingLabel>
            <Field.NumberInput.Root id="err2" step={5} min={0} value="0" max={100} {...props}>
                <Flex gap="2" direction="column">
                    <Flex gap="2">
                        <Field.NumberInput.Decrement>-</Field.NumberInput.Decrement>
                        <Field.NumberInput.Input />
                        <Field.NumberInput.Increment>+</Field.NumberInput.Increment>
                    </Flex>
                    <Field.NumberInput.Scrubber />
                </Flex>
            </Field.NumberInput.Root>
            <Field.FloatingHint>some hint there</Field.FloatingHint>
            <Field.FloatingError>some error there</Field.FloatingError>
        </Field.Root>
    );
};
/**TODO */
export const Form = () => {
    const [value, onChange] = useFormData();
    return (
        <>
            <form onBlur={onChange}>
                <Base name="input-1" />
                <Pin name="pin" />
                <NumberInput
                    name="number"
                    formatOptions={{
                        style: 'currency',
                        currency: 'USD',
                    }}
                />
            </form>
            {JSON.stringify(value)}
        </>
    );
};
