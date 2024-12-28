import { forward, styled } from '@optimacros-ui/store';
import { marked } from 'marked';

type TextTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'li' | 'label' | 'span';

export type TextProps = {
    as?: TextTag;
};

export const Paragraph = forward<TextProps, 'p'>((props, ref) => (
    <styled.p {...props} ref={ref} data-scope="text" data-part="root" data-tag="paragraph" />
));

export const Code = forward<TextProps, 'code'>((props, ref) => (
    <styled.code {...props} ref={ref} data-scope="text" data-part="root" data-tag="code" />
));

export const Markdown = forward<TextProps, 'div'>(({ children, ...rest }, ref) => (
    <styled.div
        {...rest}
        ref={ref}
        data-scope="text"
        data-part="root"
        data-tag="markdown"
        dangerouslySetInnerHTML={{
            __html: marked(children, { sanitize: true }),
        }}
    />
));

export const Title = forward<TextProps, 'h1'>((props, ref) => (
    <styled.h1 {...props} ref={ref} data-scope="text" data-part="root" data-tag="title" />
));
