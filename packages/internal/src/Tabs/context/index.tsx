import {
    createContext,
    memo,
    PropsWithChildren,
    ReactElement,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { TabProps } from '../components/Tab';

interface TabsStore {
    tabs: TabProps[];
    setTabs: (items: TabProps[]) => void;
}

const TabsContext = createContext<TabsStore>(null);

interface ProviderProps extends PropsWithChildren {
    rawChildren: ReactElement<TabProps> | ReactElement<TabProps>[];
}

export const TabsProvider = memo<ProviderProps>(({ children, rawChildren }) => {
    const [tabs, setTabs] = useState<TabProps[]>([]);

    const value = useMemo<TabsStore>(() => ({ tabs, setTabs }), [tabs]);

    useEffect(() => {
        const arr = Array.isArray(rawChildren) ? rawChildren : [rawChildren];

        setTabs(arr.map((child) => child.props));
    }, [rawChildren]);

    return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
});

export const useStore = () => useContext(TabsContext) as TabsStore;
