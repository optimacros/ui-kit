import { createReactApiStateContext } from '@optimacros-ui/store';
import { sortBy } from '@optimacros-ui/utils';
import { Tab } from '../models';
import { machine } from './machine';

export const { Api, RootProvider, useApi, useProxySelector, useSelector } =
    createReactApiStateContext({
        id: 'tabs',
        machine,
        connect(api, { state, send }) {
            const combinedApi = {
                ...api,
                scrollTo: (value: string) => send({ type: 'SCROLL_TO', value }),
                open: (value: string) => send({ type: 'OPEN', value }),
                setTabs: (value: Array<Tab>) => send({ type: 'SET_TABS', value }),
                scrollToActive: () => send('SCROLL_TO_ACTIVE'),
                last: () => {
                    send({
                        type: 'OPEN',
                        value: sortBy(
                            state.context.tabs.filter((t) => !t.disabled),
                            ['fixed'],
                        ).at(-1).id,
                    });
                },
                first: () => {
                    send({
                        type: 'OPEN',
                        value: sortBy(
                            state.context.tabs.filter((t) => !t.disabled),
                            ['fixed'],
                        ).at(0).id,
                    });
                },
                getTriggerProps({ id, disabled, fixed }: Partial<Tab>) {
                    const apiProps = api.getTriggerProps({ value: id, disabled });

                    return {
                        ...apiProps,
                        'data-id': id,
                        'data-fixed': fixed,
                    };
                },
                tabs: state.context.tabs,
                hiddenTabs: state.context.hiddenTabs,
                handleDragEnd: (data: Tab, deltaX: number) =>
                    send({ type: 'DRAG_END', deltaX, data }),
                getListId: () => `tabs:${state.context.id}:list`,
                getListProps: () => {
                    const props = {
                        ...api.getListProps(),
                        hidden: state.context.tabsHidden,
                    };

                    if (state.context.useWheel) {
                        props.onWheel = (e) => send({ type: 'WHEEL', deltaY: e.deltaY });
                    }

                    return props;
                },
                isActive: (value: string) => {
                    return state.context.value === value;
                },
                setValue: (value: string) => send({ type: 'SET_VALUE', value }),
                draggable: state.context.draggable,
            };

            // do something

            return combinedApi;
        },
    });
