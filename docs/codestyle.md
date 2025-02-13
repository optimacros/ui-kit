# Код стайл написания компонента
1. Создается папка с названием компонента
пример *./Input*
2. Создается Индекс файл, который экспортирует все как единый composable компонент
```ts
    export * as Input from './Input';
```
3. В файле с названием компонента экспортируются все нужные части
3.1. Parts
3.2. ClassNames
3.3. Context

## Правила для компонентов (parts)
### classname и композиция/конкатенация classnames (clsx) должны быть вынесены за компонент (избежание бесполезного вызова функции)
```tsx
export const inputClassName = tw`
peer box-border py-2
border-0 border-b border-solid border-[var(--border)]
focus:border-[var(--border-focus)]

disabled:border-dashed disabled:text-[var(--text-disabled)]
disabled:border-[var(--border-disabled)]

text-[var(--text)]  focus:text-[var(--text-focus)] 
bg-[var(--bg)] group-data-[collapsed=true]:p-0 outline-none text-md

flex grow-1 group-data-[status=readonly]:pointer-events-none

peer
`;

export const Input = forward<{}, 'input'>((props, ref) => {
    return (
        <styled.input
            {...props}
            data-scope="field"
            data-part="input"
            ref={ref}
            //тут 1 класснейм без внешнего воздействия
            className={inputClassName}
        />
    );
});
```
### Должны быть указаны 'data-scope' и 'data-part' аттрибуты (для внешней стилизации)
```tsx
export const hintClassName = 'peer-focus:text-[var(--text-focus)] text-[var(--text)]';
export const Hint = forward<{}, 'span'>((props) => {
    return (
        <styled.span
            {...props}
            //общее название компонента
            data-scope="field"
            //название текущего компонента
            data-part="hint"
            className={props.className ?? hintClassName}
        />
    );
});
```

### В качестве хелпера для типизации использовать функцию *forward* и фабрику *styled*
```tsx  
export const iconClassName =
    'text-[var(--text)] absolute top-6 -left-8 peer-focus:text-[var(--text-focus)]';
export const Icon = forward<{}, 'div'>((props, ref) => {
    return (
        <styled.div
            {...props}
            data-scope="field"
            data-part="icon"
            ref={ref}
            className={iconClassName}
        />
    );
});
```

# Пример полного компонента

```tsx
import { ChangeEvent, HTMLAttributes, KeyboardEvent, useCallback, useRef } from 'react';
import { clsx, isNull, tw } from '@optimacros-ui/utils';
import { forward, styled } from '@optimacros-ui/store';
import { useAutoResize } from './useAutoresize';

export interface InputProps extends Omit<HTMLAttributes, 'onChange' | 'onKeyPress'> {}

export const rootClassName = 'relative py-4 has-data-[part=icon]:ml-8 box-border flex group';
export const Root = forward<{ status?: 'error' | 'readonly' | 'warning' | 'default' }, 'div'>(
    ({ collapsed, status = 'default', ...rest }) => (
        <styled.div
            {...rest}
            data-scope="field"
            data-part="root"
            data-collapsed={collapsed}
            data-status={status}
            className={rootClassName}
        />
    ),
);

export const inputClassName = tw`
peer box-border py-2
border-0 border-b border-solid border-[var(--border)]
focus:border-[var(--border-focus)]

disabled:border-dashed disabled:text-[var(--text-disabled)]
disabled:border-[var(--border-disabled)]

text-[var(--text)]  focus:text-[var(--text-focus)] 
bg-[var(--bg)] group-data-[collapsed=true]:p-0 outline-none text-md

flex grow-1 group-data-[status=readonly]:pointer-events-none

