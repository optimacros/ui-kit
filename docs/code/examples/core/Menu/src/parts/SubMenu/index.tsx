import { forward, styled } from '@optimacros-ui/store';
import { useApi, useFeatureFlags } from '../../state';
import { PropsWithChildren, useEffect } from 'react';
import { RootProps, Root } from '../Root';
import { Item, ItemProps } from '../Item';
import { isFunction } from '@optimacros-ui/utils';

export type SubMenuRootProps = PropsWithChildren<{ parent: ReturnType<typeof useApi> }>;

export const SubMenuRoot = ({ parent, children }: SubMenuRootProps) => {
    const api = useApi();

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (api && parent) {
                api.setParentNode(parent);
            }
        }, 0);

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    return children;
};

export type SubMenuItemProps = { item: ItemProps; parent: ReturnType<typeof useApi> } & RootProps;

export const SubMenuItem = forward<SubMenuItemProps, 'li'>(
    ({ item, parent, children, ...rest }, ref) => {
        const isEnabled = useFeatureFlags('submenu');

        if (!isEnabled) {
            console.warn('submenu feature is disabled');
            return (
                <Item {...item} {...rest}>
                    {/*@ts-ignore*/}
                    {children}
                </Item>
            );
        }

        return (
            <Root {...rest}>
                {(api) => (
                    <SubMenuRoot parent={parent}>
                        <styled.li
                            {...parent?.getTriggerItemProps(api)}
                            title={item.valueText}
                            ref={ref}
                        >
                            {item.valueText}
                        </styled.li>
                        {isFunction(children) ? children(api) : children}
                    </SubMenuRoot>
                )}
            </Root>
        );
    },
);
