import { Editable } from '@optimacros-ui/editable';
import { Flex } from '@optimacros-ui/flex';
import { EditableProps } from '../Editable';
import { Button } from '@optimacros-ui/button';

export const Basic = (props: EditableProps) => {
    return (
        <Editable.RootProvider {...props}>
            {(api) => (
                <Editable.Root data-testid="root">
                    <Editable.Label>Label</Editable.Label>
                    <Editable.Area>
                        <Editable.Input data-testid="input" />
                        <Editable.Preview data-testid="preview" />
                    </Editable.Area>

                    {!api.editing ? (
                        <Editable.EditTrigger asChild data-testid="edit-trigger">
                            <Button variant="accent">Edit</Button>
                        </Editable.EditTrigger>
                    ) : (
                        <Flex align="center" gap={2}>
                            <Editable.SubmitTrigger asChild data-testid="submit-trigger">
                                <Button variant="accent">Save</Button>
                            </Editable.SubmitTrigger>
                            <Editable.CancelTrigger asChild data-testid="cancel-trigger">
                                <Button variant="accent">Cancel</Button>
                            </Editable.CancelTrigger>
                        </Flex>
                    )}
                </Editable.Root>
            )}
        </Editable.RootProvider>
    );
};
