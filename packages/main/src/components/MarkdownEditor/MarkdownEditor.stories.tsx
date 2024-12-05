import { useState } from 'react';
import { MarkdownEditor } from '../MarkdownEditor';

const meta = {
    title: 'UI Kit main/Markdown Editor',
};
export default meta;

export const Basic = () => {
    const [value, setValue] = useState('');

    const handleChange = (v) => setValue(v);

    return <MarkdownEditor value={value} onChange={handleChange} />;
};
