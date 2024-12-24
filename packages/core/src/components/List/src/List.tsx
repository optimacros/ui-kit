import { forward, styled } from '@optimacros-ui/store';
import { Divider } from '@optimacros-ui/divider';
import { Collapsible } from '@optimacros-ui/collapsible';
export const Root = forward<{}, 'ul'>((props, ref) => (
    <styled.ul {...props} ref={ref} data-scope="list" data-part="root" />
));

export const Item = forward<{}, 'li'>((props, ref) => (
    <styled.li {...props} ref={ref} data-scope="list" data-part="item" />
));

export const ItemIcon = forward<{}, 'div'>((props, ref) => (
    <styled.div {...props} ref={ref} data-scope="list" data-part="item-icon" />
));

export const Separator = Divider;

export const CollapsibleItem = forward<{}, 'li'>((props, ref) => (
    <Collapsible.Root>
        <styled.li {...props} ref={ref} data-scope="list" data-part="item" />
    </Collapsible.Root>
));
