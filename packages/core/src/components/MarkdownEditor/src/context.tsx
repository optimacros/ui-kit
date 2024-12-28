import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { MarkdownEditorMode, Tabs } from './MarkdownEditor';
import { convertStringToMarkdown } from './utils';

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

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        if (value !== valueProp) {
            setValue(valueProp);
        }
    }, [valueProp]);

    const handleValueChange = useCallback(
        (newValue: string) => {
            setValue(newValue);

            if (onChange) {
                onChange(newValue);
            }
        },
        [onChange],
    );

    return (
        <MarkdownEditorContext.Provider
            value={{ value, setValue: handleValueChange, parse: convertStringToMarkdown }}
        >
            <Tabs.Root value={activeTab}>{children}</Tabs.Root>
        </MarkdownEditorContext.Provider>
    );
};
