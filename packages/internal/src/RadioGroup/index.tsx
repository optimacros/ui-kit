import React, { Children, isValidElement } from 'react';
import { RadioGroup as RadioGroupComponent } from '@optimacros-ui/radio-group';
import { forward } from '@optimacros-ui/store';

interface IRadioGroup {
    options?: any[];
    classNameButton?: string;
    children?: React.ReactNode;
    theme?: Record<string, string>;
    onChange?: (value: string) => void;
}

export const RadioGroup = forward<IRadioGroup, HTMLInputElement>(
    ({ options, children, onChange, ...rest }, ref) => {
        const content = options || Children.toArray(children);

        return (
            <>
                <RadioGroupComponent.Root
                    {...rest}
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
