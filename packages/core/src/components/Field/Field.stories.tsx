import { Field } from '.';
import { ReactNode } from 'react';
import { Icon } from '../Icon';

const Wrapper = ({ children }: { children: ReactNode }) => (
    <div style={{ width: '200px', display: 'flex', flexDirection: 'column' }}>{children}</div>
);

export default {
    title: 'UI Kit core/Field',
    component: Field.Root,
    tags: ['autodocs'],
    argTypes: {
        status: {
            control: { type: 'radio' },
            options: ['error', 'default'],
        },
    },
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
        <Field.Root {...props}>
            <Field.FloatingLabel htmlFor="base">label</Field.FloatingLabel>
            <Field.Input id="base" />
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
export const Required = (props) => {
    return (
        <Field.Root {...props}>
            <Field.FloatingLabel htmlFor="req">Required</Field.FloatingLabel>
            <Field.Input id="req" required />
            <Field.FloatingHint>hint do this</Field.FloatingHint>
        </Field.Root>
    );
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
            <Field.Input id="err" required />
            <Field.FloatingError>error</Field.FloatingError>
        </Field.Root>
    );
};

export const Readonly = (props) => {
    return (
        <Field.Root {...props} status={'readonly'}>
            <Field.FloatingLabel htmlFor="err">Readonly</Field.FloatingLabel>
            <Field.Input id="err" required value="im readonly, bruh" />
            <Field.FloatingError>error</Field.FloatingError>
        </Field.Root>
    );
};

export const ErrorOneLine = (props) => {
    return (
        <Field.Root {...props}>
            <Field.FloatingLabel htmlFor="err2">Error</Field.FloatingLabel>
            <Field.Input id="err2" required />
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
            <Field.Input id="err2" required />
            <Field.Counter length={0} maxLength={8} />
        </Field.Root>
    );
};

export const TextArea = (props) => {
    return (
        <Field.Root {...props}>
            <Field.FloatingLabel htmlFor="err2">Error</Field.FloatingLabel>
            <Field.TextArea id="err2" required />
            <Field.FloatingHint>some hint there</Field.FloatingHint>
            <Field.FloatingError>some error there</Field.FloatingError>
        </Field.Root>
    );
};
