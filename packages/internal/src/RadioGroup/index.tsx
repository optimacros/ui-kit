import React, { Children, isValidElement } from 'react';
import { RadioGroup as RadioGroupComponent } from '@optimacros-ui/radio-group';
import { useThemeClassName } from '../utils';

interface RadioGroupProps {
    options?: any[];
    classNameButton?: string;
    className?: string;
    children?: React.ReactNode;
    theme?: Record<string, string>;
    onChange?: (value: string) => void;
}

export const RadioGroup = ({
    options,
    children,
    onChange,
    theme,
    className,
    ...rest
}: RadioGroupProps) => {
    const content = options || Children.toArray(children);
    const cn = useThemeClassName(theme, className);

    return (
        <>
            <RadioGroupComponent.Root
                {...rest}
                onValueChange={({ value }: { value: string }) => onChange?.(value)}
                className={cn}
            >
                {content.map((component) => {
                    const isComponent = isValidElement(component);

                    const propsSource = isComponent ? component?.props : component;

                    const { label, value } = propsSource;

                    return (
                        <RadioGroupComponent.Item value={value} key={value}>
                            <RadioGroupComponent.Control value={value} />
                            <RadioGroupComponent.Text value={value}>
                                {label}
                            </RadioGroupComponent.Text>
                        </RadioGroupComponent.Item>
                    );
                })}
            </RadioGroupComponent.Root>
        </>
    );
};
