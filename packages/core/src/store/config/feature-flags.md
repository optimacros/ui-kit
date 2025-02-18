### Структура флагов
```json 
{
    "component-id": {
        "featurename.lowercase": true,
        "featurename.lowercase": false
    }
}
```
пример[feature_flags.json]('feature_flags.json)

### Прокидывание в контекст


```tsx 
import featureFlags from '../../../packages/core/src/config/feature_flags.json';

<UiKit.Provider
    initialState={{
        iconsSrc,
        styles: style,
        // object or json object
        featureFlags,
    }}
>
    {children}
</UiKit.Provider>
```

### Использование внутри компонента
``` tsx
import { UiKit } from '@optimacros-ui/kit-store';

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