import React, { Children, isValidElement } from 'react';
import { RadioGroup as RadioGroupComponent } from '@optimacros-ui/kit';

interface RadioGroupProps {
    options?: any[];
    classNameButton?: string;
    children?: React.ReactNode;
    theme?: Record<string, string>;
    onChange?: RadioGroupComponent.RootProps['onValueChange'];
}

export const RadioGroup = ({ options, children, onChange, ...rest }: RadioGroupProps) => {
    const content = options || Children.toArray(children);

    return (
        <>
            <RadioGroupComponent.Root {...rest} onValueChange={({ value }) => onChange?.(value)}>
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
