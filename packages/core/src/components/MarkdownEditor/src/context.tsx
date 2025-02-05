import {
    PropsWithChildren,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';
import { MarkdownEditorMode, Tabs } from './MarkdownEditor';
import { convertStringToMarkdown } from './utils';

export interface MarkdownEditorState {
    value: string;
    setValue: (value: string) => void;
    parse: (str: string) => string;
}

const MarkdownEditorContext = createContext<MarkdownEditorState>(null);

export const useApi = () => useContext(MarkdownEditorContext);

interface Props extends PropsWithChildren {
    activeTab?: string;
    value?: string;
    onChange: (newValue: string) => void;
    tabs: Tabs.Tab[];
}

export const RootProvider = ({
    activeTab: activeTabProp = MarkdownEditorMode.EDIT,
    value: valueProp = '',
    onChange,
    tabs,
    children,
}: Props) => {
    const [value, setValue] = useState(valueProp);
    const [activeTab, setActiveTab] = useState(activeTabProp);

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

    const handleActiveTabChange = useCallback((newActiveTab: MarkdownEditorMode) => {
        setActiveTab(newActiveTab);
    }, []);

    return (
        <MarkdownEditorContext.Provider
            value={{ value, setValue: handleValueChange, parse: convertStringToMarkdown }}
        >
            <Tabs.Root value={activeTab} onValueChange={handleActiveTabChange} tabs={tabs}>
                {children}
            </Tabs.Root>
        </MarkdownEditorContext.Provider>
    );
};
