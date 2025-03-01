import { Editable } from '@optimacros-ui/editable';
import { Flex } from '@optimacros-ui/flex';
import { EditableProps } from '../Editable';
import { Button } from '@optimacros-ui/button';
import { useState } from 'react';
import { EditChangeDetails, ValueChangeDetails } from '@zag-js/editable';

export const Controlled = ({ edit: editProp, value: valueProp, ...rest }: EditableProps) => {
    const [value, setValue] = useState(valueProp);
    const [open, setOpen] = useState(editProp);

    const handleValueChange = (details: ValueChangeDetails) => {
        console.info(details.value, 'action: handleValueChange');

        setValue(details.value);
    };

    const handleValueCommit = (details: ValueChangeDetails) => {
        console.info(details.value, 'action: handleValueCommit');

        setValue(details.value);
    };

    const handleValueRevert = (details: ValueChangeDetails) => {
        console.info(details.value, 'action: handleValueRevert');

        setValue(details.value);
    };

    const handleEditChange = (details: EditChangeDetails) => {
        console.info(details.edit, 'action: handleEditChange');

        setOpen(details.edit);
    };

    return (
        <Editable.RootProvider
            {...rest}
            value={value}
            edit={open}
            onValueChange={handleValueChange}
            onValueCommit={handleValueCommit}
            onValueRevert={handleValueRevert}
            onEditChange={handleEditChange}
        >
            {({ api }) => (
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
