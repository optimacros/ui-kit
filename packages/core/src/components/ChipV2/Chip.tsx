import { forward, styled } from '@optimacros/ui-kit-store';
import { tw } from '@optimacros/ui-kit-utils';

export const rootClassName = tw`
flex flex-row justify-between bg-chip rounded-[var(--height-chip)] gap-1.5
text-chip-text leading-[var(--height-chip)] relative text-ellipsis whitespace-nowrap
mr-[var(--margin-right-chip)] max-w-full overflow-hidden px-[var(--padding-chip)]`;

export const Root = forward<{}, 'div'>((props, ref) => (
    <styled.div {...props} ref={ref} data-scope="chip" data-part="root" className={rootClassName} />
));

const iconClassName = tw`hover:text-[var(--color-chip-icon-hover)] text-chip-icon rounded-[var(--size-chip-icon)] align-top text-lg cursor-pointer`;
export const Icon = forward<{}, 'span'>((props, ref) => (
    <styled.span
        role="button"
        {...props}
        ref={ref}
        data-scope="chip"
        data-part="icon"
        className={iconClassName}
    />
));
