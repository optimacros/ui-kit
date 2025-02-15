import React, { Children, isValidElement } from 'react';
import { RadioGroup as RadioGroupComponent } from '@optimacros-ui/radio-group';
import { useThemeClassName } from '../utils';
import { forward } from '@optimacros-ui/store';

interface RadioGroupProps {
    options?: any[];
    classNameButton?: string;
    className?: string;
    children?: React.ReactNode;
    theme?: Record<string, string>;
    onChange?: (value: string) => void;
}

export const RadioGroup = forward<RadioGroupProps, HTMLInputElement>(
    ({ options, children, onChange, theme = {}, className, ...rest }, ref) => {
        const content = options || Children.toArray(children);
        const cn = useThemeClassName(theme, className);

        return (
            <>
                <RadioGroupComponent.Root
                    {...rest}
                    className={cn}
                    onValueChange={({ value }: { value: string }) => onChange?.(value)}
                >
                    {content.map((component) => {
                        const isComponent = isValidElement(component);

                        const propsSource = isComponent ? component?.props : component;

                        const { label, value } = propsSource;

                        return (
                            <RadioGroupComponent.Item value={value} key={value}>
                                <RadioGroupComponent.Control value={value} ref={ref} />
                                <RadioGroupComponent.Text value={value}>
                                    {label}
                                </RadioGroupComponent.Text>
                            </RadioGroupComponent.Item>
                        );
                    })}
                </RadioGroupComponent.Root>
            </>
        );
    },
);
