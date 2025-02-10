### Структура флагов
```json 
{
    "component-id": {
        "featurename.lowercase": true,
        "featurename.lowercase": false
    }
}
```

### Использование
``` tsx
import { UiKit } from '../../../store';

export const {
    Api,
    useApi,
    RootProvider: Root,
    useSelector,
    useProxySelector,
    useFeatureFlags,
} = createReactApiStateContext({
    id: 'menu',
    machine,
    connect,
    GlobalContext: UiKit,
});


export const SubMenuItem = forward<
    { item: menu.ItemProps; parent: ReturnType<typeof useApi> } & ComponentProps<typeof Root>,
    'li'
>(({ item, parent, children, ...rest }, ref) => {
    // pass flag here
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
});


```