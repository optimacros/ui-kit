import { Editable } from '@optimacros-ui/editable';
import { Flex } from '@optimacros-ui/flex';

export const MaxLength = {
    args: { 'edit.controlled': true, edit: true, placeholder: 'max length = 10', maxLength: 10 },
    render: (props) => {
        return (
            <Editable.RootProvider {...props}>
                {(api) => (
                    <Editable.Root>
                        <Editable.Label>Placeholder</Editable.Label>
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
