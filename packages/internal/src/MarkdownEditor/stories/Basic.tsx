import { MarkdownEditor, MarkdownEditorProps } from '..';

import { useEffect, useState } from 'react';

export const Basic = ({ value: valueProp, ...rest }: MarkdownEditorProps) => {
    const [value, setValue] = useState<string>(valueProp);

    // sync with storybook control
    useEffect(() => {
        setValue(valueProp);
    }, [valueProp]);

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    return <MarkdownEditor value={value} {...rest} onChange={handleChange} />;
};
