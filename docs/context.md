### createReactApiContext
Функция для создания стора из zagjs (использовать везде где есть zagjs)

```tsx
import { createReactApiStateContext, forward, styled } from '@optimacros/ui-kit-store';
import * as toast from '@zag-js/toast';
import { ReactNode } from 'react';
import { isFunction, tw } from '@optimacros/ui-kit-utils';

export const { Api, Provider, Root, useApi } = createReactApiStateContext({
    api: null as toast.Api,
    id: 'toast',
    machine: toast,
    initialState: null,
    actor: true,
    rootAsTag: true,
    useRootProps(api) {
        return {
            ...api.getRootProps(),
            className: tw`flex radius-sm flex items-center justify-center py-2 px-1 bg-[var(--bg)] text-[var(--text)]`,
        };
    },
});
```

### forward и styled (использовать при создании компонентов)
styled - фабрика с тегами
forward - прокаченый forwardRef
```tsx
export const Trigger = forward<{ children: ((props) => ReactNode) | ReactNode }, 'button'>(
    ({ children, ...rest }) => {
        const api = useApi();

        const apiProps = api.getActionTriggerProps();

        return isFunction(children) ? (
            children(apiProps)
        ) : (
            <styled.button {...apiProps} {...rest}>
                {children}
            </styled.button>
        );
    },
);
```