peer
`;

export const Input = forward<{}, 'input'>((props, ref) => {
    return (
        <styled.input
            {...props}
            data-scope="field"
            data-part="input"
            ref={ref}
            className={inputClassName}
        />
    );
});

const textAreaClassName = clsx(inputClassName, 'border-1');
export const TextArea = forward<{}, 'textarea'>((props, ref) => {
    return (
        <styled.textarea
            {...props}
            data-scope="field"
            data-part="input"
            data-tag="textarea"
            ref={ref}
            className={textAreaClassName}
        />
    );
});

export const iconClassName =
    'text-[var(--text)] absolute top-6 -left-8 peer-focus:text-[var(--text-focus)]';
export const Icon = forward<{}, 'div'>((props, ref) => {
    return (
        <styled.div
            {...props}
            data-scope="field"
            data-part="icon"
            ref={ref}
            className={iconClassName}
        />
    );
});

export const counterClassName =
    'absolute right-0 -bottom-1 peer-focus:text-[var(--text-focus)] text-[var(--text)]';
export const Counter = forward<
    {
        length: number;
        maxLength: number;
    },
    'span'
>(({ length, maxLength, ...rest }, ref) => {
    return (
        <styled.span
            {...rest}
            data-scope="field"
            data-part="counter"
            ref={ref}
            className={counterClassName}
        >
            {length}/{maxLength}
        </styled.span>
    );
});

export const floatingTopClassName = tw`
group-data-[collapsed=true]:top-1/2 group-data-[collapsed=true]:-translate-y-1/2
absolute top-0 left-0  pointer-events-none
`;

export const floatingBottomClassName = tw`group-data-[collapsed=true]:top-1/2 group-data-[collapsed=true]:-translate-y-1/2
left-0 absolute peer-focus:block hidden
peer-focus:opacity-100 peer-[.filled]:opacity-0 -bottom-1 pointer-events-none`;

export const labelClassName =
    'flex text-[var(--text)] peer-focus:text-[var(--text-focus)] group-data-[status=error]:text-[var(--text-error)]';
export const Label = forward<{}, 'label'>(({ children, ...rest }, ref) => {
    return (
        <styled.label
            {...rest}
            className={rest.className ?? labelClassName}
            data-scope="field"
            data-part="label"
            title={rest?.title ?? (typeof children === 'string' && children)}
            ref={ref}
        >
            {children}
            <span className="hidden text-[var(--text)]" data-scope="field" data-part="label-star">
                *
            </span>
        </styled.label>
    );
});

export const floatingLabelClassName = clsx(labelClassName, floatingTopClassName);
export const FloatingLabel = forward<{}, 'label'>(({ className, ...rest }, ref) => {
    return <Label {...rest} className={floatingLabelClassName} ref={ref} />;
});

export const hintClassName = 'peer-focus:text-[var(--text-focus)] text-[var(--text)]';
export const Hint = forward<{}, 'span'>((props) => {
    return (
        <styled.span
            {...props}
            data-scope="field"
            data-part="hint"
            className={props.className ?? hintClassName}
        />
    );
});

export const floatingHintClassName = clsx(hintClassName, floatingBottomClassName);
export const FloatingHint = forward<{}, 'span'>((props) => {
    return <Hint {...props} className={floatingHintClassName} />;
});

export const errorClassName =
    'text-[var(--text)] hidden peer-focus:text-[var(--text-focus)] group-data-[status=error]:block';
export const Error = forward<{ oneLine?: boolean }, 'span'>((props, ref) => {
    return (
        <styled.span
            {...props}
            data-scope="field"
            data-part="error"
            data-one-line={props.oneLine}
            ref={ref}
            className={props.className ?? errorClassName}
        />
    );
});

export const floatingErrorClassName = clsx(errorClassName, floatingBottomClassName);
export const FloatingError = forward<{}, 'span'>((props) => {
    return <Error {...props} className={floatingErrorClassName} />;
});

export const Bar = forward<{}, 'span'>((props) => {
    return (
        <styled.span
            {...props}
            data-scope="field"
            data-part="bar"
            className="before:h-px after:h-px before:bg-[var(--border-focus)] after:bg-[var(--border-focus)]"
        />
    );
});
```