import React from 'react';
import { RadioGroup as RadioGroupComponent } from '@optimacros-ui/radio-group';

interface RadioGroupProps {
    options?: any[];
    classNameButton?: string;
    children?: React.ReactNode;
    theme?: Record<string, string>;
}

export const RadioGroup: RadioGroupProps = ({ options, children, onChange, ...other }) => {
    const content = options || children;

    const isButtonContent = content[0]?.type?.name === 'RadioButton';

    return (
        <>
            <RadioGroupComponent.Root
                {...other}
                onValueChange={({ value }) => onChange && onChange(value)}
            >
                {content.map((props) => {
                    const propsSource = isButtonContent ? props?.props : props;
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
