import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { MarkdownEditorMode, Tabs } from '../MarkdownEditor';
import { convertStringToMarkdown } from '../utils';

export interface MarkdownEditorState {
    value: string;
    setValue: (value: string) => void;
    parse: (str: string) => string;
    disabled: boolean;
}

const MarkdownEditorContext = createContext<MarkdownEditorState>(null);

export const useApi = () => useContext(MarkdownEditorContext);

export const RootProvider = ({
    activeTab = MarkdownEditorMode.EDIT,
    value: valueProp = '',
    onChange,
    children,
    disabled = false,
}) => {
    const [value, setValue] = useState(valueProp);

    const [tabValue, setTabValue] = useState(() => activeTab as string);

    const [tabs, setTabs] = useState<Array<Tabs.Tab>>(() => [
        {
            value: MarkdownEditorMode.EDIT,
            index: 0,
        },
        {
            value: MarkdownEditorMode.PREVIEW,
            index: 1,
        },
        {
            value: MarkdownEditorMode.SPLIT,
            index: 2,
        },
    ]);

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

    useEffect(() => {
        setTabValue(activeTab);
    }, [activeTab]);

    return (
        <MarkdownEditorContext.Provider
            value={{ value, setValue: handleValueChange, parse: convertStringToMarkdown, disabled }}
        >
            <Tabs.Root
                value={tabValue}
                loopFocus={true}
                tabs={tabs}
                onValueChange={({ value }) => {
                    setTabValue(value);
                }}
                onTabsChange={(newTabs) => setTabs(newTabs)}
            >
                {children}
            </Tabs.Root>
        </MarkdownEditorContext.Provider>
    );
};
