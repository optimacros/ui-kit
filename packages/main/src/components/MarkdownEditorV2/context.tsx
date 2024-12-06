import { createContext, useCallback, useContext, useState } from 'react';
import { MarkdownEditorMode, Tabs } from './MarkdownEditor';
import { marked } from 'marked';

export interface MarkdownEditorState {
    value: string;
    setValue: (value: string) => void;
    parse: (str: string) => string;
}

const MarkdownEditorContext = createContext<MarkdownEditorState>(null);

export const useApi = () => useContext(MarkdownEditorContext);

export const RootProvider = ({
    activeTab = MarkdownEditorMode.EDIT,
    value: valueProp = '',
    onChange,
    children,
}) => {
    const [value, setValue] = useState(valueProp);

    const handleValueChange = useCallback(
        (newValue: string) => {
            setValue(newValue);

            if (onChange) {
                onChange(newValue);
            }
        },
        [onChange],
    );

    const parse = useCallback((str: string) => {
        return marked(str, { sanitize: true });
    }, []);

    return (
        <MarkdownEditorContext.Provider value={{ value, setValue: handleValueChange, parse }}>
            <Tabs.Root value={activeTab}>{children}</Tabs.Root>
        </MarkdownEditorContext.Provider>
    );
};
