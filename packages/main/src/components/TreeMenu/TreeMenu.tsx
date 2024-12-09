import { tw } from '@optimacros/ui-kit-utils';
import { createReactApiStateContext, forward, styled } from '@optimacros/ui-kit-store';
import * as treemenu from '@zag-js/tree-view';

export const {
    RootProvider: Root,
    useApi,
    State,
} = createReactApiStateContext({
    api: null as treemenu.Api,
    id: 'tree-menu',
    machine: treemenu,
    initialState: {},
});

export const contentClassName = tw`
w-datepicker-dialog bg-calendar-primary-contrast text-[1.4rem] h-calendar-total
leading-[var(--height-calendar-row)] relative text-center bg-calendar-primary-contrast
`;
export const Branch = forward<{ value?: Date }, 'div'>(({ value, ...rest }, ref) => {
    const api = useApi();

    return (
        <styled.div
            {...rest}
            // {...api.getBranchProps(nodeProps)}
            data-scope="calendar"
            data-part="content"
            ref={ref}
            className={contentClassName}
        />
    );
});
