import { Editable } from '@optimacros-ui/editable';
import { Flex } from '@optimacros-ui/flex';
import { EditableProps } from '../Editable';

export const States = (props: EditableProps) => {
    return (
        <Flex direction="column" gap={4}>
            <Flex direction="column" gap={2}>
                <Editable.RootProvider {...props} invalid value="invalid">
                    {({ api }) => (
                        <Editable.Root data-testid="root">
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
                    {({ api }) => (
                        <Editable.Root data-testid="root">
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
                    {({ api }) => (
                        <Editable.Root data-testid="root">
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
                    {({ api }) => (
                        <Editable.Root data-testid="root">
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
};
