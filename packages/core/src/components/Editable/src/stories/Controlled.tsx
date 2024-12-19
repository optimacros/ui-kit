import { Editable } from '@optimacros-ui/editable';
import { Flex } from '@optimacros-ui/flex';
import { EditChangeDetails } from '@zag-js/editable';
import { useState } from 'react';

export const Controlled = {
    args: { 'edit.controlled': true },
    render: (props) => {
        const [edit, setEdit] = useState(true);

        const handleEditChange = (details: EditChangeDetails) => {
            setEdit(details.edit);
        };

        return (
            <Editable.RootProvider
                {...props}
                edit={edit}
                onEditChange={handleEditChange}
                value="пока не работает"
            >
                {(api) => (
                    <Editable.Root>
                        <Editable.Area>
                            <Editable.Input />
                            <Editable.Preview />
                        </Editable.Area>

                        {!api.editing ? (
                            <Editable.EditTrigger>Edit</Editable.EditTrigger>
                        ) : (
                            <Flex align="center" gap={2}>
                                <Editable.SubmitTrigger>Save</Editable.SubmitTrigger>
                                <Editable.CancelTrigger>Cancel</Editable.CancelTrigger>
                            </Flex>
                        )}
                    </Editable.Root>
                )}
            </Editable.RootProvider>
        );
    },
};
