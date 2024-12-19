import { Editable } from '@optimacros-ui/editable';
import { Flex } from '@optimacros-ui/flex';

export const States = {
    args: { 'edit.controlled': true, edit: true },
    render: (props) => {
        return (
            <Flex direction="column" gap={4}>
                <Flex direction="column" gap={2}>
                    <Editable.RootProvider {...props} invalid value="invalid">
                        {(api) => (
                            <Editable.Root>
                                <Editable.Label>Invalid</Editable.Label>
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
                </Flex>

                <Flex direction="column" gap={2}>
                    <Editable.RootProvider {...props} disabled value="disabled">
                        {(api) => (
                            <Editable.Root>
                                <Editable.Label>Disabled</Editable.Label>
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
                </Flex>

                <Flex direction="column" gap={2}>
                    <Editable.RootProvider {...props} readOnly value="readOnly">
                        {(api) => (
                            <Editable.Root>
                                <Editable.Label>Read only</Editable.Label>
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
                </Flex>

                <Flex direction="column" gap={2}>
                    <Editable.RootProvider {...props} required value="required">
                        {(api) => (
                            <Editable.Root>
                                <Editable.Label>Required</Editable.Label>
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
                </Flex>
            </Flex>
        );
    },
};
