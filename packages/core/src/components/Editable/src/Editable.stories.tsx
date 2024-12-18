import type { Meta } from '@storybook/react';

import { Editable } from './index';
import { useState } from 'react';
import { Flex } from '@optimacros-ui/flex';

const meta: Meta<typeof Editable.RootProvider> = {
    title: 'UI Kit core/Editable',
};

export default meta;

export const Basic = () => {
    const [value, setValue] = useState('');

    const handleCommit = (details) => {
        setValue(details.value);
    };

    return (
        <Editable.RootProvider value={value} onValueCommit={handleCommit}>
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
};

export const TextArea = () => (
    <Editable.RootProvider>
        {(api) => (
            <Editable.Root>
                <Editable.Area>
                    <Editable.TextArea />
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
