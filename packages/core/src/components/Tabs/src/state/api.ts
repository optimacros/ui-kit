import { createReactApiStateContext } from '@optimacros-ui/store';
import { Tab } from '../models';
import { machine } from './machine';
import { WheelEvent } from 'react';
import { round, swap } from '@optimacros-ui/utils';

export const { Api, RootProvider, useApi, useProxySelector, useSelector } =
    createReactApiStateContext({
        id: 'tabs',
        machine,
        connect(api, { state, send }) {
            return {
                ...api,
                tabs: state.context.tabs,
                hiddenTabs: state.context.hiddenTabs,
                draggable: state.context.draggable,
                getTriggerProps({ id, disabled, fixed }: Partial<Tab>) {
                    const apiProps = api.getTriggerProps({ value: id, disabled });

                    return {
                        ...apiProps,
                        'data-id': id,
                        'data-fixed': fixed,
                    };
                },
                getListId: () => `tabs:${state.context.id}:list`,
                getListProps: () => {
                    const props = {
                        ...api.getListProps(),
                        hidden: state.context.tabsHidden,
                    };

                    if (state.context.useWheel) {
                        props.onWheel = (e: WheelEvent) =>
                            send({ type: 'WHEEL', deltaY: e.deltaY });
                    }

                    return props;
                },
                getActiveTab: () => {
                    if (!api.value) {
                        return null;
                    }

                    const tab = state.context.tabs?.find((t) => t.id === api.value);

                    if (!tab) {
                        return null;
                    }

                    return tab;
                },
                setValue: (value: string) => send({ type: 'SET_VALUE', value }),
                scrollTo: (value: string) => send({ type: 'SCROLL_TO', value }),
                open: (value: string) => {
                    send({ type: 'OPEN', value });
                },
                setTabs: (value: Array<Tab>) => send({ type: 'SET_TABS', value }),
                scrollToActive: () => send('SCROLL_TO_ACTIVE'),
                last: () => send({ type: 'OPEN_LAST' }),
                first: () => send({ type: 'OPEN_FIRST' }),
                handleDragEnd: (data: Tab, deltaX: number) => {
                    // просто клик
                    if (deltaX === 0) {
                        return;
                    }

                    const element = document.querySelector(`[data-id="${data.id}"]`);

                    const currentIndex = state.context.tabs.findIndex((t) => t.id === data.id);

                    const rect = element.getBoundingClientRect();

                    const newIndex = round((currentIndex * rect.width + deltaX) / rect.width, 0);

                    // не просто клик (рука дернулась)
                    if (currentIndex === newIndex) {
                        return;
                    }

                    let newTabs;

                    if (state.context.draggableMode === 'swap') {
                        newTabs = swap(state.context.tabs, currentIndex, newIndex);
                    } else if (state.context.draggableMode === 'ordered') {
                        newTabs = state.context.tabs
                            .toSpliced(currentIndex, 1)
                            .toSpliced(newIndex, 0, state.context.tabs[currentIndex]);
                    }

                    send({ type: 'UPDATE_TABS', value: newTabs });
                },
            };
        },
    });
