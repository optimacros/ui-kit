import { Button } from '@optimacros-ui/button';
import { Toolbar } from '../';
import { ComponentProps } from 'react';
import { Field } from '@optimacros-ui/field';
import { Checkbox } from '@optimacros-ui/checkbox';

export const WithForm = (props: ComponentProps<typeof Toolbar.Root>) => (
    <form
        onSubmit={(e) => e.preventDefault()}
        style={{
            width: '400px',
        }}
    >
        <Field.Root>
            <Field.FloatingLabel htmlFor="fn">First Name</Field.FloatingLabel>
            <Field.Input id="fn" />
        </Field.Root>
        <Field.Root>
            <Field.FloatingLabel htmlFor="ln">Last Name</Field.FloatingLabel>
            <Field.Input id="ln" />
        </Field.Root>
        <Checkbox.Root>
            <Checkbox.BoxControl />
            <Checkbox.Label>I agree to the processing of personal data</Checkbox.Label>
        </Checkbox.Root>
        <Toolbar.Root {...props}>
            <Button variant="primary">Cancel</Button>
            <Button variant="accent">Submit</Button>
        </Toolbar.Root>
    </form>
);
