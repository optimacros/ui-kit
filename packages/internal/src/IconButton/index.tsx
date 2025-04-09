import {
    type ButtonInitialProps,
    type ThemeButtonProps,
    Tooltip,
    TooltipProps,
    getVariant,
    getFloatStyles,
} from '@optimacros-ui/kit-internal';
import { IconButton as IconButtonCore } from '@optimacros-ui/icon-button';
import { forward } from '@optimacros-ui/store';
import { clsx } from '@optimacros-ui/utils';
import './styles.css';
import { Text } from '@optimacros-ui/text';
import { useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export type IconButtonTheme = ThemeButtonProps & { IconButton: string };

interface Props extends Partial<ButtonInitialProps> {
    theme: Partial<IconButtonTheme>;
}

export type IconButtonProps = Partial<Props & TooltipProps>;

export interface IconBtnProps extends IconButtonProps {
    theme?: IconButtonTheme & { toggle: string };
}

const IconButtonComponent = forward<IconBtnProps, 'button'>(
    (
        {
            className = '',
            type = 'button',
            label,
            icon,
            href,
            theme = {} as IconBtnProps['theme'],
            inverse,
            mini,
            neutral,
            uppercase,
            gray,
            warning,
            buttonColor,
            fontSize,
            fontColor,
            children,
            accent,
            primary,
            bordered,
            floating,
            raised,
            disabled,
            ...rest
        },
        refProp,
    ) => {
        const ref = useRef<HTMLButtonElement>();
        const [portalRoot, setPortalRoot] = useState<HTMLButtonElement>(null);

        useImperativeHandle(refProp, () => ref.current);

        useLayoutEffect(() => {
            setPortalRoot(ref.current);
        }, [ref.current]);

        const style = {
            backgroundColor: buttonColor,
            color: fontColor,
            fontSize,
        };

        const cn = clsx(theme.IconButton, className);

        return (
            <>
                <IconButtonCore
                    variant={getVariant(primary, accent, bordered, gray, neutral)}
                    float={getFloatStyles(raised, floating)}
                    status={warning ? 'warning' : null}
                    href={href ? href : null}
                    size={mini ? 'xs' : 'md'}
                    disabled={disabled}
                    inverse={inverse}
                    uppercase={uppercase}
                    icon={icon}
                    style={style}
                    className={cn}
                    iconProps={{
                        className: theme.icon,
                    }}
                    {...rest}
                    ref={ref}
                    data-style-tag="internal"
                />
                {portalRoot &&
                    createPortal(<Text.Span data-tag2="icon-name">{icon}</Text.Span>, portalRoot)}
            </>
        );
    },
);

export const IconButton = forward<IconButtonProps, 'button'>(
    (
        {
            children,
            label,
            theme = {},
            tooltip,
            tooltipDelay,
            tooltipPosition,
            tooltipOffset,
            onClick,
            onMouseEnter,
            onMouseLeave,
            className,
            ...otherProps
        },
        ref,
    ) => {
        return (
            <Tooltip
                composedComponent={IconButtonComponent}
                composedComponentProps={{
                    className,
                    theme,
                    ...otherProps,
                    ref,
                    'data-label': label,
                }}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                tooltip={label ?? tooltip}
                tooltipDelay={tooltipDelay}
                tooltipPosition={tooltipPosition}
                tooltipOffset={tooltipOffset}
                theme={theme}
            >
                {children}
            </Tooltip>
        );
    },
);
